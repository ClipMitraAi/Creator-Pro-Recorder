import React, { useState } from 'react';
import { useAdMob, ADMOB_UNITS } from '../../context/AdMobContext';
import { useTheme } from '../../context/ThemeContext';
import { Info, ExternalLink, X } from 'lucide-react';

export const AdMobBanner: React.FC = () => {
  const { bannerEnabled, setBannerEnabled, isVipUnlocked } = useAdMob();
  const { theme } = useTheme();
  const [showInfo, setShowInfo] = useState(false);

  // If VIP unlocked, option to hide or show ads
  if (!bannerEnabled) return null;

  return (
    <div className="w-full px-2 py-1 select-none">
      <div 
        className="relative mx-auto max-w-[360px] h-[52px] rounded-lg border overflow-hidden flex items-center justify-between px-2.5 shadow-sm transition-all"
        style={{
          backgroundColor: theme.mode === 'light' ? '#f1f5f9' : '#0f172a',
          borderColor: theme.mode === 'light' ? '#cbd5e1' : '#1e293b',
        }}
      >
        {/* Left Ad Unit Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Ad badge */}
          <div className="flex flex-col items-start shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
              Ad
            </span>
            <span className="text-[8px] font-mono text-neutral-400 mt-0.5">
              Test
            </span>
          </div>

          {/* Ad Content Text */}
          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold truncate text-white">
                Google Pixel 9 Pro Fold
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </div>
            <p className="text-[9px] text-neutral-400 truncate">
              The thinnest foldable with pro Gemini AI & 8K video
            </p>
          </div>
        </div>

        {/* Right CTA & Unit info */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 text-neutral-400 hover:text-white"
            title={`AdMob Unit: ${ADMOB_UNITS.BANNER}`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          <a
            href="https://store.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1 rounded text-[10px] font-bold text-white shadow transition-transform active:scale-95 flex items-center gap-1"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <span>Learn</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* AdMob Test Unit ID Overlay */}
        {showInfo && (
          <div className="absolute inset-0 bg-black/95 p-2 flex items-center justify-between text-[9px] font-mono text-emerald-300 z-20">
            <div className="truncate pr-2">
              <span className="text-white font-bold block">AdMob Banner Unit ID:</span>
              <span className="text-amber-400">{ADMOB_UNITS.BANNER}</span>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="p-1 bg-white/10 rounded-full text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
