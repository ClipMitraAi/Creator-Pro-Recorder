import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ThemeConfig, ScreenId } from '../types/theme';
import { PRESET_THEMES, DEFAULT_THEME_ID } from '../data/presetThemes';

interface ThemeContextType {
  theme: ThemeConfig;
  activeThemeId: string;
  isCustomized: boolean;
  selectTheme: (themeId: string) => void;
  updateThemeProperty: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  updateCustomTheme: (overrides: Partial<ThemeConfig>) => void;
  saveCurrentTheme: () => void;
  resetToDefault: () => void;
  confirmationToast: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
  
  // Navigation
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  previewMode: 'app' | 'studio' | 'editor';
  setPreviewMode: (mode: 'app' | 'studio' | 'editor') => void;
  
  // Device Frame View
  deviceFrameEnabled: boolean;
  setDeviceFrameEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
}

const STORAGE_KEY = 'creator_pro_recorder_theme_v1';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [customOverrides, setCustomOverrides] = useState<Partial<ThemeConfig>>({});
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [previewMode, setPreviewMode] = useState<'app' | 'studio' | 'editor'>('studio'); // Start in design studio as requested!
  const [deviceFrameEnabled, setDeviceFrameEnabled] = useState<boolean>(true);
  const [confirmationToast, setConfirmationToast] = useState<string | null>(null);

  // Restore from localStorage on initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.activeThemeId && PRESET_THEMES[parsed.activeThemeId]) {
          setActiveThemeId(parsed.activeThemeId);
        }
        if (parsed.customOverrides && typeof parsed.customOverrides === 'object') {
          setCustomOverrides(parsed.customOverrides);
        }
        if (parsed.previewMode) {
          setPreviewMode(parsed.previewMode);
        }
      }
    } catch (e) {
      console.warn('LocalStorage not available or parsing failed, using defaults.', e);
    }
  }, []);

  // Compute active theme by merging preset with custom overrides
  const theme: ThemeConfig = useMemo(() => {
    const base = PRESET_THEMES[activeThemeId] || PRESET_THEMES[DEFAULT_THEME_ID];
    return {
      ...base,
      ...customOverrides,
    };
  }, [activeThemeId, customOverrides]);

  const isCustomized = useMemo(() => {
    return Object.keys(customOverrides).length > 0;
  }, [customOverrides]);

  const showToast = (message: string) => {
    setConfirmationToast(message);
    setTimeout(() => {
      setConfirmationToast(null);
    }, 3500);
  };

  const clearToast = () => setConfirmationToast(null);

  const selectTheme = (themeId: string) => {
    if (!PRESET_THEMES[themeId]) return;
    setActiveThemeId(themeId);
    setCustomOverrides({}); // reset custom overrides when explicitly selecting a new preset
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeThemeId: themeId,
        customOverrides: {},
        previewMode,
      }));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }

    showToast(`Your design has been selected. (${PRESET_THEMES[themeId].name})`);
  };

  const updateThemeProperty = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setCustomOverrides(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateCustomTheme = (overrides: Partial<ThemeConfig>) => {
    setCustomOverrides(prev => ({
      ...prev,
      ...overrides,
    }));
  };

  const saveCurrentTheme = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeThemeId,
        customOverrides,
        previewMode,
      }));
      showToast('Custom design settings saved successfully.');
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
      showToast('Design saved in session memory.');
    }
  };

  const resetToDefault = () => {
    setCustomOverrides({});
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeThemeId,
        customOverrides: {},
        previewMode,
      }));
    } catch (e) {
      console.warn('Failed to update storage', e);
    }
    showToast(`Reset ${PRESET_THEMES[activeThemeId]?.name || 'Theme'} to default settings.`);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        activeThemeId,
        isCustomized,
        selectTheme,
        updateThemeProperty,
        updateCustomTheme,
        saveCurrentTheme,
        resetToDefault,
        confirmationToast,
        showToast,
        clearToast,
        currentScreen,
        setCurrentScreen,
        previewMode,
        setPreviewMode,
        deviceFrameEnabled,
        setDeviceFrameEnabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
