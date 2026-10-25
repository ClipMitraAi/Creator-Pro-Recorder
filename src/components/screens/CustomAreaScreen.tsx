import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Play, Move, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';

export const CustomAreaScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();

  // Selection box state in percentages
  const [box, setBox] = useState({ x: 10, y: 15, width: 80, height: 60 });
  const [aspectRatio, setAspectRatio] = useState<'custom' | '16:9' | '9:16' | '1:1' | '4:3'>('16:9');
  const [showGrid, setShowGrid] = useState(true);

  // References for dragging
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragActionRef = useRef<string | null>(null);
  const startPosRef = useRef({ x: 0, y: 0, boxX: 0, boxY: 0, boxW: 0, boxH: 0 });

  // Handle aspect ratio presets
  const applyPreset = (ratio: 'custom' | '16:9' | '9:16' | '1:1' | '4:3') => {
    setAspectRatio(ratio);
    if (ratio === '16:9') {
      setBox({ x: 5, y: 25, width: 90, height: 50.6 });
    } else if (ratio === '9:16') {
      setBox({ x: 25, y: 10, width: 50, height: 80 });
    } else if (ratio === '1:1') {
      setBox({ x: 15, y: 20, width: 70, height: 60 });
    } else if (ratio === '4:3') {
      setBox({ x: 10, y: 20, width: 80, height: 60 });
    }
  };

  // Start dragging handle or box
  const handlePointerDown = (action: string, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragActionRef.current = action;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      boxX: box.x,
      boxY: box.y,
      boxW: box.width,
      boxH: box.height,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragActionRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaXPercent = ((e.clientX - startPosRef.current.x) / rect.width) * 100;
    const deltaYPercent = ((e.clientY - startPosRef.current.y) / rect.height) * 100;

    const action = dragActionRef.current;
    let newX = startPosRef.current.boxX;
    let newY = startPosRef.current.boxY;
    let newW = startPosRef.current.boxW;
    let newH = startPosRef.current.boxH;

    if (action === 'move') {
      newX = Math.max(0, Math.min(100 - newW, startPosRef.current.boxX + deltaXPercent));
      newY = Math.max(0, Math.min(100 - newH, startPosRef.current.boxY + deltaYPercent));
    } else if (action === 'se') {
      newW = Math.max(20, Math.min(100 - newX, startPosRef.current.boxW + deltaXPercent));
      newH = Math.max(20, Math.min(100 - newY, startPosRef.current.boxH + deltaYPercent));
    } else if (action === 'nw') {
      const targetW = startPosRef.current.boxW - deltaXPercent;
      const targetH = startPosRef.current.boxH - deltaYPercent;
      if (targetW >= 20) {
        newX = Math.max(0, startPosRef.current.boxX + deltaXPercent);
        newW = targetW;
      }
      if (targetH >= 20) {
        newY = Math.max(0, startPosRef.current.boxY + deltaYPercent);
        newH = targetH;
      }
    }

    setBox({ x: newX, y: newY, width: newW, height: newH });
  };

  const handlePointerUp = () => {
    dragActionRef.current = null;
  };

  // Calculate pixel simulation
  const simulatedWidthPx = Math.round((box.width / 100) * 1080);
  const simulatedHeightPx = Math.round((box.height / 100) * 1920);

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 overflow-hidden select-none">
      {/* Top Header Bar */}
      <div 
        className="px-4 py-3 flex items-center justify-between z-20 border-b backdrop-blur-md"
        style={{
          backgroundColor: `${theme.surfaceColor}ee`,
          borderColor: theme.borderColor,
        }}
      >
        <button
          onClick={() => setCurrentScreen('home')}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: theme.textColor }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xs font-bold" style={{ color: theme.textColor }}>
            Custom Crop Region
          </h2>
          <span className="text-[10px] font-mono" style={{ color: theme.primaryColor }}>
            {simulatedWidthPx} × {simulatedHeightPx} px
          </span>
        </div>

        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-lg border text-xs font-semibold ${
            showGrid ? 'border-emerald-500 text-emerald-400 bg-emerald-950/50' : 'border-neutral-700 text-neutral-400'
          }`}
          title="Toggle Rule of Thirds Grid"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Crop Selection Stage */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative flex-1 w-full overflow-hidden bg-slate-900"
      >
        {/* Underlay Screen Preview (Mock Android App / Game) */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Shaded Backdrop Outside Crop Box */}
        {/* Top Dark Mask */}
        <div 
          className="absolute inset-x-0 top-0 bg-black/75 pointer-events-none"
          style={{ height: `${box.y}%` }}
        />
        {/* Bottom Dark Mask */}
        <div 
          className="absolute inset-x-0 bottom-0 bg-black/75 pointer-events-none"
          style={{ height: `${100 - (box.y + box.height)}%` }}
        />
        {/* Left Dark Mask */}
        <div 
          className="absolute left-0 bg-black/75 pointer-events-none"
          style={{ 
            top: `${box.y}%`, 
            height: `${box.height}%`, 
            width: `${box.x}%` 
          }}
        />
        {/* Right Dark Mask */}
        <div 
          className="absolute right-0 bg-black/75 pointer-events-none"
          style={{ 
            top: `${box.y}%`, 
            height: `${box.height}%`, 
            width: `${100 - (box.x + box.width)}%` 
          }}
        />

        {/* Active Draggable Crop Box */}
        <div
          className="absolute border-2 transition-shadow cursor-move flex items-center justify-center group"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
            borderColor: theme.primaryColor,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.2), 0 0 25px ${theme.primaryColor}50`,
          }}
          onPointerDown={(e) => handlePointerDown('move', e)}
        >
          {/* Rule of Thirds Guide Grid */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>
          )}

          {/* Center Drag Handle Icon */}
          <div 
            className="p-2 rounded-full backdrop-blur-md border shadow-md flex items-center gap-1.5"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              borderColor: theme.borderColor,
            }}
          >
            <Move className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-mono text-white font-bold">
              {simulatedWidthPx} × {simulatedHeightPx}
            </span>
          </div>

          {/* Corner Resizing Handles */}
          {/* NW Handle */}
          <div
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full cursor-nwse-resize shadow-md flex items-center justify-center border-2 border-white"
            style={{ backgroundColor: theme.primaryColor }}
            onPointerDown={(e) => handlePointerDown('nw', e)}
          />
          {/* NE Handle */}
          <div
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full cursor-nesw-resize shadow-md flex items-center justify-center border-2 border-white"
            style={{ backgroundColor: theme.primaryColor }}
            onPointerDown={(e) => handlePointerDown('ne', e)}
          />
          {/* SW Handle */}
          <div
            className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full cursor-nesw-resize shadow-md flex items-center justify-center border-2 border-white"
            style={{ backgroundColor: theme.primaryColor }}
            onPointerDown={(e) => handlePointerDown('sw', e)}
          />
          {/* SE Handle */}
          <div
            className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full cursor-nwse-resize shadow-md flex items-center justify-center border-2 border-white"
            style={{ backgroundColor: theme.primaryColor }}
            onPointerDown={(e) => handlePointerDown('se', e)}
          />
        </div>
      </div>

      {/* Bottom Preset & Launch Bar */}
      <div 
        className="p-4 z-20 border-t space-y-3"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
        }}
      >
        {/* Aspect Ratio Presets */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {[
            { id: '16:9', label: '16:9 YT' },
            { id: '9:16', label: '9:16 Reel' },
            { id: '1:1', label: '1:1 Square' },
            { id: '4:3', label: '4:3 Classic' },
            { id: 'custom', label: 'Freeform' },
          ].map((preset) => {
            const isActive = aspectRatio === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id as any)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg border whitespace-nowrap transition-all"
                style={{
                  backgroundColor: isActive ? `${theme.primaryColor}20` : 'transparent',
                  borderColor: isActive ? theme.primaryColor : theme.borderColor,
                  color: isActive ? theme.primaryColor : theme.textMutedColor,
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            showToast(`Cropped area recording initialized: ${simulatedWidthPx}×${simulatedHeightPx}px`);
            setCurrentScreen('record-screen');
          }}
          className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-transform"
          style={{
            backgroundColor: theme.recordColor,
            borderRadius: `${theme.borderRadius}px`,
            boxShadow: `0 0 20px ${theme.recordColor}50`,
          }}
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Cropped Area Record</span>
        </button>
      </div>
    </div>
  );
};
