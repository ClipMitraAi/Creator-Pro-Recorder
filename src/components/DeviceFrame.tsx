import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Wifi, Battery, Smartphone } from 'lucide-react';

interface DeviceFrameProps {
  children: ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { theme, deviceFrameEnabled } = useTheme();

  // If phone frame is disabled by user, render responsive edge-to-edge container
  if (!deviceFrameEnabled) {
    return (
      <div 
        className="w-full min-h-screen flex flex-col transition-colors duration-200"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
        }}
      >
        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Realistic Android Phone Mockup (Google Pixel / Samsung Galaxy style)
  return (
    <div className="flex items-center justify-center p-2 sm:p-6 lg:p-8 min-h-screen">
      <div 
        className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] rounded-[48px] p-3 shadow-2xl flex flex-col border-[8px] transition-all duration-300"
        style={{
          backgroundColor: '#0a0a0d',
          borderColor: theme.mode === 'light' ? '#cbd5e1' : '#27272a',
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px ${theme.glowColor}`,
        }}
      >
        {/* Hardware buttons on chassis */}
        <div className="absolute -left-[11px] top-28 w-[3px] h-12 bg-neutral-700 rounded-l-md" />
        <div className="absolute -left-[11px] top-44 w-[3px] h-20 bg-neutral-700 rounded-l-md" />
        <div className="absolute -right-[11px] top-32 w-[3px] h-16 bg-neutral-700 rounded-r-md" />

        {/* Screen Bezel & Container */}
        <div 
          className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col transition-colors duration-200 select-none"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
          }}
        >
          {/* Android Status Bar */}
          <div 
            className="h-10 px-6 flex items-center justify-between text-xs font-mono shrink-0 z-30 select-none"
            style={{
              color: theme.textMutedColor,
              backgroundColor: theme.backgroundColor,
            }}
          >
            {/* Time */}
            <span className="font-semibold text-xs tracking-tight" style={{ color: theme.textColor }}>
              09:41
            </span>

            {/* Front Camera Punch-hole */}
            <div className="w-4 h-4 rounded-full bg-black border border-neutral-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            </div>

            {/* Icons: 5G, Wi-Fi, Battery */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[10px] font-bold tracking-tighter opacity-80">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Active Screen Viewport Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
            {children}
          </div>

          {/* Android Bottom Gesture Navigation Pill */}
          <div 
            className="h-4 flex items-center justify-center shrink-0 z-30 select-none"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <div 
              className="w-28 h-1 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: theme.mode === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
