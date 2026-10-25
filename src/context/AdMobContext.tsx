import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const ADMOB_UNITS = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
} as const;

interface AdMobContextType {
  bannerEnabled: boolean;
  setBannerEnabled: (enabled: boolean) => void;
  isVipUnlocked: boolean;
  vipHoursRemaining: number;
  triggerInterstitial: (onDismiss?: () => void) => void;
  triggerRewarded: (onReward?: () => void) => void;
  closeInterstitial: () => void;
  closeRewarded: (earned: boolean) => void;
  interstitialActive: boolean;
  rewardedActive: boolean;
  showAdMobCodeModal: boolean;
  setShowAdMobCodeModal: (show: boolean) => void;
}

const STORAGE_KEY_VIP = 'creator_pro_vip_unlocked_v1';

const AdMobContext = createContext<AdMobContextType | undefined>(undefined);

export const AdMobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);
  const [vipExpiresAt, setVipExpiresAt] = useState<number | null>(null);

  // Modals state
  const [interstitialActive, setInterstitialActive] = useState(false);
  const [rewardedActive, setRewardedActive] = useState(false);
  const [interstitialCallback, setInterstitialCallback] = useState<(() => void) | null>(null);
  const [rewardedCallback, setRewardedCallback] = useState<(() => void) | null>(null);
  const [showAdMobCodeModal, setShowAdMobCodeModal] = useState(false);

  // Check stored VIP state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIP);
      if (stored) {
        const expiry = parseInt(stored, 10);
        if (expiry > Date.now()) {
          setIsVipUnlocked(true);
          setVipExpiresAt(expiry);
        } else {
          localStorage.removeItem(STORAGE_KEY_VIP);
        }
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, []);

  const vipHoursRemaining = vipExpiresAt ? Math.max(0, Math.ceil((vipExpiresAt - Date.now()) / (1000 * 60 * 60))) : 0;

  const triggerInterstitial = (onDismiss?: () => void) => {
    if (onDismiss) {
      setInterstitialCallback(() => onDismiss);
    } else {
      setInterstitialCallback(null);
    }
    setInterstitialActive(true);
  };

  const closeInterstitial = () => {
    setInterstitialActive(false);
    if (interstitialCallback) {
      interstitialCallback();
      setInterstitialCallback(null);
    }
  };

  const triggerRewarded = (onReward?: () => void) => {
    if (onReward) {
      setRewardedCallback(() => onReward);
    } else {
      setRewardedCallback(null);
    }
    setRewardedActive(true);
  };

  const closeRewarded = (earned: boolean) => {
    setRewardedActive(false);
    if (earned) {
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours VIP
      setIsVipUnlocked(true);
      setVipExpiresAt(expiry);
      try {
        localStorage.setItem(STORAGE_KEY_VIP, expiry.toString());
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      if (rewardedCallback) {
        rewardedCallback();
        setRewardedCallback(null);
      }
    }
  };

  return (
    <AdMobContext.Provider
      value={{
        bannerEnabled,
        setBannerEnabled,
        isVipUnlocked,
        vipHoursRemaining,
        triggerInterstitial,
        triggerRewarded,
        closeInterstitial,
        closeRewarded,
        interstitialActive,
        rewardedActive,
        showAdMobCodeModal,
        setShowAdMobCodeModal,
      }}
    >
      {children}
    </AdMobContext.Provider>
  );
};

export const useAdMob = () => {
  const ctx = useContext(AdMobContext);
  if (!ctx) {
    throw new Error('useAdMob must be used within an AdMobProvider');
  }
  return ctx;
};
