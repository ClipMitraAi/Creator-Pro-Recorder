import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Maximize2, 
  Crop, 
  Mic, 
  Camera, 
  HardDrive, 
  Palette, 
  Sparkles, 
  Play, 
  ChevronRight, 
  Volume2, 
  Check, 
  HandMetal 
} from 'lucide-react';
import { SAMPLE_RECORDINGS } from '../../data/sampleRecordings';

export const HomeScreen: React.FC = () => {
  const { theme, setCurrentScreen, setPreviewMode, activeThemeId } = useTheme();
  
  // Quick toggles state
  const [micActive, setMicActive] = useState(true);
  const [internalAudioActive, setInternalAudioActive] = useState(true);
  const [facecamActive, setFacecamActive] = useState(false);
  const [showTouches, setShowTouches] = useState(true);
  const [floatingWidget, setFloatingWidget] = useState(true);

  // Render Record Button depending on theme.recordButtonDesign
  const renderRecordButton = () => {
    switch (theme.recordButtonDesign) {
      case 'studio-square':
        return (
          <button
            onClick={() => setCurrentScreen('record-screen')}
            className="group relative flex items-center justify-center w-20 h-20 shadow-lg active:scale-95 transition-transform"
            style={{
              backgroundColor: theme.surfaceSecondaryColor,
              border: `2px solid ${theme.recordColor}`,
              borderRadius: `${theme.borderRadius}px`,
              boxShadow: `0 0 20px ${theme.recordColor}40`,
            }}
          >
            <div 
              className="w-10 h-10 flex items-center justify-center transition-all group-hover:scale-105"
              style={{
                backgroundColor: theme.recordColor,
                borderRadius: `${Math.max(4, theme.borderRadius - 4)}px`,
              }}
            >
              <div className="w-3.5 h-3.5 bg-white rounded-sm" />
            </div>
            <span 
              className="absolute -bottom-6 text-[10px] font-mono tracking-wider uppercase font-semibold"
              style={{ color: theme.recordColor }}
            >
              REC STANDBY
            </span>
          </button>
        );

      case 'neon-target':
        return (
          <button
            onClick={() => setCurrentScreen('record-screen')}
            className="group relative flex items-center justify-center w-24 h-24 active:scale-95 transition-transform"
          >
            <div 
              className="absolute inset-0 rounded-full border-2 border-dashed animate-spin transition-all"
              style={{
                borderColor: theme.primaryColor,
                animationDuration: '12s',
              }}
            />
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
              style={{
                backgroundColor: theme.recordColor,
                boxShadow: `0 0 25px ${theme.recordColor}`,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-inner" />
            </div>
            <span 
              className="absolute -bottom-6 text-[10px] font-mono tracking-wider font-bold"
              style={{ color: theme.primaryColor }}
            >
              TARGET REC
            </span>
          </button>
        );

      case 'pulse-glow':
        return (
          <button
            onClick={() => setCurrentScreen('record-screen')}
            className="group relative flex items-center justify-center w-22 h-22 active:scale-95 transition-transform"
          >
            <div 
              className="absolute inset-0 rounded-full opacity-60 animate-ping"
              style={{
                backgroundColor: theme.recordColor,
                animationDuration: '2.5s',
              }}
            />
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all group-hover:scale-105 border-4"
              style={{
                backgroundColor: theme.recordColor,
                borderColor: theme.surfaceColor,
                boxShadow: `0 0 30px ${theme.recordColor}60`,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-white/95" />
            </div>
            <span 
              className="absolute -bottom-6 text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: theme.textColor }}
            >
              TAP TO RECORD
            </span>
          </button>
        );

      case 'classic-ring':
      default:
        return (
          <button
            onClick={() => setCurrentScreen('record-screen')}
            className="group relative flex items-center justify-center w-20 h-20 active:scale-95 transition-transform"
          >
            <div 
              className="w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all p-1"
              style={{
                borderColor: theme.recordColor,
                backgroundColor: 'transparent',
                boxShadow: `0 0 20px ${theme.recordColor}30`,
              }}
            >
              <div 
                className="w-14 h-14 rounded-full transition-transform group-hover:scale-105 flex items-center justify-center"
                style={{
                  backgroundColor: theme.recordColor,
                }}
              >
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
            <span 
              className="absolute -bottom-6 text-[10px] font-semibold tracking-wide uppercase"
              style={{ color: theme.textMutedColor }}
            >
              START RECORD
            </span>
          </button>
        );
    }
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-5">
      {/* Top Header Card */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 
              className="text-lg font-bold tracking-tight"
              style={{ color: theme.textColor }}
            >
              Creator Pro
            </h1>
            <span 
              className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${theme.primaryColor}22`,
                color: theme.primaryColor,
                border: `1px solid ${theme.primaryColor}40`,
              }}
            >
              {theme.badge}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: theme.textMutedColor }}>
            1080p · 60 FPS · HEVC Active
          </p>
        </div>

        {/* Design Studio Quick Switcher Button */}
        <button
          onClick={() => setPreviewMode('studio')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold shadow-sm transition-all active:scale-95"
          style={{
            backgroundColor: `${theme.primaryColor}20`,
            color: theme.primaryColor,
            border: `1px solid ${theme.primaryColor}40`,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Themes</span>
        </button>
      </div>

      {/* Main Record Action Hero */}
      <div 
        className="p-6 relative overflow-hidden flex flex-col items-center justify-center text-center transition-all"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderWidth: theme.cardStyle === 'bordered' ? '1px' : '0px',
          borderRadius: `${theme.borderRadius}px`,
          boxShadow: theme.cardStyle === 'soft-glow' 
            ? `0 10px 30px -10px ${theme.glowColor}` 
            : theme.cardStyle === 'glassmorphic'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          backdropFilter: theme.cardStyle === 'glassmorphic' ? 'blur(16px)' : undefined,
        }}
      >
        <div className="mb-8 mt-2">
          {renderRecordButton()}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono mt-4" style={{ color: theme.textMutedColor }}>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
            Ready to Capture
          </span>
          <span>·</span>
          <span>Max 4K 120fps</span>
        </div>
      </div>

      {/* Quick Recording Modes (4 Core Cards) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.textMutedColor }}>
            Capture Mode
          </span>
          <span className="text-[11px]" style={{ color: theme.textMutedColor }}>
            Select target
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Full Screen */}
          <button
            onClick={() => setCurrentScreen('record-screen')}
            className="p-3 text-left transition-all active:scale-98 flex flex-col justify-between h-24"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderWidth: '1px',
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${theme.primaryColor}18`,
                color: theme.primaryColor,
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: theme.textColor }}>Full Display</p>
              <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Android Screen</p>
            </div>
          </button>

          {/* Custom Area Crop */}
          <button
            onClick={() => setCurrentScreen('custom-area')}
            className="p-3 text-left transition-all active:scale-98 flex flex-col justify-between h-24"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderWidth: '1px',
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${theme.accentColor}18`,
                color: theme.accentColor,
              }}
            >
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: theme.textColor }}>Custom Area</p>
              <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Draggable Crop</p>
            </div>
          </button>

          {/* Audio Studio */}
          <button
            onClick={() => setCurrentScreen('audio-settings')}
            className="p-3 text-left transition-all active:scale-98 flex flex-col justify-between h-24"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderWidth: '1px',
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${theme.secondaryColor}25`,
                color: theme.primaryColor,
              }}
            >
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: theme.textColor }}>Audio Mix</p>
              <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Internal + Mic</p>
            </div>
          </button>

          {/* Facecam Studio */}
          <button
            onClick={() => setCurrentScreen('facecam-settings')}
            className="p-3 text-left transition-all active:scale-98 flex flex-col justify-between h-24"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderWidth: '1px',
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${theme.recordColor}18`,
                color: theme.recordColor,
              }}
            >
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: theme.textColor }}>Facecam Overlay</p>
              <p className="text-[10px]" style={{ color: theme.textMutedColor }}>Front-Camera Bubble</p>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Setup Toggles */}
      <div 
        className="p-3.5 space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderWidth: '1px',
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Live Hardware Switches
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Mic */}
          <button
            onClick={() => setMicActive(!micActive)}
            className="flex items-center justify-between p-2 rounded-lg border transition-all text-left"
            style={{
              borderColor: micActive ? theme.primaryColor : theme.borderColor,
              backgroundColor: micActive ? `${theme.primaryColor}14` : 'transparent',
              color: micActive ? theme.primaryColor : theme.textMutedColor,
            }}
          >
            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              <span className="font-medium">Microphone</span>
            </div>
            {micActive && <Check className="w-3 h-3" />}
          </button>

          {/* Internal Audio */}
          <button
            onClick={() => setInternalAudioActive(!internalAudioActive)}
            className="flex items-center justify-between p-2 rounded-lg border transition-all text-left"
            style={{
              borderColor: internalAudioActive ? theme.primaryColor : theme.borderColor,
              backgroundColor: internalAudioActive ? `${theme.primaryColor}14` : 'transparent',
              color: internalAudioActive ? theme.primaryColor : theme.textMutedColor,
            }}
          >
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span className="font-medium">Internal SFX</span>
            </div>
            {internalAudioActive && <Check className="w-3 h-3" />}
          </button>

          {/* Facecam */}
          <button
            onClick={() => setFacecamActive(!facecamActive)}
            className="flex items-center justify-between p-2 rounded-lg border transition-all text-left"
            style={{
              borderColor: facecamActive ? theme.primaryColor : theme.borderColor,
              backgroundColor: facecamActive ? `${theme.primaryColor}14` : 'transparent',
              color: facecamActive ? theme.primaryColor : theme.textMutedColor,
            }}
          >
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span className="font-medium">Facecam</span>
            </div>
            {facecamActive && <Check className="w-3 h-3" />}
          </button>

          {/* Touches */}
          <button
            onClick={() => setShowTouches(!showTouches)}
            className="flex items-center justify-between p-2 rounded-lg border transition-all text-left"
            style={{
              borderColor: showTouches ? theme.primaryColor : theme.borderColor,
              backgroundColor: showTouches ? `${theme.primaryColor}14` : 'transparent',
              color: showTouches ? theme.primaryColor : theme.textMutedColor,
            }}
          >
            <div className="flex items-center gap-1.5">
              <HandMetal className="w-3.5 h-3.5" />
              <span className="font-medium">Show Touches</span>
            </div>
            {showTouches && <Check className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Storage Information Bar */}
      <div 
        className="p-3.5"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderWidth: '1px',
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
            <span className="font-bold" style={{ color: theme.textColor }}>Internal Storage</span>
          </div>
          <span className="font-mono text-[11px]" style={{ color: theme.textMutedColor }}>
            142.4 GB free / 256 GB
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800/20 overflow-hidden relative">
          <div 
            className="h-full rounded-full transition-all"
            style={{
              width: '44%',
              backgroundColor: theme.primaryColor,
            }}
          />
        </div>
        <p className="text-[10px] mt-1.5" style={{ color: theme.textMutedColor }}>
          ~18 hrs 45 mins recording time available at 1080p 60fps
        </p>
      </div>

      {/* Recent Recordings Preview */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.textMutedColor }}>
            Recent Captures
          </span>
          <button 
            onClick={() => setCurrentScreen('recordings')}
            className="text-xs font-semibold flex items-center gap-0.5"
            style={{ color: theme.primaryColor }}
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {SAMPLE_RECORDINGS.slice(0, 2).map((rec) => (
            <div 
              key={rec.id}
              onClick={() => setCurrentScreen('recordings')}
              className="p-2.5 flex items-center justify-between gap-3 cursor-pointer transition-transform active:scale-98"
              style={{
                backgroundColor: theme.surfaceColor,
                borderColor: theme.borderColor,
                borderWidth: '1px',
                borderRadius: `${theme.borderRadius}px`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-10 rounded-md overflow-hidden relative bg-slate-900 shrink-0 flex items-center justify-center">
                  <img 
                    src={rec.thumbnailUrl} 
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold truncate max-w-[170px]" style={{ color: theme.textColor }}>
                    {rec.title}
                  </h4>
                  <p className="text-[10px] font-mono" style={{ color: theme.textMutedColor }}>
                    {rec.duration} · {rec.fileSizeFormatted}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono shrink-0" style={{ color: theme.textMutedColor }}>
                {rec.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
