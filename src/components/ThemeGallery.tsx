import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PRESET_THEMES } from '../data/presetThemes';
import { ScreenId, ThemeConfig } from '../types/theme';
import { 
  Check, 
  Sparkles, 
  Eye, 
  Sliders, 
  ArrowRight, 
  Smartphone, 
  Monitor, 
  Layers,
  ChevronRight,
  Video,
  Mic,
  Camera,
  Film
} from 'lucide-react';

export const ThemeGallery: React.FC = () => {
  const { 
    theme: activeTheme, 
    activeThemeId, 
    selectTheme, 
    setPreviewMode, 
    setCurrentScreen,
    currentScreen,
    deviceFrameEnabled,
    setDeviceFrameEnabled 
  } = useTheme();

  const [previewScreenTab, setPreviewScreenTab] = useState<ScreenId>('home');
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);

  const themeList = Object.values(PRESET_THEMES);

  // Screen preview options
  const screenOptions: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Home Studio' },
    { id: 'record-screen', label: 'Full Screen Rec' },
    { id: 'custom-area', label: 'Area Crop' },
    { id: 'audio-settings', label: 'Audio Mixer' },
    { id: 'facecam-settings', label: 'Facecam Studio' },
    { id: 'recordings', label: 'Recordings' },
    { id: 'editor', label: 'Video Editor' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleSelectTheme = (themeId: string) => {
    selectTheme(themeId);
  };

  const handlePreviewFullApp = (themeId: string) => {
    selectTheme(themeId);
    setPreviewMode('app');
  };

  const handleCustomizeTheme = (themeId: string) => {
    selectTheme(themeId);
    setPreviewMode('editor');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Banner */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-40">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Creator Pro Recorder — UI Design Studio
            </h1>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              6 Themes Available
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare complete mobile themes, customize design tokens, and apply your favorite style across every screen.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Toggle Device Frame */}
          <button
            onClick={() => setDeviceFrameEnabled(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Toggle between phone chassis and edge-to-edge canvas"
          >
            {deviceFrameEnabled ? <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> : <Monitor className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{deviceFrameEnabled ? 'Phone Mockup' : 'Wide Responsive'}</span>
          </button>

          {/* Jump to Custom Design Editor */}
          <button
            onClick={() => setPreviewMode('editor')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Tokens</span>
          </button>

          {/* Launch Full App */}
          <button
            onClick={() => setPreviewMode('app')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all active:scale-95"
          >
            <span>Launch Active App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Screen Mode Preview Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2.5 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          Preview Screen:
        </span>
        <div className="flex items-center gap-1.5">
          {screenOptions.map((s) => {
            const isTabActive = previewScreenTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setPreviewScreenTab(s.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isTabActive
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Gallery Grid (6 Visually Distinct Themes) */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Select Your Recording Interface Theme
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Every design includes custom color palettes, card elevations, button geometries, and responsive navigation layouts.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Active: <strong className="text-emerald-400 font-semibold">{activeTheme.name}</strong>
          </div>
        </div>

        {/* 6 Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeList.map((item) => {
            const isSelected = activeThemeId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredThemeId(item.id)}
                onMouseLeave={() => setHoveredThemeId(null)}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                  isSelected 
                    ? 'ring-2 ring-emerald-400 shadow-2xl scale-[1.01]' 
                    : 'hover:border-slate-600 hover:shadow-xl'
                }`}
                style={{
                  backgroundColor: '#0e131f',
                  borderColor: isSelected ? '#10b981' : '#1e293b',
                  boxShadow: isSelected ? `0 0 35px ${item.glowColor}` : undefined,
                }}
              >
                {/* Active Selection Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] shadow-lg tracking-wider">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>ACTIVE THEME</span>
                  </div>
                )}

                {/* Card Top: Mobile Mini Mockup */}
                <div 
                  className="p-4 border-b border-slate-800 transition-colors relative"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  {/* Miniature Mobile UI Simulation */}
                  <div 
                    className="w-full h-56 rounded-xl p-3 border shadow-md flex flex-col justify-between overflow-hidden relative"
                    style={{
                      backgroundColor: item.surfaceColor,
                      borderColor: item.borderColor,
                      color: item.textColor,
                    }}
                  >
                    {/* Mini Status Bar */}
                    <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                      <span>09:41</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-black/60 border border-white/20" />
                      <span>5G 98%</span>
                    </div>

                    {/* Mini Content Mockup based on previewScreenTab */}
                    <div className="my-auto space-y-2">
                      {previewScreenTab === 'home' && (
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md"
                            style={{
                              borderColor: item.recordColor,
                              backgroundColor: `${item.recordColor}20`,
                            }}
                          >
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.recordColor }} />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold block" style={{ color: item.textColor }}>
                              Creator Pro Rec
                            </span>
                            <span className="text-[9px] font-mono" style={{ color: item.textMutedColor }}>
                              1080p 60fps · Ready
                            </span>
                          </div>
                          {/* Mini Modes Row */}
                          <div className="flex gap-1.5 w-full justify-center">
                            <span className="px-2 py-0.5 rounded text-[8px] font-semibold" style={{ backgroundColor: `${item.primaryColor}25`, color: item.primaryColor }}>
                              Full
                            </span>
                            <span className="px-2 py-0.5 rounded text-[8px] font-semibold" style={{ backgroundColor: `${item.primaryColor}25`, color: item.primaryColor }}>
                              Area
                            </span>
                            <span className="px-2 py-0.5 rounded text-[8px] font-semibold" style={{ backgroundColor: `${item.primaryColor}25`, color: item.primaryColor }}>
                              Mix
                            </span>
                          </div>
                        </div>
                      )}

                      {previewScreenTab === 'record-screen' && (
                        <div className="text-center space-y-2">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono bg-red-950/80 text-red-400 border border-red-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            <span>REC 03:24</span>
                          </div>
                          <div className="w-full h-14 rounded-lg bg-black/40 border flex items-center justify-center text-[9px] font-mono" style={{ borderColor: item.borderColor }}>
                            Simulated Screen Stream
                          </div>
                          {/* Floating mini pill widget */}
                          <div 
                            className="mx-auto px-3 py-1 rounded-full flex items-center gap-2 border text-[9px] shadow"
                            style={{
                              backgroundColor: item.surfaceSecondaryColor,
                              borderColor: item.borderColor,
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span>Pause</span>
                            <span>Stop</span>
                          </div>
                        </div>
                      )}

                      {previewScreenTab === 'custom-area' && (
                        <div className="text-center space-y-1.5">
                          <div className="w-full h-24 rounded-lg border-2 border-dashed relative flex items-center justify-center" style={{ borderColor: item.primaryColor }}>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">
                              1080 × 1920 (9:16)
                            </span>
                          </div>
                          <span className="text-[9px] font-semibold block" style={{ color: item.primaryColor }}>
                            Draggable Crop Bounds
                          </span>
                        </div>
                      )}

                      {previewScreenTab === 'audio-settings' && (
                        <div className="space-y-1.5 text-left text-[9px]">
                          <div className="flex justify-between font-semibold">
                            <span>Internal System SFX</span>
                            <span style={{ color: item.primaryColor }}>85%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: item.primaryColor }} />
                          </div>
                          <div className="flex justify-between font-semibold pt-1">
                            <span>Microphone Gain</span>
                            <span style={{ color: item.accentColor }}>70%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: item.accentColor }} />
                          </div>
                        </div>
                      )}

                      {previewScreenTab === 'facecam-settings' && (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div 
                            className="w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg"
                            style={{
                              borderColor: item.primaryColor,
                              backgroundColor: `${item.primaryColor}20`,
                            }}
                          >
                            <Camera className="w-5 h-5" style={{ color: item.primaryColor }} />
                          </div>
                          <span className="text-[9px] font-mono font-semibold" style={{ color: item.textMutedColor }}>
                            Circle · Bottom Right
                          </span>
                        </div>
                      )}

                      {previewScreenTab === 'recordings' && (
                        <div className="space-y-1.5">
                          <div className="p-1.5 rounded border flex items-center gap-2" style={{ borderColor: item.borderColor, backgroundColor: item.surfaceSecondaryColor }}>
                            <div className="w-8 h-6 rounded bg-black flex items-center justify-center shrink-0">
                              <Film className="w-3 h-3 text-white/70" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[9px] font-semibold truncate">Speedrun Floor 12</div>
                              <div className="text-[8px] font-mono text-neutral-400">06:42 · 248 MB</div>
                            </div>
                          </div>
                          <div className="p-1.5 rounded border flex items-center gap-2" style={{ borderColor: item.borderColor, backgroundColor: item.surfaceSecondaryColor }}>
                            <div className="w-8 h-6 rounded bg-black flex items-center justify-center shrink-0">
                              <Film className="w-3 h-3 text-white/70" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[9px] font-semibold truncate">Android 15 Preview</div>
                              <div className="text-[8px] font-mono text-neutral-400">12:15 · 420 MB</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {previewScreenTab === 'editor' && (
                        <div className="space-y-1.5">
                          <div className="w-full h-12 rounded bg-black flex items-center justify-center text-[9px] font-mono text-white/60">
                            Video Scrub Player
                          </div>
                          <div className="w-full h-3 rounded bg-slate-800 border relative overflow-hidden" style={{ borderColor: item.primaryColor }}>
                            <div className="absolute inset-y-0 left-2 right-4" style={{ backgroundColor: `${item.primaryColor}40` }} />
                          </div>
                          <div className="text-[8px] font-mono text-center" style={{ color: item.textMutedColor }}>
                            Trim: 01:20 - 04:30
                          </div>
                        </div>
                      )}

                      {previewScreenTab === 'settings' && (
                        <div className="space-y-1 text-[9px]">
                          <div className="flex justify-between p-1 rounded bg-black/20">
                            <span>Output Resolution</span>
                            <span className="font-mono font-bold" style={{ color: item.primaryColor }}>1080p FHD</span>
                          </div>
                          <div className="flex justify-between p-1 rounded bg-black/20">
                            <span>Capture Framerate</span>
                            <span className="font-mono font-bold" style={{ color: item.primaryColor }}>60 FPS</span>
                          </div>
                          <div className="flex justify-between p-1 rounded bg-black/20">
                            <span>Video Codec</span>
                            <span className="font-mono" style={{ color: item.textMutedColor }}>H.265 (HEVC)</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mini Bottom Nav */}
                    <div 
                      className="pt-1.5 border-t flex justify-around text-[8px] font-mono opacity-80"
                      style={{ borderColor: item.borderColor }}
                    >
                      <span className="font-bold" style={{ color: item.primaryColor }}>Studio</span>
                      <span>Clips</span>
                      <span>Edit</span>
                      <span>Setup</span>
                    </div>
                  </div>
                </div>

                {/* Card Body: Theme Details & Palette */}
                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {item.name}
                      </h3>
                      <span 
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{
                          backgroundColor: `${item.primaryColor}15`,
                          borderColor: `${item.primaryColor}40`,
                          color: item.primaryColor,
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Color Palette Preview Swatches */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Theme Color Tokens
                    </span>
                    <div className="flex items-center gap-2">
                      {item.palette.map((color, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full h-6 rounded-md border border-white/10 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                          <span className="text-[9px] font-mono text-slate-400">
                            {color.replace('#', '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Token Specification Specs */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Button Geometry:</span>
                      <strong className="text-slate-200 capitalize font-medium">{item.buttonShape} ({item.borderRadius}px)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Navigation Layout:</span>
                      <strong className="text-slate-200 capitalize font-medium">{item.navLayout}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Select This Design Button */}
                      <button
                        onClick={() => handleSelectTheme(item.id)}
                        className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{isSelected ? 'Active Design' : 'Select Design'}</span>
                      </button>

                      {/* Preview Full App Button */}
                      <button
                        onClick={() => handlePreviewFullApp(item.id)}
                        className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Preview App</span>
                      </button>
                    </div>

                    {/* Customize Theme Button */}
                    <button
                      onClick={() => handleCustomizeTheme(item.id)}
                      className="w-full py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sliders className="w-3 h-3 text-indigo-400" />
                      <span>Customize {item.name} tokens →</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
