import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Mic, Volume2, Radio, Check, Sparkles, Sliders } from 'lucide-react';
import { AudioSource } from '../../types/recorder';

export const AudioSettingsScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();

  const [source, setSource] = useState<AudioSource>('mixed');
  const [internalVol, setInternalVol] = useState(85);
  const [micGain, setMicGain] = useState(70);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [sampleRate, setSampleRate] = useState<'44.1kHz' | '48.0kHz'>('48.0kHz');
  const [audioBitrate, setAudioBitrate] = useState<'128kbps' | '256kbps' | '320kbps'>('256kbps');

  return (
    <div className="flex-1 p-4 pb-20 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: theme.textColor }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold" style={{ color: theme.textColor }}>
            Audio Mixing Studio
          </h2>
          <p className="text-xs" style={{ color: theme.textMutedColor }}>
            Configure internal system audio & mic tracks
          </p>
        </div>
      </div>

      {/* Audio Source Modes (4 Options) */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Audio Capture Mode
        </span>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'mixed', label: 'Combined Mix', desc: 'Internal + Mic', icon: Radio },
            { id: 'internal', label: 'Internal Only', desc: 'Game/App Sound', icon: Volume2 },
            { id: 'microphone', label: 'Microphone Only', desc: 'Voice Commentary', icon: Mic },
            { id: 'mute', label: 'Mute Audio', desc: 'Silent Capture', icon: Volume2 },
          ].map((item) => {
            const isSelected = source === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSource(item.id as AudioSource)}
                className="p-3 text-left border transition-all flex flex-col justify-between h-20"
                style={{
                  backgroundColor: isSelected ? `${theme.primaryColor}15` : theme.surfaceColor,
                  borderColor: isSelected ? theme.primaryColor : theme.borderColor,
                  borderRadius: `${theme.borderRadius}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <Icon 
                    className="w-4 h-4" 
                    style={{ color: isSelected ? theme.primaryColor : theme.textMutedColor }} 
                  />
                  {isSelected && (
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold" style={{ color: theme.textColor }}>
                    {item.label}
                  </h4>
                  <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume & Gain Sliders with Visual Decibel Meters */}
      <div 
        className="p-4 space-y-4 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Track Gain & Levels
        </span>

        {/* Internal Audio Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold" style={{ color: theme.textColor }}>
              Internal System Volume
            </span>
            <span className="font-mono font-bold" style={{ color: theme.primaryColor }}>
              {internalVol}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={internalVol}
            disabled={source === 'microphone' || source === 'mute'}
            onChange={(e) => setInternalVol(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer disabled:opacity-30"
          />
          {/* Simulated VU Meter */}
          <div className="flex items-center gap-1 pt-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                className="h-2 flex-1 rounded-sm transition-all"
                style={{
                  backgroundColor: i < Math.floor((internalVol / 100) * 16)
                    ? i > 13 ? '#ef4444' : i > 10 ? '#f59e0b' : theme.primaryColor
                    : 'rgba(255,255,255,0.06)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Mic Gain Slider */}
        <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <div className="flex justify-between text-xs">
            <span className="font-semibold" style={{ color: theme.textColor }}>
              Microphone Gain
            </span>
            <span className="font-mono font-bold" style={{ color: theme.accentColor }}>
              {micGain}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={micGain}
            disabled={source === 'internal' || source === 'mute'}
            onChange={(e) => setMicGain(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer disabled:opacity-30"
          />
          {/* Simulated Mic VU Meter */}
          <div className="flex items-center gap-1 pt-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                className="h-2 flex-1 rounded-sm transition-all"
                style={{
                  backgroundColor: i < Math.floor((micGain / 100) * 16)
                    ? i > 13 ? '#ef4444' : i > 10 ? '#f59e0b' : theme.accentColor
                    : 'rgba(255,255,255,0.06)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DSP & Noise Suppression */}
      <div 
        className="p-4 space-y-3 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          DSP Processing
        </span>

        <div className="flex items-center justify-between py-1">
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>
              AI Noise Suppression
            </h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
              Filters out keyboard clatter and fan hum
            </p>
          </div>
          <button
            onClick={() => setNoiseSuppression(!noiseSuppression)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              noiseSuppression ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: noiseSuppression ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>
              Echo Cancellation
            </h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
              Prevents speaker loopback into the microphone
            </p>
          </div>
          <button
            onClick={() => setEchoCancellation(!echoCancellation)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              echoCancellation ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: echoCancellation ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* Sample Rate & Bitrate */}
      <div 
        className="p-4 space-y-3 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Broadcast Quality
        </span>

        <div className="flex items-center justify-between text-xs">
          <span style={{ color: theme.textColor }}>Sample Rate</span>
          <div className="flex gap-2">
            {(['44.1kHz', '48.0kHz'] as const).map(rate => (
              <button
                key={rate}
                onClick={() => setSampleRate(rate)}
                className="px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: sampleRate === rate ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: sampleRate === rate ? theme.primaryColor : theme.borderColor,
                  color: sampleRate === rate ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {rate}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <span style={{ color: theme.textColor }}>Audio Bitrate</span>
          <div className="flex gap-2">
            {(['128kbps', '256kbps', '320kbps'] as const).map(bitrate => (
              <button
                key={bitrate}
                onClick={() => setAudioBitrate(bitrate)}
                className="px-2 py-1 rounded text-xs font-mono font-semibold border transition-all"
                style={{
                  backgroundColor: audioBitrate === bitrate ? `${theme.primaryColor}25` : 'transparent',
                  borderColor: audioBitrate === bitrate ? theme.primaryColor : theme.borderColor,
                  color: audioBitrate === bitrate ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {bitrate}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={() => {
          showToast('Audio configuration applied successfully');
          setCurrentScreen('home');
        }}
        className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg active:scale-98 transition-transform"
        style={{
          backgroundColor: theme.primaryColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        Apply Audio Settings
      </button>
    </div>
  );
};
