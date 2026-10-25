export type ThemeMode = 'dark' | 'light';

export type CardStyle = 'flat' | 'bordered' | 'soft-glow' | 'glassmorphic';
export type ButtonShape = 'rounded-xl' | 'rounded-full' | 'rounded-md' | 'rounded-2xl';
export type IconStyle = 'stroke' | 'duotone' | 'filled';
export type FontSizeScale = 'compact' | 'standard' | 'relaxed';
export type NavLayout = 'bottom-tabs' | 'floating-pill' | 'minimal-dock';
export type RecordButtonDesign = 'classic-ring' | 'pulse-glow' | 'studio-square' | 'neon-target';
export type FloatingControlStyle = 'mini-pill' | 'circular-bubble' | 'dock-side' | 'corner-chip';

export interface ThemeConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mode: ThemeMode;
  
  // Color tokens
  primaryColor: string;
  primaryHover: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  surfaceSecondaryColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  accentColor: string;
  recordColor: string;
  glowColor: string;
  
  // Style tokens
  cardStyle: CardStyle;
  buttonShape: ButtonShape;
  borderRadius: number; // in pixels: 8, 12, 16, 20, 24
  iconStyle: IconStyle;
  fontSize: FontSizeScale;
  navLayout: NavLayout;
  recordButtonDesign: RecordButtonDesign;
  floatingControlStyle: FloatingControlStyle;
  
  // Metadata for preview cards
  palette: string[];
  badge: string;
}

export type ScreenId = 
  | 'home'
  | 'record-screen'
  | 'custom-area'
  | 'audio-settings'
  | 'facecam-settings'
  | 'recordings'
  | 'editor'
  | 'settings'
  | 'theme-studio';
