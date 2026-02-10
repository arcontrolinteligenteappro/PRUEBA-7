package com.arcontrol.splash

/**
 * Represents the distinct, sequential phases of the application's initialization process.
 * Each phase provides display text for the UI to show the user what's happening.
 */
enum class BootPhase(val displayText: String) {
    CORE_BOOT("CORE BOOT"),
    AUDIO_DSP_HARDENING("AUDIO DSP HARDENING"),
    VIDEO_ENGINE_SYNC("VIDEO ENGINE SYNC"),
    AI_COPILOT_VALIDATION("AI COPILOT VALIDATION")
}

/**
 * Models the explicit state of the boot process using a sealed class.
 * This ensures all possible states are handled and facilitates a unidirectional data flow.
 */
sealed class BootState {
    /**
     * The system is initializing. Provides progress and the current phase.
     * @param progress The normalized progress from 0.0f to 1.0f.
     * @param phase The current initialization phase.
     */
    data class Initializing(val progress: Float, val phase: BootPhase) : BootState()

    /**
     * The system has encountered a non-recoverable error during boot.
     * @param message A diagnostic error message.
     */
    data class Error(val message: String) : BootState()

    /**
     * The system is fully initialized and ready to navigate to the main dashboard.
     */
    data object Ready : BootState()
}
