import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAdMob } from '../../context/AdMobContext';
import { 
  Square, 
  Pause, 
  Play, 
  PenTool, 
  Camera, 
  X, 
  Check, 
  RotateCcw, 
  ArrowLeft,
  Sliders,
  Share2,
  Trash2,
  Tv
} from 'lucide-react';

export const FullScreenRecordScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();
  const { triggerInterstitial } = useAdMob();

  // Recording timer simulation
  const [seconds, setSeconds] = useState(142); // 02:22
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState(theme.primaryColor);
  const [facecamVisible, setFacecamVisible] = useState(true);
  const [widgetPosition, setWidgetPosition] = useState({ x: 20, y: 70 });
  const [isDraggingWidget, setIsDraggingWidget] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  // Drawing canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPaintingRef = useRef(false);

  // Tick up every second if not paused and not stopped
  useEffect(() => {
    if (isPaused || isStopped) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isStopped]);

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Drawing helpers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    isPaintingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPaintingRef.current || !isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isPaintingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Stop recording handler
  const handleStopRecording = () => {
    setIsStopped(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-black select-none">
      {/* Simulated Screen Content (Gaming / App Demo View) */}
      <div className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-between p-4">
        {/* Background Simulated App UI */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black pointer-events-none" />
        
        {/* Simulated Game/Media Backdrop UI */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="pointer-events-auto p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE SCREEN SIMULATION
            </span>
          </div>

          <span className="text-xs font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded-full">
            60 FPS · 1080p
          </span>
        </div>

        {/* Center Mock Content: Cyber Game Interface */}
        <div className="my-auto text-center space-y-3 pointer-events-none">
          <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Tv className="w-10 h-10 mx-auto text-white/80 mb-2" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Capturing Screen Stream
            </h3>
            <p className="text-[11px] text-white/60 font-mono mt-0.5">
              Android MediaProjection Service
            </p>
          </div>
          <div className="text-[10px] text-white/40 max-w-[260px] mx-auto">
            (Web preview simulation — native app hooks to Android VirtualDisplay via Jetpack Compose)
          </div>
        </div>

        {/* Floating Facecam Bubble */}
        {facecamVisible && (
          <div 
            className="absolute bottom-20 right-4 z-20 w-24 h-24 rounded-full overflow-hidden border-2 shadow-2xl transition-all cursor-move group"
            style={{
              borderColor: theme.primaryColor,
              boxShadow: `0 0 20px ${theme.primaryColor}50`,
            }}
          >
            {/* Mock Camera Presenter or Gradient Video */}
            <div className="w-full h-full bg-gradient-to-tr from-purple-900 via-slate-800 to-indigo-900 flex flex-col items-center justify-center relative">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-[9px] font-mono text-white/90 mt-1 font-bold">FACECAM</span>
              <button 
                onClick={() => setFacecamVisible(false)}
                className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Annotation Canvas */}
        <canvas
          ref={canvasRef}
          width={400}
          height={750}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={`absolute inset-0 w-full h-full z-15 ${
            isDrawing ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
          }`}
        />
      </div>

      {/* Drawing Toolbar Overlay (if pen tool active) */}
      {isDrawing && (
        <div 
          className="absolute top-16 left-4 right-4 z-30 p-2.5 rounded-xl flex items-center justify-between backdrop-blur-xl border shadow-xl"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderColor: theme.borderColor,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">Pen Tool:</span>
            {['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ffffff'].map(c => (
              <button
                key={c}
                onClick={() => setBrushColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${brushColor === c ? 'scale-125 border-white' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="p-1.5 text-xs text-white/80 hover:text-white bg-white/10 rounded-lg flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setIsDrawing(false)}
              className="p-1.5 text-xs text-white bg-red-600 rounded-lg flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </div>
        </div>
      )}

      {/* FLOATING RECORDING CONTROLS WIDGET */}
      {/* Renders differently according to theme.floatingControlStyle: mini-pill, circular-bubble, dock-side, corner-chip */}
      <div className="absolute bottom-6 left-0 right-0 px-4 z-30 flex justify-center pointer-events-none">
        <div 
          className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 border shadow-2xl backdrop-blur-xl transition-all"
          style={{
            backgroundColor: theme.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.92)',
            borderColor: theme.borderColor,
            borderRadius: theme.floatingControlStyle === 'mini-pill' ? '9999px' : `${theme.borderRadius}px`,
            boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px ${theme.glowColor}`,
          }}
        >
          {/* Ticking Time */}
          <div className="flex items-center gap-2 pr-2 border-r" style={{ borderColor: theme.borderColor }}>
            <span 
              className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-red-500 animate-pulse'}`}
            />
            <span 
              className="font-mono text-sm font-bold tracking-wider"
              style={{ color: theme.textColor }}
            >
              {formatTime(seconds)}
            </span>
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full transition-transform active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
            style={{
              backgroundColor: isPaused ? `${theme.primaryColor}25` : `${theme.textColor}15`,
              color: isPaused ? theme.primaryColor : theme.textColor,
            }}
            title={isPaused ? 'Resume Recording' : 'Pause Recording'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Annotation / Pen Toggle */}
          <button
            onClick={() => setIsDrawing(!isDrawing)}
            className="p-2 rounded-full transition-transform active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
            style={{
              backgroundColor: isDrawing ? `${theme.accentColor}30` : `${theme.textColor}15`,
              color: isDrawing ? theme.accentColor : theme.textColor,
            }}
            title="Draw on Screen"
          >
            <PenTool className="w-4 h-4" />
          </button>

          {/* Facecam Toggle */}
          <button
            onClick={() => setFacecamVisible(!facecamVisible)}
            className="p-2 rounded-full transition-transform active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
            style={{
              backgroundColor: facecamVisible ? `${theme.primaryColor}25` : `${theme.textColor}15`,
              color: facecamVisible ? theme.primaryColor : theme.textColor,
            }}
            title="Toggle Facecam Bubble"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* STOP RECORD BUTTON */}
          <button
            onClick={handleStopRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-bold text-xs shadow-md transition-all active:scale-95"
            style={{
              backgroundColor: theme.recordColor,
              boxShadow: `0 0 15px ${theme.recordColor}60`,
            }}
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Stop</span>
          </button>
        </div>
      </div>

      {/* Recording Complete Modal */}
      {isStopped && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div 
            className="w-full max-w-sm p-5 border shadow-2xl space-y-4"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                >
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: theme.textColor }}>
                    Recording Captured
                  </h3>
                  <p className="text-[11px] font-mono" style={{ color: theme.textMutedColor }}>
                    Duration: {formatTime(seconds)} · 1080p60
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between">
                <span style={{ color: theme.textMutedColor }}>File Size:</span>
                <span className="font-mono font-bold" style={{ color: theme.textColor }}>
                  {(seconds * 0.82).toFixed(1)} MB
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme.textMutedColor }}>Format:</span>
                <span className="font-mono" style={{ color: theme.textColor }}>MP4 (H.264 / AAC)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  triggerInterstitial(() => {
                    setCurrentScreen('editor');
                  });
                }}
                className="w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl text-white shadow-lg transition-transform active:scale-98"
                style={{
                  backgroundColor: theme.primaryColor,
                  borderRadius: `${theme.borderRadius}px`,
                }}
              >
                <Sliders className="w-4 h-4" />
                <span>Open in Video Editor (AdMob Interstitial)</span>
              </button>

              <button
                onClick={() => {
                  triggerInterstitial(() => {
                    setCurrentScreen('recordings');
                  });
                }}
                className="w-full py-2 text-xs font-semibold flex items-center justify-center gap-2 rounded-xl border transition-all"
                style={{
                  borderColor: theme.borderColor,
                  color: theme.textColor,
                  borderRadius: `${theme.borderRadius}px`,
                }}
              >
                <span>View in Gallery</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
