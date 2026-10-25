package com.creatorpro.recorder

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.creatorpro.recorder.ui.theme.CreatorProTheme

class MainActivity : ComponentActivity() {

    private val screenCaptureLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK && result.data != null) {
            val serviceIntent = Intent(this, ScreenCaptureService::class.java).apply {
                putExtra("RESULT_CODE", result.resultCode)
                putExtra("DATA", result.data)
            }
            startForegroundService(serviceIntent)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CreatorProTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color(0xFF090D10)
                ) {
                    ScreenRecorderDashboard(
                        onStartRecord = {
                            val mpManager = getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
                            screenCaptureLauncher.launch(mpManager.createScreenCaptureIntent())
                        },
                        onStopRecord = {
                            val serviceIntent = Intent(this, ScreenCaptureService::class.java)
                            stopService(serviceIntent)
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun ScreenRecorderDashboard(
    onStartRecord: () -> Unit,
    onStopRecord: () -> Unit
) {
    var isRecording by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Top Header
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "Creator Pro Recorder",
                color = Color.White,
                fontSize = 22.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "100% Private · 1080p60 · No Ads",
                color = Color(0xFF10B981),
                fontSize = 12.sp,
                modifier = Modifier.padding(top = 4.dp)
            )
        }

        // Center Record Button
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Button(
                onClick = {
                    if (isRecording) {
                        onStopRecord()
                        isRecording = false
                    } else {
                        onStartRecord()
                        isRecording = true
                    }
                },
                modifier = Modifier.size(140.dp),
                shape = RoundedCornerShape(70.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isRecording) Color(0xFFEF4444) else Color(0xFF10B981)
                )
            ) {
                Text(
                    text = if (isRecording) "STOP REC" else "START REC",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = if (isRecording) "Recording screen in progress..." else "Tap to begin high-fps capture",
                color = Color(0xFF94A3B8),
                fontSize = 12.sp
            )
        }

        // Bottom Info
        Text(
            text = "Video saved to Movies/CreatorPro on device storage",
            color = Color(0xFF64748B),
            fontSize = 11.sp
        )
    }
}
