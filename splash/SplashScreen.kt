package com.arcontrol.splash

import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

private val DarkBackground = Color(0xFF050a14)
private val NeonCyan = Color(0xFF00e5ff)
private val NeonPurple = Color(0xFF9f5dff)
private val NeonRed = Color(0xffff0040)
private val GlowBrush = Brush.radialGradient(
    colors = listOf(NeonCyan.copy(alpha = 0.2f), Color.Transparent),
    radius = 600f
)
private val ProgressBarBrush = Brush.linearGradient(colors = listOf(NeonCyan, NeonPurple))

@Composable
fun SplashScreen(
    viewModel: SplashViewModel,
    onNavigateDashboard: () -> Unit
) {
    val bootState by viewModel.bootState.collectAsState()

    var isVisible by remember { mutableStateOf(true) }
    val alpha by animateFloatAsState(
        targetValue = if (isVisible) 1f else 0f,
        animationSpec = tween(durationMillis = 500),
        label = "alpha_fade_out"
    )

    LaunchedEffect(bootState) {
        if (bootState is BootState.Ready) {
            delay(300) // Allow user to see 100% completion
            isVisible = false
            delay(550) // Wait for fade-out animation to finish
            onNavigateDashboard()
        }
    }

    Surface(modifier = Modifier.fillMaxSize()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(DarkBackground)
                .alpha(alpha)
        ) {
            ScanlineEffect()
            GlowEffect()

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 32.dp, vertical = 48.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Spacer(modifier = Modifier.weight(1f))
                ARMonogram()
                Spacer(modifier = Modifier.height(64.dp))
                
                when (val state = bootState) {
                    is BootState.Initializing -> LoadingIndicator(state.progress, state.phase.displayText)
                    is BootState.Error -> ErrorDisplay(state.message) { viewModel.retry() }
                    is BootState.Ready -> LoadingIndicator(1f, "SYSTEM READY")
                }
                
                Spacer(modifier = Modifier.weight(1f))
                AppCredits()
            }
        }
    }
}

@Composable
private fun LoadingIndicator(progress: Float, statusText: String) {
    val animatedProgress by animateFloatAsState(
        targetValue = progress,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioLowBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "progress_bar_animation"
    )

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.widthIn(max = 400.dp)
    ) {
        Text(
            text = statusText,
            color = NeonCyan.copy(alpha = 0.8f),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 4.sp
        )
        LinearProgressIndicator(
            progress = { animatedProgress },
            modifier = Modifier
                .fillMaxWidth()
                .height(4.dp)
                .graphicsLayer { compositingStrategy = CompositingStrategy.Offscreen }
                .drawWithCache {
                    onDrawBehind {
                        val strokeWidth = size.height
                        val progressWidth = size.width * animatedProgress
                        // Draw the progress gradient
                        if (progressWidth > 0f) {
                            drawLine(
                                brush = ProgressBarBrush,
                                start = Offset(0f, strokeWidth / 2),
                                end = Offset(progressWidth, strokeWidth / 2),
                                strokeWidth = strokeWidth,
                                cap = StrokeCap.Round
                            )
                        }
                    }
                },
            trackColor = Color.White.copy(alpha = 0.1f),
            color = Color.Transparent, // Color is drawn manually with drawWithCache to apply gradient
            strokeCap = StrokeCap.Round
        )
        Text(
            text = "${(animatedProgress * 100).toInt()}%",
            color = Color.White.copy(alpha = 0.7f),
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
private fun ErrorDisplay(message: String, onRetry: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.widthIn(max = 400.dp)
    ) {
        Text("SYSTEM BOOT FAILURE", color = NeonRed, fontWeight = FontWeight.Bold, letterSpacing = 4.sp, fontSize = 12.sp)
        Text(message, color = NeonRed.copy(0.7f), textAlign = TextAlign.Center, fontSize = 12.sp, modifier = Modifier.padding(horizontal = 16.dp))
        Button(
            onClick = onRetry,
            colors = ButtonDefaults.buttonColors(containerColor = NeonRed.copy(alpha = 0.2f), contentColor = NeonRed),
            border = BorderStroke(1.dp, NeonRed)
        ) { 
            Text("RETRY BOOT SEQUENCE", fontWeight = FontWeight.Bold) 
        }
    }
}

@Composable
private fun ARMonogram() {
    val infiniteTransition = rememberInfiniteTransition(label = "monogram_pulse")
    val pulseAlpha by infiniteTransition.animateFloat(
        initialValue = 0.7f,
        targetValue = 1.0f,
        animationSpec = infiniteRepeatable(
            animation = tween(1500, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ), label = "pulse_alpha"
    )

    Canvas(modifier = Modifier.size(120.dp)) {
        val strokeWidth = 8.dp.toPx()
        // 'A' shape
        drawLine(NeonCyan, Offset(size.width * 0.1f, size.height), Offset(size.width / 2, 0f), strokeWidth, StrokeCap.Round)
        drawLine(NeonCyan, Offset(size.width * 0.9f, size.height), Offset(size.width / 2, 0f), strokeWidth, StrokeCap.Round)
        // 'R' shape (simplified inside the A)
        drawLine(NeonPurple.copy(alpha = pulseAlpha), Offset(size.width / 2, 0f), Offset(size.width / 2, size.height * 0.6f), strokeWidth, StrokeCap.Round)
        drawArc(
            color = NeonPurple.copy(alpha = pulseAlpha),
            startAngle = -90f,
            sweepAngle = 180f,
            useCenter = false,
            topLeft = Offset(size.width / 2, 0f),
            size = size.copy(height = size.height * 0.6f),
            style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
        )
    }
}

@Composable
private fun AppCredits() {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            "Desarrollado por ChrisRey91",
            color = Color.White.copy(alpha = 0.4f),
            fontSize = 10.sp,
            letterSpacing = 1.sp
        )
        Text(
            "www.arcontrolinteligente.com",
            color = Color.White.copy(alpha = 0.4f),
            fontSize = 10.sp,
            letterSpacing = 1.sp
        )
    }
}

@Composable
private fun BoxScope.ScanlineEffect() {
    val infiniteTransition = rememberInfiniteTransition(label = "scanline_effect")
    val scanlinePosition by infiniteTransition.animateFloat(
        initialValue = -0.1f,
        targetValue = 1.1f,
        animationSpec = infiniteRepeatable(
            animation = tween(8000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ), label = "scanline_position"
    )

    Spacer(
        modifier = Modifier
            .fillMaxWidth()
            .height(3.dp)
            .align(Alignment.TopCenter)
            .graphicsLayer {
                translationY = size.height * scanlinePosition
                alpha = 0.5f
            }
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color.Transparent, NeonCyan.copy(alpha = 0.3f), Color.Transparent)
                )
            )
    )
}

@Composable
private fun BoxScope.GlowEffect() {
    val infiniteTransition = rememberInfiniteTransition(label = "glow_effect")
    val glowAlpha by infiniteTransition.animateFloat(
        initialValue = 0.1f,
        targetValue = 0.3f,
        animationSpec = infiniteRepeatable(
            animation = tween(2500, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ), label = "glow_alpha"
    )
    Box(
        modifier = Modifier
            .fillMaxSize()
            .alpha(glowAlpha)
            .background(GlowBrush)
    )
}
