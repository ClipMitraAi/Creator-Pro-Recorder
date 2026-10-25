import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AdMobProvider, useAdMob, ADMOB_UNITS } from './context/AdMobContext';
import { ThemeGallery } from './components/ThemeGallery';
import { CustomDesignEditor } from './components/CustomDesignEditor';
import { DeviceFrame } from './components/DeviceFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { FullScreenRecordScreen } from './components/screens/FullScreenRecordScreen';
import { CustomAreaScreen } from './components/screens/CustomAreaScreen';
import { AudioSettingsScreen } from './components/screens/AudioSettingsScreen';
import { FacecamSettingsScreen } from './components/screens/FacecamSettingsScreen';
import { RecordingsGalleryScreen } from './components/screens/RecordingsGalleryScreen';
import { VideoEditorScreen } from './components/screens/VideoEditorScreen';
import { GeneralSettingsScreen } from './components/screens/GeneralSettingsScreen';
import { AdMobInterstitialModal } from './components/ads/AdMobInterstitialModal';
import { AdMobRewardedModal } from './components/ads/AdMobRewardedModal';
import { AdMobSettingsModal } from './components/ads/AdMobSettingsModal';
import { 
  Palette, 
  Smartphone, 
  Monitor, 
  Sliders, 
  CheckCircle, 
  X,
  Layers,
  ArrowLeft,
  Layout,
  Gift
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    theme, 
    previewMode, 
    setPreviewMode, 
    currentScreen, 
    setCurrentScreen,
    confirmationToast, 
    clearToast,
    deviceFrameEnabled,
    setDeviceFrameEnabled 
  } = useTheme();

  const {
    showAdMobCodeModal,
    setShowAdMobCodeModal,
    isVipUnlocked,
    triggerRewarded
  } = useAdMob();

  // Mode 1: UI Design Gallery (6 distinct themes)
  if (previewMode === 'studio') {
    return (
      <div className="relative">
        <ThemeGallery />
        
        {/* Floating Toast Notification */}
        {confirmationToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-white text-xs font-semibold backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{confirmationToast}</span>
            <button onClick={clearToast} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Global AdMob Modals */}
        <AdMobInterstitialModal />
        <AdMobRewardedModal />
        {showAdMobCodeModal && <AdMobSettingsModal onClose={() => setShowAdMobCodeModal(false)} />}
      </div>
    );
  }

  // Mode 2: Custom Design Editor (Live split pane customizer)
  if (previewMode === 'editor') {
    return (
      <div className="relative">
        <CustomDesignEditor />
        
        {/* Floating Toast Notification */}
        {confirmationToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-white text-xs font-semibold backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{confirmationToast}</span>
            <button onClick={clearToast} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Global AdMob Modals */}
        <AdMobInterstitialModal />
        <AdMobRewardedModal />
        {showAdMobCodeModal && <AdMobSettingsModal onClose={() => setShowAdMobCodeModal(false)} />}
      </div>
    );
  }

  // Mode 3: Full Application Experience
  const renderCurrentScreen = () => {
    switch (currentScreen) {
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
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 select-none">
      {/* Studio Header Toolbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="text-xs font-bold text-white tracking-tight">
              Creator Pro Recorder
            </span>
          </div>
          <span 
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              borderColor: `${theme.primaryColor}30`,
              color: theme.primaryColor,
            }}
          >
            {theme.name}
          </span>
          {isVipUnlocked && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Gift className="w-3 h-3" />
              VIP UNLOCKED
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AdMob Ads Hub Button */}
          <button
            onClick={() => setShowAdMobCodeModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 transition-colors"
            title="Google AdMob Integration Hub (Banner, Interstitial, Rewarded)"
          >
            <Layout className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">AdMob Ads</span>
          </button>

          {/* Toggle Device Chassis */}
          <button
            onClick={() => setDeviceFrameEnabled(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Toggle Android Device Frame"
          >
            {deviceFrameEnabled ? <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> : <Monitor className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{deviceFrameEnabled ? 'Phone Mockup' : 'Wide Responsive'}</span>
          </button>

          {/* Theme Gallery Button */}
          <button
            onClick={() => setPreviewMode('studio')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow transition-all active:scale-95"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme Studio</span>
          </button>

          {/* Customize Tokens Button */}
          <button
            onClick={() => setPreviewMode('editor')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <DeviceFrame>
          {renderCurrentScreen()}
          <BottomNavBar />
        </DeviceFrame>
      </main>

      {/* Floating Toast Notification */}
      {confirmationToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-white text-xs font-semibold backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{confirmationToast}</span>
          <button onClick={clearToast} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Global AdMob Modals */}
      <AdMobInterstitialModal />
      <AdMobRewardedModal />
      {showAdMobCodeModal && <AdMobSettingsModal onClose={() => setShowAdMobCodeModal(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AdMobProvider>
        <MainAppContent />
      </AdMobProvider>
    </ThemeProvider>
  );
}
