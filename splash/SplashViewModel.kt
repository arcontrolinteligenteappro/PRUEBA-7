package com.arcontrol.splash

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class SplashViewModel : ViewModel() {

    private val _bootState = MutableStateFlow<BootState>(
        BootState.Initializing(0f, BootPhase.CORE_BOOT)
    )
    val bootState = _bootState.asStateFlow()

    init {
        startBootProcess()
    }

    /**
     * Initiates the application boot sequence, simulating the initialization
     * of critical subsystems on a background thread to avoid blocking the UI.
     */
    private fun startBootProcess() {
        viewModelScope.launch {
            try {
                // PHASE 1: Core Boot - Dagger/Hilt, Database, Permissions Check
                runPhase(BootPhase.CORE_BOOT, 1500L, 0f, 0.25f)
                
                // PHASE 2: Audio DSP Hardening - Oboe/AAudio engine init, buffer config
                runPhase(BootPhase.AUDIO_DSP_HARDENING, 2000L, 0.25f, 0.50f)
                
                // PHASE 3: Video Engine Sync - EGLContext creation, shader compilation, SurfaceTexture sync
                runPhase(BootPhase.VIDEO_ENGINE_SYNC, 2500L, 0.50f, 0.85f)

                // PHASE 4: AI Copilot Validation - Gemini API connection validation, model loading
                runPhase(BootPhase.AI_COPILOT_VALIDATION, 1500L, 0.85f, 1.0f)
                
                // For QA: Simulate a potential error
                // if (Math.random() > 0.9) throw IllegalStateException("AI Copilot connection failed")

                _bootState.value = BootState.Ready
            } catch (e: Exception) {
                _bootState.value = BootState.Error(e.message ?: "Unknown boot error")
            }
        }
    }

    /**
     * Allows the user to retry the boot process in case of a recoverable error.
     */
    fun retry() {
        startBootProcess()
    }

    /**
     * Helper function to execute a boot phase, updating progress and status message smoothly.
     */
    private suspend fun runPhase(phase: BootPhase, duration: Long, startProgress: Float, endProgress: Float) {
        _bootState.value = BootState.Initializing(startProgress, phase)
        val startTime = System.currentTimeMillis()
        while (System.currentTimeMillis() < startTime + duration) {
            val elapsed = System.currentTimeMillis() - startTime
            val progress = startProgress + (endProgress - startProgress) * (elapsed.toFloat() / duration)
            _bootState.value = BootState.Initializing(progress.coerceIn(startProgress, endProgress), phase)
            delay(16) // Update progress at ~60fps for smoothness
        }
        _bootState.value = BootState.Initializing(endProgress, phase)
    }
}
