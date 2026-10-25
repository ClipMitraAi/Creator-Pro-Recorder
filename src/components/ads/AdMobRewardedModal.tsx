import React, { useState, useEffect } from 'react';
import { useAdMob, ADMOB_UNITS } from '../../context/AdMobContext';
import { useTheme } from '../../context/ThemeContext';
import { X, Gift, Check, Volume2, VolumeX, AlertTriangle, Sparkles } from 'lucide-react';

export const AdMobRewardedModal: React.FC = () => {
  const { rewardedActive, closeRewarded } = useAdMob();
  const { theme, showToast } = useTheme();

  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [rewardGranted, setRewardGranted] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!rewardedActive) {
      setSecondsRemaining(10);
      setRewardGranted(false);
      setShowExitWarning(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRewardGranted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rewardedActive]);

  if (!rewardedActive) return null;

  const handleClaim = () => {
    closeRewarded(true);
    showToast('VIP Pro Unlocked: 4K 120FPS & Ad-Free Studio active for 24h!');
  };

  const handleAttemptClose = () => {
    if (rewardGranted) {
      handleClaim();
    } else {
      setShowExitWarning(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Gift className="w-3 h-3" />
            AdMob Rewarded Video
          </span>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            Unit: {ADMOB_UNITS.REWARDED}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleAttemptClose}
            className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Rewarded Video Simulation Stage */}
      <div className="my-auto max-w-sm mx-auto w-full text-center space-y-4">
        {/* Simulated Video Frame */}
        <div className="relative aspect-[9/16] max-h-[460px] mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-5 shadow-2xl">
          {/* Top Progress countdown */}
          <div className="flex items-center justify-between z-10">
            <div className="px-3 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono border border-white/10 flex items-center gap-1.5">
              <Gift className="w-3 h-3 text-emerald-400" />
              <span>{rewardGranted ? 'Reward Unlocked!' : `Reward in ${secondsRemaining}s`}</span>
            </div>

            <div className="text-[10px] font-mono text-white/60">
              Test Ad
            </div>
          </div>

          {/* Center Brand Showcase */}
          <div className="space-y-3 z-10">
            <div className="w-16 h-16 rounded-2xl mx-auto bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              YouTube Creator Cloud
            </h3>
            <p className="text-xs text-neutral-300">
              Unlimited 4K HDR live streaming & AI auto-captions for mobile creators.
            </p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="space-y-2 z-10">
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((10 - secondsRemaining) / 10) * 100}%` }}
              />
            </div>
            <p className="text-[10px] font-mono text-neutral-400">
              Ad Unit: {ADMOB_UNITS.REWARDED}
            </p>
          </div>
        </div>

        {/* Claim Reward Button (Appears when video finishes) */}
        {rewardGranted && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={handleClaim}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Claim 24-Hour VIP Pro Access</span>
            </button>
          </div>
        )}
      </div>

      {/* Exit Warning Dialog */}
      {showExitWarning && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-xs w-full p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Leave Early?</h4>
              <p className="text-xs text-neutral-400 mt-1">
                If you leave before the video ends, you will lose your 24-hour VIP Pro unlock reward!
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setShowExitWarning(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Continue Watching ({secondsRemaining}s)
              </button>
              <button
                onClick={() => {
                  setShowExitWarning(false);
                  closeRewarded(false);
                }}
                className="w-full py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Dismiss Reward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
