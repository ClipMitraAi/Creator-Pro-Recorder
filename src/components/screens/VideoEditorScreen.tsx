import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Scissors, 
  Share2, 
  Download, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  FastForward,
  Check,
  X
} from 'lucide-react';
import { SAMPLE_RECORDINGS } from '../../data/sampleRecordings';

export const VideoEditorScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();

  // Active video
  const activeClip = SAMPLE_RECORDINGS[0];

  // Trimmer state (in percentage of total video)
  const [startPercent, setStartPercent] = useState(10);
  const [endPercent, setEndPercent] = useState(85);
  const [currentScrubPercent, setCurrentScrubPercent] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [aspect, setAspect] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  
  // Export Modal state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportFormat, setExportFormat] = useState<'MP4' | 'GIF' | 'WebM'>('MP4');
  const [exportQuality, setExportQuality] = useState<'1080p' | '720p' | '4k'>('1080p');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync video time with scrub percentage
  const totalDuration = activeClip.durationSeconds; // e.g. 402s
  const currentSeconds = Math.round((currentScrubPercent / 100) * totalDuration);
  const trimDurationSeconds = Math.round(((endPercent - startPercent) / 100) * totalDuration);

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Toggle Play
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle Export Flow
  const startExport = () => {
    setIsExporting(true);
    setExportProgress(10);
    setExportComplete(false);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExportComplete(true);
          return 100;
        }
        return prev + 18;
      });
    }, 350);
  };

  return (
    <div className="flex-1 p-4 pb-20 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('recordings')}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold" style={{ color: theme.textColor }}>
              Precision Trimmer
            </h2>
            <p className="text-[11px]" style={{ color: theme.textMutedColor }}>
              Trim & re-encode without quality loss
            </p>
          </div>
        </div>

        <button
          onClick={startExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow transition-all active:scale-95"
          style={{
            backgroundColor: theme.primaryColor,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Video Player Preview Canvas */}
      <div 
        className="w-full aspect-video rounded-2xl overflow-hidden relative bg-black border shadow-lg flex items-center justify-center"
        style={{ borderColor: theme.borderColor }}
      >
        <video
          ref={videoRef}
          src={activeClip.videoUrl}
          playsInline
          muted={isMuted}
          className="w-full h-full object-contain"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Central Play/Pause Watermark */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </div>
        </button>

        {/* Video Overlaid Time Badge */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 font-mono text-[10px] text-white">
          {formatTime(currentSeconds)} / {formatTime(totalDuration)}
        </div>

        {/* Mute toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/75 text-white hover:bg-black"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* TIMELINE FILMSTRIP & DUAL-HANDLE TRIMMER */}
      <div 
        className="p-4 border space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider" style={{ color: theme.textMutedColor }}>
            Timeline Scrub
          </span>
          <span className="font-mono text-[11px] font-bold" style={{ color: theme.primaryColor }}>
            Selected: {formatTime(trimDurationSeconds)}
          </span>
        </div>

        {/* Filmstrip Container */}
        <div className="relative h-14 rounded-lg bg-slate-900 border overflow-hidden select-none" style={{ borderColor: theme.borderColor }}>
          {/* Mock thumbnail filmstrip tiles */}
          <div className="absolute inset-0 flex opacity-60">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div 
                key={idx} 
                className="flex-1 h-full border-r border-black/50 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeClip.thumbnailUrl})` }}
              />
            ))}
          </div>

          {/* Dimmed Out-of-bounds regions */}
          {/* Left Dim */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-black/80 pointer-events-none"
            style={{ width: `${startPercent}%` }}
          />
          {/* Right Dim */}
          <div 
            className="absolute right-0 top-0 bottom-0 bg-black/80 pointer-events-none"
            style={{ width: `${100 - endPercent}%` }}
          />

          {/* Selected Active Trim Window Highlight */}
          <div 
            className="absolute top-0 bottom-0 border-y-2 pointer-events-none"
            style={{
              left: `${startPercent}%`,
              width: `${endPercent - startPercent}%`,
              borderColor: theme.primaryColor,
              backgroundColor: `${theme.primaryColor}15`,
            }}
          />

          {/* Current Scrubber Head Needle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-10"
            style={{ left: `${currentScrubPercent}%` }}
          >
            <div className="w-2.5 h-2.5 -ml-1 rounded-full bg-white shadow -mt-1" />
          </div>
        </div>

        {/* Handles Slider Controls */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: theme.textMutedColor }}>
            <span>Start: {formatTime(Math.round((startPercent / 100) * totalDuration))}</span>
            <span>End: {formatTime(Math.round((endPercent / 100) * totalDuration))}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold block mb-0.5" style={{ color: theme.textMutedColor }}>
                Start In-Point
              </label>
              <input
                type="range"
                min="0"
                max={Math.max(0, endPercent - 5)}
                value={startPercent}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setStartPercent(val);
                  if (currentScrubPercent < val) setCurrentScrubPercent(val);
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold block mb-0.5" style={{ color: theme.textMutedColor }}>
                End Out-Point
              </label>
              <input
                type="range"
                min={Math.min(100, startPercent + 5)}
                max="100"
                value={endPercent}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setEndPercent(val);
                  if (currentScrubPercent > val) setCurrentScrubPercent(val);
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Speed & Aspect Ratio Tools */}
      <div 
        className="p-4 border space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: theme.textMutedColor }}>
          Playback & Formatting
        </span>

        {/* Speed */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: theme.textColor }}>Speed</span>
          <div className="flex gap-1">
            {[0.5, 0.75, 1.0, 1.5, 2.0].map(s => (
              <button
                key={s}
                onClick={() => {
                  setSpeed(s);
                  if (videoRef.current) videoRef.current.playbackRate = s;
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono border font-semibold transition-all"
                style={{
                  backgroundColor: speed === s ? `${theme.primaryColor}20` : 'transparent',
                  borderColor: speed === s ? theme.primaryColor : theme.borderColor,
                  color: speed === s ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Crop Ratio */}
        <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: theme.borderColor }}>
          <span style={{ color: theme.textColor }}>Aspect Crop</span>
          <div className="flex gap-1.5">
            {(['16:9', '9:16', '1:1'] as const).map(r => (
              <button
                key={r}
                onClick={() => setAspect(r)}
                className="px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-all"
                style={{
                  backgroundColor: aspect === r ? `${theme.primaryColor}20` : 'transparent',
                  borderColor: aspect === r ? theme.primaryColor : theme.borderColor,
                  color: aspect === r ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EXPORT MODAL / SHEET */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm p-5 border shadow-2xl space-y-4"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold" style={{ color: theme.textColor }}>
                {exportComplete ? 'Export Ready!' : 'Rendering Cut...'}
              </h3>
              <button
                onClick={() => setIsExporting(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar or Success */}
            {!exportComplete ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span style={{ color: theme.textMutedColor }}>Encoding video stream</span>
                  <span className="font-bold" style={{ color: theme.primaryColor }}>{exportProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${exportProgress}%`,
                      backgroundColor: theme.primaryColor,
                    }}
                  />
                </div>
                <p className="text-[10px]" style={{ color: theme.textMutedColor }}>
                  Using Hardware MediaCodec on Android (HEVC Acceleration)
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400">Rendering Finished</h4>
                    <p className="text-[10px] text-emerald-300/80 font-mono">
                      Exported clip: {formatTime(trimDurationSeconds)} · {exportFormat}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsExporting(false);
                      showToast('Saved to Creator Pro Recordings Library');
                      setCurrentScreen('recordings');
                    }}
                    className="flex-1 py-2 text-xs font-bold text-white rounded-xl shadow transition-transform active:scale-95"
                    style={{
                      backgroundColor: theme.primaryColor,
                      borderRadius: `${theme.borderRadius}px`,
                    }}
                  >
                    View in Library
                  </button>
                  <button
                    onClick={() => {
                      setIsExporting(false);
                      showToast('Shared successfully!');
                    }}
                    className="py-2 px-3 text-xs font-semibold rounded-xl border"
                    style={{
                      borderColor: theme.borderColor,
                      color: theme.textColor,
                      borderRadius: `${theme.borderRadius}px`,
                    }}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Quality & Format Selectors */}
            {!exportComplete && (
              <div className="space-y-2 pt-2 border-t text-xs" style={{ borderColor: theme.borderColor }}>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.textColor }}>Format</span>
                  <div className="flex gap-1">
                    {(['MP4', 'GIF', 'WebM'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setExportFormat(f)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${exportFormat === f ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-neutral-700 text-neutral-400'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: theme.textColor }}>Resolution</span>
                  <div className="flex gap-1">
                    {(['720p', '1080p', '4k'] as const).map(q => (
                      <button
                        key={q}
                        onClick={() => setExportQuality(q)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${exportQuality === q ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-neutral-700 text-neutral-400'}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
