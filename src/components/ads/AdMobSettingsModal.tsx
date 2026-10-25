import React, { useState } from 'react';
import { useAdMob, ADMOB_UNITS } from '../../context/AdMobContext';
import { useTheme } from '../../context/ThemeContext';
import { X, Copy, Check, Play, Gift, Layout, Code, Smartphone, ShieldCheck } from 'lucide-react';

interface AdMobSettingsModalProps {
  onClose: () => void;
}

export const AdMobSettingsModal: React.FC<AdMobSettingsModalProps> = ({ onClose }) => {
  const { 
    bannerEnabled, 
    setBannerEnabled, 
    triggerInterstitial, 
    triggerRewarded, 
    isVipUnlocked, 
    vipHoursRemaining 
  } = useAdMob();
  const { theme, showToast } = useTheme();

  const [activeTab, setActiveTab] = useState<'testing' | 'android-code' | 'compose-ui'>('testing');
  const [copied, setCopied] = useState(false);

  const getAndroidCode = () => {
    if (activeTab === 'compose-ui') {
      return `// AdMobBannerCompose.kt
// Jetpack Compose Banner Implementation using Google Mobile Ads SDK
package com.creatorpro.recorder.ui.ads

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.*

const val ADMOB_BANNER_ID = "${ADMOB_UNITS.BANNER}"

@Composable
fun AdMobBannerView(modifier: Modifier = Modifier) {
    AndroidView(
        modifier = modifier.fillMaxWidth(),
        factory = { context ->
            AdView(context).apply {
                setAdSize(AdSize.BANNER)
                adUnitId = ADMOB_BANNER_ID
                loadAd(AdRequest.Builder().build())
            }
        }
    )
}`;
    }

    return `// AdMobManager.kt
// Android Kotlin Implementation for Interstitial & Rewarded Ads
package com.creatorpro.recorder.ads

import android.app.Activity
import android.content.Context
import com.google.android.gms.ads.*
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

object AdMobManager {
    const val BANNER_ID = "${ADMOB_UNITS.BANNER}"
    const val INTERSTITIAL_ID = "${ADMOB_UNITS.INTERSTITIAL}"
    const val REWARDED_ID = "${ADMOB_UNITS.REWARDED}"

    private var interstitialAd: InterstitialAd? = null
    private var rewardedAd: RewardedAd? = null

    // 1. Initialize AdMob SDK in Application onCreate
    fun initialize(context: Context) {
        MobileAds.initialize(context) {}
        loadInterstitial(context)
        loadRewarded(context)
    }

    // 2. Load Interstitial Ad
    fun loadInterstitial(context: Context) {
        val request = AdRequest.Builder().build()
        InterstitialAd.load(context, INTERSTITIAL_ID, request, object : InterstitialAdLoadCallback() {
            override fun onAdLoaded(ad: InterstitialAd) {
                interstitialAd = ad
            }
            override fun onAdFailedToLoad(error: LoadAdError) {
                interstitialAd = null
            }
        })
    }

    // 3. Show Interstitial Ad (e.g. After recording stops)
    fun showInterstitial(activity: Activity, onDismiss: () -> Unit) {
        if (interstitialAd != null) {
            interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    loadInterstitial(activity) // Pre-load next
                    onDismiss()
                }
            }
            interstitialAd?.show(activity)
        } else {
            onDismiss()
        }
    }

    // 4. Load Rewarded Ad
    fun loadRewarded(context: Context) {
        val request = AdRequest.Builder().build()
        RewardedAd.load(context, REWARDED_ID, request, object : RewardedAdLoadCallback() {
            override fun onAdLoaded(ad: RewardedAd) {
                rewardedAd = ad
            }
            override fun onAdFailedToLoad(error: LoadAdError) {
                rewardedAd = null
            }
        })
    }

    // 5. Show Rewarded Ad (To unlock 24h VIP or 4K 120fps)
    fun showRewarded(activity: Activity, onRewardEarned: (RewardItem) -> Unit) {
        if (rewardedAd != null) {
            rewardedAd?.show(activity) { rewardItem ->
                onRewardEarned(rewardItem)
                loadRewarded(activity) // Pre-load next
            }
        }
    }
}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getAndroidCode());
    setCopied(true);
    showToast('AdMob Android integration code copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-text animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col border shadow-2xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0a0d14',
          borderColor: theme.borderColor,
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Google AdMob Integration Hub</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  3 Ads Configured
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Banner, Interstitial & Rewarded Ad test units connected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b text-xs px-4 bg-black/40" style={{ borderColor: theme.borderColor }}>
          {[
            { id: 'testing', label: '1. Live Ad Testing', icon: Play },
            { id: 'android-code', label: '2. Kotlin AdMob Manager', icon: Code },
            { id: 'compose-ui', label: '3. Jetpack Compose Banner', icon: Smartphone },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="py-3 px-4 font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap"
                style={{
                  borderColor: isActive ? theme.primaryColor : 'transparent',
                  color: isActive ? theme.primaryColor : '#94a3b8',
                }}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'testing' ? (
            <div className="space-y-4">
              {/* VIP Status card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Gift className="w-4 h-4" />
                      {isVipUnlocked ? 'VIP Pro Status Active' : 'VIP Status Locked'}
                    </span>
                    {isVipUnlocked && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        {vipHoursRemaining}h remaining
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1">
                    {isVipUnlocked 
                      ? '4K 120FPS capture unlocked & VIP badge active via Rewarded Ad.' 
                      : 'Watch a 10s Rewarded Ad to earn 24-hour VIP Pro features.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    triggerRewarded();
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow transition-transform active:scale-95"
                >
                  {isVipUnlocked ? 'Re-watch Ad' : 'Earn VIP'}
                </button>
              </div>

              {/* 3 Configured Ad Units List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Configured AdMob Units
                </span>

                {/* 1. Banner */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Banner Ad</span>
                      <span className="text-[10px] font-mono text-emerald-400">320×50 Adaptive</span>
                    </div>
                    <p className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                      {ADMOB_UNITS.BANNER}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBannerEnabled(!bannerEnabled);
                      showToast(bannerEnabled ? 'Banner Ad hidden' : 'Banner Ad enabled');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      bannerEnabled 
                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' 
                        : 'border-slate-700 text-slate-400'
                    }`}
                  >
                    {bannerEnabled ? 'Banner On' : 'Banner Off'}
                  </button>
                </div>

                {/* 2. Interstitial */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Interstitial Full-Screen Ad</span>
                      <span className="text-[10px] font-mono text-cyan-400">Post-Capture</span>
                    </div>
                    <p className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                      {ADMOB_UNITS.INTERSTITIAL}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      triggerInterstitial();
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow transition-transform active:scale-95"
                  >
                    Test Interstitial
                  </button>
                </div>

                {/* 3. Rewarded */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Rewarded Video Ad</span>
                      <span className="text-[10px] font-mono text-amber-400">VIP Pro Reward</span>
                    </div>
                    <p className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                      {ADMOB_UNITS.REWARDED}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      triggerRewarded();
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-transform active:scale-95"
                  >
                    Test Rewarded
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={copyCode}
                className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all shadow z-10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto p-4 rounded-xl bg-black/60 border border-slate-800">
                {getAndroidCode()}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-black/40 text-[11px] text-neutral-400 flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
          <span className="font-mono text-[10px]">
            Google Mobile Ads SDK v23.6.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
