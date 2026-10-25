import { ThemeConfig } from '../types/theme';

export const PRESET_THEMES: Record<string, ThemeConfig> = {
  'midnight-pro': {
    id: 'midnight-pro',
    name: 'Midnight Pro',
    tagline: 'Broadcast & Studio Reference',
    description: 'Deep onyx backdrop with precision emerald phosphors and professional studio control meters.',
    mode: 'dark',
    primaryColor: '#10b981',       // Emerald 500
    primaryHover: '#059669',       // Emerald 600
    secondaryColor: '#064e3b',     // Deep emerald
    backgroundColor: '#090d10',    // Rich onyx black
    surfaceColor: '#12181f',       // Studio slate card
    surfaceSecondaryColor: '#1a232c',
    textColor: '#f8fafc',
    textMutedColor: '#94a3b8',
    borderColor: '#1e293b',
    accentColor: '#34d399',        // Bright emerald
    recordColor: '#ef4444',        // Tally red
    glowColor: 'rgba(16, 185, 129, 0.25)',
    cardStyle: 'bordered',
    buttonShape: 'rounded-xl',
    borderRadius: 14,
    iconStyle: 'stroke',
    fontSize: 'standard',
    navLayout: 'bottom-tabs',
    recordButtonDesign: 'classic-ring',
    floatingControlStyle: 'mini-pill',
    palette: ['#090d10', '#12181f', '#10b981', '#34d399', '#ef4444'],
    badge: 'STUDIO GRADE',
  },

  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    tagline: 'High-Tech Synthwave',
    description: 'Electric cyan and vivid ultraviolet highlights illuminating deep cosmic navy contours.',
    mode: 'dark',
    primaryColor: '#06b6d4',       // Cyan 500
    primaryHover: '#0891b2',
    secondaryColor: '#8b5cf6',     // Violet 500
    backgroundColor: '#070a14',    // Deep navy space
    surfaceColor: '#0f172a',       // Slate navy card
    surfaceSecondaryColor: '#1e293b',
    textColor: '#f1f5f9',
    textMutedColor: '#94a3b8',
    borderColor: '#1e293b',
    accentColor: '#a855f7',        // Purple neon
    recordColor: '#f43f5e',        // Rose neon
    glowColor: 'rgba(6, 182, 212, 0.35)',
    cardStyle: 'soft-glow',
    buttonShape: 'rounded-2xl',
    borderRadius: 18,
    iconStyle: 'duotone',
    fontSize: 'standard',
    navLayout: 'floating-pill',
    recordButtonDesign: 'neon-target',
    floatingControlStyle: 'circular-bubble',
    palette: ['#070a14', '#0f172a', '#06b6d4', '#8b5cf6', '#f43f5e'],
    badge: 'SYNTH EDITION',
  },

  'minimal-white': {
    id: 'minimal-white',
    name: 'Minimal White',
    tagline: 'Pure Swiss Clarity',
    description: 'Crisp porcelain canvas with structural slate surfaces and vivid sapphire action anchors.',
    mode: 'light',
    primaryColor: '#2563eb',       // Royal Blue 600
    primaryHover: '#1d4ed8',
    secondaryColor: '#475569',     // Slate 600
    backgroundColor: '#f8fafc',    // Clean off-white
    surfaceColor: '#ffffff',       // Pure white card
    surfaceSecondaryColor: '#f1f5f9',
    textColor: '#0f172a',          // Deep slate text
    textMutedColor: '#64748b',     // Balanced muted text
    borderColor: '#e2e8f0',        // Subtle border
    accentColor: '#3b82f6',
    recordColor: '#e11d48',        // Vivid crimson
    glowColor: 'rgba(37, 99, 235, 0.15)',
    cardStyle: 'flat',
    buttonShape: 'rounded-xl',
    borderRadius: 12,
    iconStyle: 'stroke',
    fontSize: 'standard',
    navLayout: 'bottom-tabs',
    recordButtonDesign: 'classic-ring',
    floatingControlStyle: 'mini-pill',
    palette: ['#f8fafc', '#ffffff', '#2563eb', '#0f172a', '#e11d48'],
    badge: 'ARCHITECTURAL',
  },

  'creator-purple': {
    id: 'creator-purple',
    name: 'Creator Purple',
    tagline: 'Vibrant Streamer & Vlogger',
    description: 'Midnight amethyst base layered with rich violet luminescence tailored for media creators.',
    mode: 'dark',
    primaryColor: '#9333ea',       // Purple 600
    primaryHover: '#7e22ce',
    secondaryColor: '#ec4899',     // Pink 500
    backgroundColor: '#0c0716',    // Dark purple night
    surfaceColor: '#170f2b',       // Deep plum surface
    surfaceSecondaryColor: '#241842',
    textColor: '#faf5ff',
    textMutedColor: '#a89fc5',
    borderColor: '#2e1d52',
    accentColor: '#c084fc',        // Bright lilac
    recordColor: '#f43f5e',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    cardStyle: 'bordered',
    buttonShape: 'rounded-2xl',
    borderRadius: 16,
    iconStyle: 'duotone',
    fontSize: 'standard',
    navLayout: 'floating-pill',
    recordButtonDesign: 'pulse-glow',
    floatingControlStyle: 'corner-chip',
    palette: ['#0c0716', '#170f2b', '#9333ea', '#c084fc', '#ec4899'],
    badge: 'STREAMER SUITE',
  },

  'gaming-red': {
    id: 'gaming-red',
    name: 'Gaming Red',
    tagline: 'Esports Carbon Velocity',
    description: 'Brushed charcoal armor with tactical crimson recording triggers and aggressive gaming telemetry.',
    mode: 'dark',
    primaryColor: '#ef4444',       // Red 500
    primaryHover: '#dc2626',
    secondaryColor: '#f97316',     // Orange 500
    backgroundColor: '#0d0d0f',    // Carbon black
    surfaceColor: '#17171a',       // Tactical dark gray
    surfaceSecondaryColor: '#222227',
    textColor: '#f5f5f5',
    textMutedColor: '#a1a1aa',
    borderColor: '#27272a',
    accentColor: '#ff4d4d',
    recordColor: '#ff1a1a',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    cardStyle: 'bordered',
    buttonShape: 'rounded-md',
    borderRadius: 8,
    iconStyle: 'filled',
    fontSize: 'compact',
    navLayout: 'minimal-dock',
    recordButtonDesign: 'studio-square',
    floatingControlStyle: 'dock-side',
    palette: ['#0d0d0f', '#17171a', '#ef4444', '#f97316', '#27272a'],
    badge: 'ESPORTS TUNED',
  },

  'glass-premium': {
    id: 'glass-premium',
    name: 'Glass Premium',
    tagline: 'Frosted Obsidian & Amber',
    description: 'Translucent frosted obsidian surfaces with subtle specular diffusion and refined amber accents.',
    mode: 'dark',
    primaryColor: '#f59e0b',       // Amber 500
    primaryHover: '#d97706',
    secondaryColor: '#94a3b8',     // Slate
    backgroundColor: '#0a0a0c',    // Ultra-deep obsidian
    surfaceColor: 'rgba(255, 255, 255, 0.05)', // Frosted glass
    surfaceSecondaryColor: 'rgba(255, 255, 255, 0.08)',
    textColor: '#f8fafc',
    textMutedColor: '#94a3b8',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    accentColor: '#fbbf24',        // Warm amber
    recordColor: '#f43f5e',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    cardStyle: 'glassmorphic',
    buttonShape: 'rounded-2xl',
    borderRadius: 20,
    iconStyle: 'stroke',
    fontSize: 'relaxed',
    navLayout: 'floating-pill',
    recordButtonDesign: 'pulse-glow',
    floatingControlStyle: 'circular-bubble',
    palette: ['#0a0a0c', '#18181b', '#f59e0b', '#fbbf24', '#ffffff'],
    badge: 'FROSTED LUXE',
  },
};

export const DEFAULT_THEME_ID = 'midnight-pro';
