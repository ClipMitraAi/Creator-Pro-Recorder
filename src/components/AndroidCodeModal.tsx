import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Copy, Check, Code, Cpu, Smartphone } from 'lucide-react';

interface AndroidCodeModalProps {
  onClose: () => void;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ onClose }) => {
  const { theme, showToast } = useTheme();
  const [activeTab, setActiveTab] = useState<'compose-theme' | 'media-projection' | 'audio-muxer'>('compose-theme');
  const [copied, setCopied] = useState(false);

  const getCodeContent = () => {
    if (activeTab === 'compose-theme') {
      return `// CreatorProTheme.kt
// Jetpack Compose Design Tokens mapped from "${theme.name}"
package com.creatorpro.recorder.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

// 1. Color Palette Tokens
val Primary = Color(0x${theme.primaryColor.replace('#', 'FF')})
val Secondary = Color(0x${theme.secondaryColor.replace('#', 'FF')})
val Background = Color(0x${theme.backgroundColor.replace('#', 'FF')})
val Surface = Color(0x${theme.surfaceColor.replace('#', 'FF')})
val TextPrimary = Color(0x${theme.textColor.replace('#', 'FF')})
val TextMuted = Color(0x${theme.textMutedColor.replace('#', 'FF')})
val RecordTally = Color(0x${theme.recordColor.replace('#', 'FF')})

private val DarkColorScheme = darkColorScheme(
    primary = Primary,
    secondary = Secondary,
    background = Background,
    surface = Surface,
    onPrimary = Color.White,
    onBackground = TextPrimary,
    onSurface = TextPrimary
)

// 2. Compose Theme Provider
@Composable
fun CreatorProTheme(
    darkTheme: Boolean = true,
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        shapes = Shapes(
            small = androidx.compose.foundation.shape.RoundedCornerShape(${theme.borderRadius - 4}.dp),
            medium = androidx.compose.foundation.shape.RoundedCornerShape(${theme.borderRadius}.dp),
            large = androidx.compose.foundation.shape.RoundedCornerShape(${theme.borderRadius + 6}.dp)
        ),
        content = content
    )
}`;
    }

    if (activeTab === 'media-projection') {
      return `// ScreenCaptureService.kt
// Android MediaProjection & VirtualDisplay Implementation
package com.creatorpro.recorder.service

import android.app.*
import android.content.Intent
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.MediaRecorder
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.IBinder
import androidx.core.app.NotificationCompat

class ScreenCaptureService : Service() {

    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var mediaRecorder: MediaRecorder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val resultCode = intent?.getIntExtra("RESULT_CODE", Activity.RESULT_CANCELED) ?: return START_NOT_STICKY
        val data: Intent = intent.getParcelableExtra("DATA") ?: return START_NOT_STICKY

        // 1. Start Foreground Service Notification
        startForeground(NOTIFICATION_ID, createNotification())

        // 2. Obtain MediaProjection Instance
        val mpManager = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
        mediaProjection = mpManager.getMediaProjection(resultCode, data)

        // 3. Configure Hardware MediaRecorder
        setupMediaRecorder()

        // 4. Create VirtualDisplay from MediaProjection
        virtualDisplay = mediaProjection?.createVirtualDisplay(
            "CreatorProDisplay",
            1080, 1920, 420,
            DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
            mediaRecorder?.surface,
            null, null
        )

        mediaRecorder?.start()
        return START_STICKY
    }

    private fun setupMediaRecorder() {
        mediaRecorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setVideoSource(MediaRecorder.VideoSource.SURFACE)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setVideoEncoder(MediaRecorder.VideoEncoder.H264)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setVideoEncodingBitRate(16 * 1000 * 1000) // 16 Mbps
            setVideoFrameRate(60) // 60 FPS
            setVideoSize(1080, 1920)
            setOutputFile("/sdcard/Movies/CreatorPro/record_\${System.currentTimeMillis()}.mp4")
            prepare()
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
    companion object { const val NOTIFICATION_ID = 1001 }
}`;
    }

    return `// AudioPlaybackCapture.kt
// Android 10+ Internal System Audio Recording with AudioPlaybackCaptureConfiguration
package com.creatorpro.recorder.audio

import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioPlaybackCaptureConfiguration
import android.media.AudioRecord
import android.media.projection.MediaProjection
import android.os.Build
import androidx.annotation.RequiresApi

@RequiresApi(Build.VERSION_CODES.Q)
class InternalAudioRecorder(private val mediaProjection: MediaProjection) {

    private var audioRecord: AudioRecord? = null

    fun startInternalRecording() {
        // 1. Build AudioPlaybackCapture config allowing system/game sounds
        val config = AudioPlaybackCaptureConfiguration.Builder(mediaProjection)
            .addMatchingUsage(AudioAttributes.USAGE_MEDIA)
            .addMatchingUsage(AudioAttributes.USAGE_GAME)
            .build()

        // 2. AudioFormat: 48kHz Stereo 16-bit PCM
        val audioFormat = AudioFormat.Builder()
            .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
            .setSampleRate(48000)
            .setChannelMask(AudioFormat.CHANNEL_IN_STEREO)
            .build()

        // 3. Initialize AudioRecord with PlaybackCapture
        audioRecord = AudioRecord.Builder()
            .setAudioFormat(audioFormat)
            .setAudioPlaybackCaptureConfig(config)
            .build()

        audioRecord?.startRecording()
    }

    fun stop() {
        audioRecord?.stop()
        audioRecord?.release()
    }
}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    showToast('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-text">
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col border shadow-2xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0a0d14',
          borderColor: theme.borderColor,
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" style={{ color: theme.primaryColor }} />
            <div>
              <h3 className="text-sm font-bold text-white">
                Android Native Architecture & Kotlin Code
              </h3>
              <p className="text-[11px] text-neutral-400">
                How Creator Pro design tokens map to Jetpack Compose & MediaProjection API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b text-xs px-4 bg-black/40" style={{ borderColor: theme.borderColor }}>
          {[
            { id: 'compose-theme', label: '1. Jetpack Compose Theme', icon: Smartphone },
            { id: 'media-projection', label: '2. MediaProjection Service', icon: Code },
            { id: 'audio-muxer', label: '3. Internal Audio (Android 10+)', icon: Cpu },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="py-3 px-4 font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap"
                style={{
                  borderColor: isActive ? theme.primaryColor : 'transparent',
                  color: isActive ? theme.primaryColor : '#94a3b8',
                }}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Block Container */}
        <div className="relative flex-1 overflow-auto p-4 bg-[#05080e]">
          <button
            onClick={copyCode}
            className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all shadow"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto p-2">
            {getCodeContent()}
          </pre>
        </div>

        {/* Footer Note */}
        <div className="p-3 border-t bg-black/40 text-[11px] text-neutral-400 flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <span>Theme Tokens currently generated for: <strong className="text-white">{theme.name}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
