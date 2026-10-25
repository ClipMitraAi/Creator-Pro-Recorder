import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAdMob, ADMOB_UNITS } from '../../context/AdMobContext';
import { AdMobBanner } from '../ads/AdMobBanner';
import { 
  Palette, 
  Cpu, 
  Smartphone, 
  HardDrive, 
  Sliders, 
  Video, 
  Clock, 
  Vibrate, 
  Eye, 
  Sparkles, 
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Layout,
  Gift
} from 'lucide-react';
import { VideoResolution, VideoFPS, VideoBitrate, VideoEncoder } from '../../types/recorder';
import { AndroidCodeModal } from '../AndroidCodeModal';

export const GeneralSettingsScreen: React.FC = () => {
  const { theme, setPreviewMode, showToast, resetToDefault, isCustomized } = useTheme();
  const { setShowAdMobCodeModal, triggerInterstitial, triggerRewarded } = useAdMob();

  const [resolution, setResolution] = useState<VideoResolution>('1080p');
  const [fps, setFps] = useState<VideoFPS>(60);
  const [bitrate, setBitrate] = useState<VideoBitrate>('16Mbps');
  const [encoder, setEncoder] = useState<VideoEncoder>('H.265');
  const [countdown, setCountdown] = useState<number>(3);
  const [shakeToStop, setShakeToStop] = useState(true);
  const [showTouches, setShowTouches] = useState(true);
  const [floatingControls, setFloatingControls] = useState(true);
  const [storageTarget, setStorageTarget] = useState<'internal' | 'sdcard'>('internal');
  const [showAndroidCode, setShowAndroidCode] = useState(false);

  return (
    <div className="flex-1 p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold" style={{ color: theme.textColor }}>
            Preferences & Engine
          </h2>
          <p className="text-xs" style={{ color: theme.textMutedColor }}>
            Hardware encoder & recording presets
          </p>
        </div>
      </div>

      {/* THEME & DESIGN STUDIO PROMINENT CARD */}
      <div 
        className="p-4 border shadow-lg space-y-3 relative overflow-hidden"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold" style={{ color: theme.textColor }}>
                Theme & UI Design Studio
              </h3>
              <p className="text-[11px]" style={{ color: theme.textMutedColor }}>
                Active: <span className="font-semibold text-emerald-400">{theme.name}</span>
                {isCustomized ? ' (Customized)' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={() => setPreviewMode('studio')}
            className="px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow transition-all active:scale-95"
            style={{
              backgroundColor: theme.primaryColor,
              borderRadius: `${theme.borderRadius - 4}px`,
            }}
          >
            Change Theme
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t text-[11px]" style={{ borderColor: theme.borderColor }}>
          <span style={{ color: theme.textMutedColor }}>Deep layout, shape & color customization</span>
          <button
            onClick={() => setPreviewMode('editor')}
            className="font-semibold hover:underline"
            style={{ color: theme.primaryColor }}
          >
            Open Theme Editor →
          </button>
        </div>
      </div>

      {/* VIDEO CAPTURE CONFIG */}
      <div 
        className="p-4 border space-y-4"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Video Output Quality
        </span>

        {/* Resolution */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: theme.textColor }}>Resolution</span>
          <div className="flex gap-1">
            {(['720p', '1080p', '1440p', '4k'] as const).map(res => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: resolution === res ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: resolution === res ? theme.primaryColor : theme.borderColor,
                  color: resolution === res ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        {/* FPS */}
        <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <span style={{ color: theme.textColor }}>Framerate</span>
          <div className="flex gap-1">
            {([24, 30, 60, 120] as const).map(rate => (
              <button
                key={rate}
                onClick={() => setFps(rate)}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: fps === rate ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: fps === rate ? theme.primaryColor : theme.borderColor,
                  color: fps === rate ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {rate} FPS
              </button>
            ))}
          </div>
        </div>

        {/* Bitrate */}
        <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <span style={{ color: theme.textColor }}>Bitrate</span>
          <div className="flex gap-1">
            {(['4Mbps', '8Mbps', '16Mbps', '24Mbps', 'Auto'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBitrate(b)}
                className="px-2 py-1 rounded text-[11px] font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: bitrate === b ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: bitrate === b ? theme.primaryColor : theme.borderColor,
                  color: bitrate === b ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Encoder */}
        <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <span style={{ color: theme.textColor }}>Hardware Encoder</span>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>H.265 offers 40% file size savings</p>
          </div>
          <div className="flex gap-1.5">
            {(['H.264', 'H.265'] as const).map(enc => (
              <button
                key={enc}
                onClick={() => setEncoder(enc)}
                className="px-2.5 py-1 rounded text-xs font-semibold border transition-all"
                style={{
                  backgroundColor: encoder === enc ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: encoder === enc ? theme.primaryColor : theme.borderColor,
                  color: encoder === enc ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {enc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RECORDING CONVENIENCES */}
      <div 
        className="p-4 border space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Recording Gestures & Controls
        </span>

        {/* Countdown */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <span style={{ color: theme.textColor }}>Countdown Timer</span>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Pre-recording buffer</p>
          </div>
          <div className="flex gap-1">
            {[0, 3, 5, 10].map(cd => (
              <button
                key={cd}
                onClick={() => setCountdown(cd)}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: countdown === cd ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: countdown === cd ? theme.primaryColor : theme.borderColor,
                  color: countdown === cd ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {cd === 0 ? 'None' : `${cd}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Shake to Stop */}
        <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>Shake Device to Stop</h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Stops recording cleanly without touching the screen</p>
          </div>
          <button
            onClick={() => setShakeToStop(!shakeToStop)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              shakeToStop ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: shakeToStop ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Show Touches */}
        <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>Visual Touch Pointer</h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Highlights finger taps with a translucent circle</p>
          </div>
          <button
            onClick={() => setShowTouches(!showTouches)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              showTouches ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: showTouches ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Floating Controls */}
        <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>Floating Control Bubble</h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Overlay widget for quick pause/stop outside the app</p>
          </div>
          <button
            onClick={() => setFloatingControls(!floatingControls)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              floatingControls ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: floatingControls ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* STORAGE SELECTION */}
      <div 
        className="p-4 border space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Storage Destination
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setStorageTarget('internal')}
            className="p-2.5 border rounded-lg text-left transition-all"
            style={{
              borderColor: storageTarget === 'internal' ? theme.primaryColor : theme.borderColor,
              backgroundColor: storageTarget === 'internal' ? `${theme.primaryColor}15` : 'transparent',
              color: storageTarget === 'internal' ? theme.primaryColor : theme.textColor,
            }}
          >
            <span className="font-bold block">Internal Flash</span>
            <span className="text-[10px] text-neutral-400">142.4 GB Free</span>
          </button>

          <button
            onClick={() => setStorageTarget('sdcard')}
            className="p-2.5 border rounded-lg text-left transition-all"
            style={{
              borderColor: storageTarget === 'sdcard' ? theme.primaryColor : theme.borderColor,
              backgroundColor: storageTarget === 'sdcard' ? `${theme.primaryColor}15` : 'transparent',
              color: storageTarget === 'sdcard' ? theme.primaryColor : theme.textColor,
            }}
          >
            <span className="font-bold block">MicroSD Card</span>
            <span className="text-[10px] text-neutral-400">412.0 GB Free</span>
          </button>
        </div>
      </div>

      {/* ADMOB INTEGRATION & ADS STUDIO */}
      <div 
        className="p-4 border space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold" style={{ color: theme.textColor }}>
                Google AdMob Integration
              </h4>
              <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
                3 Configured Ad Units Ready for Android
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdMobCodeModal(true)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-transform active:scale-95"
          >
            AdMob Hub
          </button>
        </div>

        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="flex justify-between p-1.5 rounded bg-black/20">
            <span style={{ color: theme.textMutedColor }}>Banner:</span>
            <span className="text-emerald-400 truncate max-w-[170px]" title={ADMOB_UNITS.BANNER}>
              ...6300978111
            </span>
          </div>
          <div className="flex justify-between p-1.5 rounded bg-black/20">
            <span style={{ color: theme.textMutedColor }}>Interstitial:</span>
            <span className="text-cyan-400 truncate max-w-[170px]" title={ADMOB_UNITS.INTERSTITIAL}>
              ...1033173712
            </span>
          </div>
          <div className="flex justify-between p-1.5 rounded bg-black/20">
            <span style={{ color: theme.textMutedColor }}>Rewarded:</span>
            <span className="text-amber-400 truncate max-w-[170px]" title={ADMOB_UNITS.REWARDED}>
              ...5224354917
            </span>
          </div>
        </div>

        {/* Quick test buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => triggerInterstitial()}
            className="py-1.5 text-[11px] font-semibold rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600/30 transition-all"
          >
            Test Interstitial
          </button>
          <button
            onClick={() => triggerRewarded()}
            className="py-1.5 text-[11px] font-semibold rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-1"
          >
            <Gift className="w-3 h-3" />
            <span>Test Rewarded</span>
          </button>
        </div>
      </div>

      {/* NATIVE ANDROID CODE & ARCHITECTURE CTA */}
      <div 
        className="p-4 border space-y-2 cursor-pointer transition-all hover:scale-[1.01]"
        onClick={() => setShowAndroidCode(true)}
        style={{
          backgroundColor: `${theme.primaryColor}12`,
          borderColor: `${theme.primaryColor}40`,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" style={{ color: theme.primaryColor }} />
            <h4 className="text-xs font-bold" style={{ color: theme.textColor }}>
              Native Android Implementation Guide
            </h4>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: theme.primaryColor }} />
        </div>
        <p className="text-[11px]" style={{ color: theme.textMutedColor }}>
          View Kotlin & Jetpack Compose theme mapping, MediaProjectionService & VirtualDisplay recording code.
        </p>
      </div>

      {/* Reset Default */}
      <div className="pt-2">
        <button
          onClick={resetToDefault}
          className="w-full py-2.5 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors"
          style={{
            borderColor: theme.borderColor,
            color: theme.textMutedColor,
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Theme & App Defaults</span>
        </button>
      </div>

      {/* ADMOB TEST BANNER */}
      <AdMobBanner />

      {/* Android Code Modal */}
      {showAndroidCode && (
        <AndroidCodeModal onClose={() => setShowAndroidCode(false)} />
      )}
    </div>
  );
};
