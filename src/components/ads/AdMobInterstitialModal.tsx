import React, { useState, useEffect } from 'react';
import { useAdMob, ADMOB_UNITS } from '../../context/AdMobContext';
import { useTheme } from '../../context/ThemeContext';
import { X, ExternalLink, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

export const AdMobInterstitialModal: React.FC = () => {
  const { interstitialActive, closeInterstitial } = useAdMob();
  const { theme } = useTheme();

  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (!interstitialActive) {
      setCountdown(5);
      setCanSkip(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interstitialActive]);

  if (!interstitialActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
            AdMob Interstitial · Test Ad
          </span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            Unit: {ADMOB_UNITS.INTERSTITIAL}
          </span>
        </div>

        {/* Skip or Close Button */}
        <div>
          {canSkip ? (
            <button
              onClick={closeInterstitial}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors shadow"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white/80 border border-white/10 text-xs">
              <span>Reward in</span>
              <span className="font-bold text-amber-400">{countdown}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interstitial Ad Body */}
      <div className="my-auto max-w-sm mx-auto w-full text-center space-y-5">
        {/* Ad Graphic Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-indigo-950 via-slate-900 to-black p-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            Next-Gen Creator Tools
          </h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
            Unleash 4K HDR live screen streaming with instant noise isolation and zero latency recording.
          </p>

          <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-neutral-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Verified Google Play Partner
            </span>
            <span className="font-bold text-white">Free Trial</span>
          </div>

          <button
            onClick={() => {
              window.open('https://play.google.com/store', '_blank');
              closeInterstitial();
            }}
            className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-1.5"
          >
            <span>Install on Google Play</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AdMob Diagnostic Footer */}
        <div className="text-[10px] font-mono text-neutral-500">
          <div>ID: {ADMOB_UNITS.INTERSTITIAL}</div>
          <div>Simulating Android com.google.android.gms.ads.interstitial.InterstitialAd</div>
        </div>
      </div>

      {/* Bottom Dismiss if timer is done */}
      <div className="text-center">
        {canSkip && (
          <button
            onClick={closeInterstitial}
            className="text-xs text-neutral-400 hover:text-white underline font-semibold"
          >
            Continue to Creator Pro App →
          </button>
        )}
      </div>
    </div>
  );
};
