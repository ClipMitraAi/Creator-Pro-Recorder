import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Camera, RefreshCw, Circle, Square, Check, VideoOff } from 'lucide-react';
import { FacecamShape, FacecamPosition } from '../../types/recorder';

export const FacecamSettingsScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();

  const [shape, setShape] = useState<FacecamShape>('circle');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [position, setPosition] = useState<FacecamPosition>('bottom-right');
  const [mirror, setMirror] = useState(true);
  const [opacity, setOpacity] = useState(100);
  const [borderWidth, setBorderWidth] = useState(3);
  const [webcamActive, setWebcamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Toggle user camera
  const toggleCamera = async () => {
    if (webcamActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setWebcamActive(false);
      return;
    }

    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 480, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setWebcamActive(true);
      showToast('Front camera preview activated');
    } catch (err: any) {
      console.warn('Webcam permission not granted or device lacks camera:', err);
      setCameraError('Camera access unavailable. Using interactive presenter avatar.');
      setWebcamActive(false);
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Size in pixels for preview
  const getDimension = () => {
    switch (size) {
      case 'small': return 90;
      case 'large': return 150;
      case 'medium':
      default: return 120;
    }
  };

  // Shape class or inline border radius
  const getShapeRadius = () => {
    switch (shape) {
      case 'circle': return '9999px';
      case 'rounded': return '18px';
      case 'square': return '4px';
      case 'oval': return '40px / 24px';
      default: return '9999px';
    }
  };

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
            Facecam Studio
          </h2>
          <p className="text-xs" style={{ color: theme.textMutedColor }}>
            Front camera bubble geometry & position
          </p>
        </div>
      </div>

      {/* Live Preview Stage */}
      <div 
        className="w-full h-56 rounded-2xl relative overflow-hidden flex flex-col justify-between p-3 border shadow-inner"
        style={{
          backgroundColor: '#05070a',
          borderColor: theme.borderColor,
        }}
      >
        {/* Background screen preview */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-indigo-950 via-slate-900 to-black pointer-events-none" />
        
        <div className="flex justify-between items-center z-10 text-[11px] font-mono text-white/70">
          <span>Screen Recording Canvas</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live Preview
          </span>
        </div>

        {/* Positioned Facecam Bubble */}
        <div
          className="absolute transition-all duration-300 overflow-hidden shadow-2xl flex items-center justify-center"
          style={{
            width: `${getDimension()}px`,
            height: `${getDimension()}px`,
            borderRadius: getShapeRadius(),
            border: `${borderWidth}px solid ${theme.primaryColor}`,
            opacity: opacity / 100,
            transform: mirror ? 'scaleX(-1)' : 'none',
            boxShadow: `0 0 25px ${theme.primaryColor}60`,
            // Positioning logic
            top: position.includes('top') ? '24px' : undefined,
            bottom: position.includes('bottom') ? '24px' : undefined,
            left: position.includes('left') ? '16px' : undefined,
            right: position.includes('right') ? '16px' : undefined,
          }}
        >
          {/* Real video or Simulated Presenter Avatar */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${webcamActive ? 'block' : 'hidden'}`}
          />
          {!webcamActive && (
            <div className="w-full h-full bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-800 flex flex-col items-center justify-center p-2 text-center select-none">
              <Camera className="w-6 h-6 text-white mb-1" />
              <span className="text-[10px] font-mono text-white/90 font-bold">PRESENTER</span>
            </div>
          )}
        </div>

        {/* Camera Toggle Button on Stage */}
        <div className="z-10 flex justify-end">
          <button
            onClick={toggleCamera}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border text-white transition-all active:scale-95"
            style={{
              backgroundColor: webcamActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0,0,0,0.6)',
              borderColor: webcamActive ? '#10b981' : 'rgba(255,255,255,0.2)',
            }}
          >
            {webcamActive ? <Camera className="w-3.5 h-3.5 text-emerald-400" /> : <VideoOff className="w-3.5 h-3.5 text-white/70" />}
            <span>{webcamActive ? 'Disable Real Camera' : 'Test Real Webcam'}</span>
          </button>
        </div>
      </div>

      {cameraError && (
        <p className="text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/30">
          {cameraError}
        </p>
      )}

      {/* Geometry Shape Selector */}
      <div 
        className="p-4 space-y-3 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Facecam Shape
        </span>

        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'circle', label: 'Circular', radius: 'rounded-full' },
            { id: 'rounded', label: 'Rounded', radius: 'rounded-xl' },
            { id: 'square', label: 'Square', radius: 'rounded-sm' },
            { id: 'oval', label: 'Oval', radius: 'rounded-3xl' },
          ].map((item) => {
            const isSelected = shape === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setShape(item.id as FacecamShape)}
                className="p-2 border flex flex-col items-center justify-center gap-1.5 transition-all"
                style={{
                  backgroundColor: isSelected ? `${theme.primaryColor}18` : 'transparent',
                  borderColor: isSelected ? theme.primaryColor : theme.borderColor,
                  borderRadius: `${theme.borderRadius - 4}px`,
                }}
              >
                <div 
                  className={`w-6 h-6 border-2 flex items-center justify-center ${item.radius}`}
                  style={{ borderColor: isSelected ? theme.primaryColor : theme.textMutedColor }}
                />
                <span className="text-[10px] font-semibold" style={{ color: isSelected ? theme.primaryColor : theme.textMutedColor }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Anchor Position Grid */}
      <div 
        className="p-4 space-y-3 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Screen Anchor Position
        </span>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'top-left', label: 'Top Left' },
            { id: 'top-right', label: 'Top Right' },
            { id: 'bottom-left', label: 'Bottom Left' },
            { id: 'bottom-right', label: 'Bottom Right' },
          ].map((pos) => {
            const isSelected = position === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => setPosition(pos.id as FacecamPosition)}
                className="py-2.5 px-3 border flex items-center justify-between text-xs font-semibold transition-all"
                style={{
                  backgroundColor: isSelected ? `${theme.primaryColor}18` : 'transparent',
                  borderColor: isSelected ? theme.primaryColor : theme.borderColor,
                  borderRadius: `${theme.borderRadius - 4}px`,
                  color: isSelected ? theme.primaryColor : theme.textColor,
                }}
              >
                <span>{pos.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size & Opacity Controls */}
      <div 
        className="p-4 space-y-4 border"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Scale & Translucency
        </span>

        {/* Size */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: theme.textColor }}>Overlay Size</span>
          <div className="flex gap-2">
            {(['small', 'medium', 'large'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="px-2.5 py-1 text-xs font-semibold capitalize border rounded transition-all"
                style={{
                  backgroundColor: size === s ? `${theme.primaryColor}20` : 'transparent',
                  borderColor: size === s ? theme.primaryColor : theme.borderColor,
                  color: size === s ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Opacity */}
        <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <div className="flex justify-between text-xs">
            <span style={{ color: theme.textColor }}>Bubble Opacity</span>
            <span className="font-mono font-bold" style={{ color: theme.primaryColor }}>
              {opacity}%
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Mirror */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <div>
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>
              Mirror Front Camera
            </h4>
            <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
              Flips video preview horizontally
            </p>
          </div>
          <button
            onClick={() => setMirror(!mirror)}
            className={`w-10 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              mirror ? 'justify-end' : 'justify-start bg-slate-700'
            }`}
            style={{ backgroundColor: mirror ? theme.primaryColor : undefined }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={() => {
          showToast('Facecam preferences updated');
          setCurrentScreen('home');
        }}
        className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg active:scale-98 transition-transform"
        style={{
          backgroundColor: theme.primaryColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        Save Facecam Settings
      </button>
    </div>
  );
};
