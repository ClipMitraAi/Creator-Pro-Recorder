import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ScreenId } from '../types/theme';
import { Video, Film, Sliders, Settings } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { theme, currentScreen, setCurrentScreen } = useTheme();

  // Hide nav on full-screen recording simulation or custom area crop mode for maximum canvas
  if (currentScreen === 'record-screen' || currentScreen === 'custom-area') {
    return null;
  }

  const tabs: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Studio', icon: Video },
    { id: 'recordings', label: 'Recordings', icon: Film },
    { id: 'editor', label: 'Editor', icon: Sliders },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Render navigation based on navLayout token
  if (theme.navLayout === 'floating-pill') {
    return (
      <div className="sticky bottom-2 inset-x-0 px-4 py-2 pointer-events-none z-30">
        <nav 
          className="max-w-[340px] mx-auto pointer-events-auto flex items-center justify-around py-2 px-3 border shadow-xl backdrop-blur-xl transition-all duration-200"
          style={{
            backgroundColor: theme.mode === 'light' ? 'rgba(255,255,255,0.92)' : 'rgba(18, 24, 31, 0.88)',
            borderColor: theme.borderColor,
            borderRadius: 9999,
            boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 0 15px ${theme.glowColor}`,
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id)}
                className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 transition-all rounded-full"
                style={{
                  color: isActive ? theme.primaryColor : theme.textMutedColor,
                  backgroundColor: isActive ? `${theme.primaryColor}18` : 'transparent',
                }}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-semibold tracking-tight mt-0.5">
                  {tab.label}
                </span>
                {isActive && (
                  <span 
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  if (theme.navLayout === 'minimal-dock') {
    return (
      <nav 
        className="sticky bottom-0 inset-x-0 h-14 border-t flex items-center justify-around px-2 z-30 transition-colors"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] transition-all"
              style={{
                borderRadius: `${theme.borderRadius - 4}px`,
                backgroundColor: isActive ? `${theme.primaryColor}20` : 'transparent',
                color: isActive ? theme.primaryColor : theme.textMutedColor,
              }}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <span className="text-xs font-semibold tracking-tight">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  // Standard bottom-tabs layout
  return (
    <nav 
      className="sticky bottom-0 inset-x-0 h-16 border-t grid grid-cols-4 items-center z-30 transition-colors duration-200"
      style={{
        backgroundColor: theme.surfaceColor,
        borderColor: theme.borderColor,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className="flex flex-col items-center justify-center min-h-[44px] py-1 transition-all relative"
            style={{
              color: isActive ? theme.primaryColor : theme.textMutedColor,
            }}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
            <span 
              className={`text-[10px] mt-1 font-medium tracking-tight ${
                isActive ? 'font-bold' : ''
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span 
                className="absolute top-0 inset-x-6 h-0.5 rounded-b-full transition-all"
                style={{ backgroundColor: theme.primaryColor }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
