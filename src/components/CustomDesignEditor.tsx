import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  CardStyle, 
  ButtonShape, 
  IconStyle, 
  FontSizeScale, 
  NavLayout, 
  RecordButtonDesign, 
  FloatingControlStyle,
  ScreenId
} from '../types/theme';
import { 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  Check, 
  Layers, 
  Sliders, 
  Smartphone, 
  Sun, 
  Moon,
  Palette,
  Eye
} from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { FullScreenRecordScreen } from './screens/FullScreenRecordScreen';
import { CustomAreaScreen } from './screens/CustomAreaScreen';
import { AudioSettingsScreen } from './screens/AudioSettingsScreen';
import { FacecamSettingsScreen } from './screens/FacecamSettingsScreen';
import { RecordingsGalleryScreen } from './screens/RecordingsGalleryScreen';
import { VideoEditorScreen } from './screens/VideoEditorScreen';
import { GeneralSettingsScreen } from './screens/GeneralSettingsScreen';
import { BottomNavBar } from './BottomNavBar';
import { DeviceFrame } from './DeviceFrame';

export const CustomDesignEditor: React.FC = () => {
  const { 
    theme, 
    updateThemeProperty, 
    saveCurrentTheme, 
    resetToDefault, 
    setPreviewMode, 
    showToast,
    currentScreen,
    setCurrentScreen 
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'colors' | 'geometry' | 'recording' | 'layout'>('colors');
  const [editorScreenTab, setEditorScreenTab] = useState<ScreenId>('home');

  // Handle color change
  const handleColorChange = (key: any, val: string) => {
    updateThemeProperty(key, val);
  };

  const renderScreenPreview = () => {
    switch (editorScreenTab) {
      case 'record-screen': return <FullScreenRecordScreen />;
      case 'custom-area': return <CustomAreaScreen />;
      case 'audio-settings': return <AudioSettingsScreen />;
      case 'facecam-settings': return <FacecamSettingsScreen />;
      case 'recordings': return <RecordingsGalleryScreen />;
      case 'editor': return <VideoEditorScreen />;
      case 'settings': return <GeneralSettingsScreen />;
      case 'home':
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode('studio')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back to Theme Studio"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Theme Customizer:</span>
              <span className="text-emerald-400">{theme.name}</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Live updates propagate instantly across all application screens
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Reset to Default */}
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          {/* Save Design */}
          <button
            onClick={saveCurrentTheme}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Design</span>
          </button>

          {/* Launch Full App */}
          <button
            onClick={() => setPreviewMode('app')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch App</span>
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Control Panel */}
        <div className="w-full lg:w-[480px] border-r border-slate-800 bg-slate-900/60 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Navigation Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            {[
              { id: 'colors', label: 'Colors' },
              { id: 'geometry', label: 'Geometry' },
              { id: 'recording', label: 'Controls' },
              { id: 'layout', label: 'Layout' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-5">
              {/* Light / Dark Mode Toggle */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Theme Base Mode</h3>
                  <p className="text-[10px] text-slate-400">Light or Dark canvas contrast</p>
                </div>
                <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => {
                      updateThemeProperty('mode', 'dark');
                      updateThemeProperty('backgroundColor', '#090d10');
                      updateThemeProperty('surfaceColor', '#12181f');
                      updateThemeProperty('textColor', '#f8fafc');
                      updateThemeProperty('textMutedColor', '#94a3b8');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      theme.mode === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-400'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => {
                      updateThemeProperty('mode', 'light');
                      updateThemeProperty('backgroundColor', '#f8fafc');
                      updateThemeProperty('surfaceColor', '#ffffff');
                      updateThemeProperty('textColor', '#0f172a');
                      updateThemeProperty('textMutedColor', '#64748b');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      theme.mode === 'light' ? 'bg-white text-slate-900 shadow' : 'text-slate-400'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </button>
                </div>
              </div>

              {/* Color Pickers Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Core Color Tokens
                </span>

                {[
                  { key: 'primaryColor', label: 'Primary Brand Color', desc: 'Main interactive elements & active states', val: theme.primaryColor },
                  { key: 'secondaryColor', label: 'Secondary Color', desc: 'Supporting badges & subtitles', val: theme.secondaryColor },
                  { key: 'accentColor', label: 'Accent Highlight', desc: 'Visual markers & trim indicators', val: theme.accentColor },
                  { key: 'recordColor', label: 'Record Tally Color', desc: 'Broadcast live recording indicators', val: theme.recordColor },
                  { key: 'backgroundColor', label: 'Background Field', desc: 'Root canvas surface', val: theme.backgroundColor },
                  { key: 'surfaceColor', label: 'Card Surface', desc: 'Containers & modules', val: theme.surfaceColor },
                ].map((item) => (
                  <div 
                    key={item.key} 
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white">{item.label}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="color"
                        value={item.val.startsWith('#') ? item.val : '#10b981'}
                        onChange={(e) => handleColorChange(item.key, e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300 w-16">
                        {item.val.startsWith('#') ? item.val : 'rgba/glass'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Swatch Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Popular Primary Swatches:
                </span>
                <div className="flex items-center gap-2">
                  {['#10b981', '#06b6d4', '#2563eb', '#9333ea', '#ef4444', '#f59e0b', '#ec4899', '#ffffff'].map(c => (
                    <button
                      key={c}
                      onClick={() => handleColorChange('primaryColor', c)}
                      className="w-7 h-7 rounded-full border-2 border-white/20 hover:scale-110 transition-transform shadow"
                      style={{ backgroundColor: c }}
                      title={`Select ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GEOMETRY */}
          {activeTab === 'geometry' && (
            <div className="space-y-5">
              {/* Card Style */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Card Style Elevation
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['bordered', 'flat', 'soft-glow', 'glassmorphic'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => updateThemeProperty('cardStyle', style)}
                      className={`p-3 rounded-xl border text-left capitalize text-xs font-semibold transition-all ${
                        theme.cardStyle === style
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span>{style.replace('-', ' ')}</span>
                        {theme.cardStyle === style && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] opacity-70 block font-normal">
                        {style === 'glassmorphic' ? 'Backdrop blur' : style === 'soft-glow' ? 'Accent radiance' : 'Structural borders'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Shape */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Button Geometry
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['rounded-xl', 'rounded-2xl', 'rounded-full', 'rounded-md'] as const).map(shape => (
                    <button
                      key={shape}
                      onClick={() => updateThemeProperty('buttonShape', shape)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        theme.buttonShape === shape
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <span className="capitalize">{shape.replace('-', ' ')}</span>
                      {theme.buttonShape === shape && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Radius Slider */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">Global Border Radius</span>
                  <span className="font-mono font-bold text-emerald-400">{theme.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="28"
                  value={theme.borderRadius}
                  onChange={(e) => updateThemeProperty('borderRadius', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Font Size Scale */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Typography Density
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'standard', 'relaxed'] as const).map(scale => (
                    <button
                      key={scale}
                      onClick={() => updateThemeProperty('fontSize', scale)}
                      className={`py-2 px-3 rounded-lg border text-xs capitalize font-semibold transition-all ${
                        theme.fontSize === scale
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RECORDING CONTROLS */}
          {activeTab === 'recording' && (
            <div className="space-y-5">
              {/* Record Button Design */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Recording Trigger Design
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'classic-ring', label: 'Classic Studio Ring', desc: 'Outer bezel with center tally' },
                    { id: 'pulse-glow', label: 'Pulse Glow Hub', desc: 'Breathing radial broadcast halo' },
                    { id: 'studio-square', label: 'Studio Angular', desc: 'Broadcast tally square' },
                    { id: 'neon-target', label: 'Neon Cyber Target', desc: 'Dual spinning targeting rims' },
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={() => updateThemeProperty('recordButtonDesign', btn.id as RecordButtonDesign)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        theme.recordButtonDesign === btn.id
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span>{btn.label}</span>
                        {theme.recordButtonDesign === btn.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] opacity-70 block font-normal">{btn.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Widget Style */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Floating Recording Overlay Widget
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'mini-pill', label: 'Mini Capsule Pill', desc: 'Rounded floating dock' },
                    { id: 'circular-bubble', label: 'Circular Radial Bubble', desc: 'Draggable touch orb' },
                    { id: 'dock-side', label: 'Pinned Dock Edge', desc: 'Anchored screen panel' },
                    { id: 'corner-chip', label: 'Corner Telemetry Chip', desc: 'Compact header readout' },
                  ].map(w => (
                    <button
                      key={w.id}
                      onClick={() => updateThemeProperty('floatingControlStyle', w.id as FloatingControlStyle)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        theme.floatingControlStyle === w.id
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span>{w.label}</span>
                        {theme.floatingControlStyle === w.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <span className="text-[10px] opacity-70 block font-normal">{w.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LAYOUT */}
          {activeTab === 'layout' && (
            <div className="space-y-5">
              {/* Navigation Bar Layout */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Bottom Navigation Style
                </span>
                <div className="space-y-2">
                  {[
                    { id: 'bottom-tabs', label: 'Full Width Edge-to-Edge Tabs', desc: 'Standard Android 4-tab bar fixed at bottom' },
                    { id: 'floating-pill', label: 'Floating Island Pill Dock', desc: 'Floating rounded capsule lifted off the edge with blur' },
                    { id: 'minimal-dock', label: 'Compact Minimal Dock', desc: 'Tactical ultra-slim toolbar with icon indicators' },
                  ].map(nav => (
                    <button
                      key={nav.id}
                      onClick={() => updateThemeProperty('navLayout', nav.id as NavLayout)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        theme.navLayout === nav.id
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div>
                        <span>{nav.label}</span>
                        <p className="text-[10px] opacity-70 font-normal">{nav.desc}</p>
                      </div>
                      {theme.navLayout === nav.id && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Style */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Icon Aesthetic
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['stroke', 'duotone', 'filled'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => updateThemeProperty('iconStyle', style)}
                      className={`py-2 px-3 rounded-lg border text-xs capitalize font-semibold transition-all ${
                        theme.iconStyle === style
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Live Preview Workspace */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Preview Screen Selector Bar */}
          <div className="p-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 shrink-0">
              Live Preview Screen:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'home', label: 'Studio Home' },
                { id: 'record-screen', label: 'Live Rec' },
                { id: 'custom-area', label: 'Crop Region' },
                { id: 'audio-settings', label: 'Audio Mixer' },
                { id: 'facecam-settings', label: 'Facecam' },
                { id: 'recordings', label: 'Vault' },
                { id: 'editor', label: 'Trimmer' },
                { id: 'settings', label: 'Engine' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setEditorScreenTab(s.id as ScreenId)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    editorScreenTab === s.id
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Phone Frame Host */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <DeviceFrame>
              {renderScreenPreview()}
              <BottomNavBar />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </div>
  );
};
