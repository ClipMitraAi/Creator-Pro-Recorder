package com.creatorpro.recorder.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val EmeraldPrimary = Color(0xFF10B981)
val SlateBackground = Color(0xFF090D10)
val SlateSurface = Color(0xFF12181F)

private val DarkColorScheme = darkColorScheme(
    primary = EmeraldPrimary,
    background = SlateBackground,
    surface = SlateSurface,
    onPrimary = Color.Black,
    onBackground = Color.White,
    onSurface = Color.White
)

@Composable
fun CreatorProTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
