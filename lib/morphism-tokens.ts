// Design Tokens for Morphism Effects
// Centralized configuration for all morphism visual parameters

export const MORPHISM_TOKENS = {
  // Glass Morphism Effects
  GLASS: {
    // Glass-3D: Premium 3D glass with depth
    GLASS_3D: {
      backdropFilter: 'blur(20px) brightness(1.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      insetShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), inset -2px -2px 5px rgba(0, 0, 0, 0.1), inset 2px 2px 5px rgba(255, 255, 255, 0.1)',
      outsetShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 0 50px rgba(255, 255, 255, 0.05)',
      animation: 'glass-shimmer 3s ease-in-out infinite',
    },

    // Glass-Deep: Ultra-premium for hero sections
    GLASS_DEEP: {
      backdropFilter: 'blur(30px) brightness(1.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      insetShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.15), inset -2px -2px 8px rgba(0, 0, 0, 0.15), inset 2px 2px 8px rgba(255, 255, 255, 0.15)',
      outsetShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
      animation: 'glass-flow 5s ease-in-out infinite',
    },

    // Liquid Glass: Original simple glass effect (backward compatible)
    LIQUID_GLASS: {
      backdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
      border: 'none',
      shadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    },

    // Liquid Glass Dark: Original VEX variant
    LIQUID_GLASS_DARK: {
      backdropFilter: 'blur(4px)',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      border: 'none',
      shadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    },
  },

  // Light Morphism Effects
  LIGHT_MORPH: {
    LIGHT_MORPH: {
      backdropFilter: 'blur(15px) brightness(1.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.064)', // 8% * 0.8
      border: '1px solid rgba(255, 255, 255, 0.25)',
      outsetShadow: '0 0 40px var(--light-color, rgba(137, 170, 204, 0.2))',
      insetShadow: 'inset 0 1px 10px rgba(255, 255, 255, 0.15)',
    },

    // Light tracking: Responds to cursor position
    // Uses CSS variables: --light-x and --light-y
    LIGHT_POSITION_UPDATE: {
      cssVariables: {
        '--light-x': 'updated via JavaScript (default 50%)',
        '--light-y': 'updated via JavaScript (default 50%)',
      },
    },
  },

  // Water Morphism Effects
  WATER_MORPH: {
    WATER_MORPH: {
      backdropFilter: 'blur(18px)',
      gradientBg: 'linear-gradient(135deg, rgba(137, 170, 204, 0.12) 0%, rgba(78, 133, 191, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)',
      border: '1px solid rgba(137, 170, 204, 0.3)',
      insetShadow: 'inset 0 1px 15px rgba(255, 255, 255, 0.12), inset -1px -1px 8px rgba(0, 0, 0, 0.08)',
      outsetShadow: '0 8px 32px rgba(137, 170, 204, 0.15), 0 0 30px rgba(78, 133, 191, 0.1)',
      animation: 'water-wave 8s linear infinite',
    },

    // Water wave colors
    WATER_COLORS: {
      primary: '#89AACC', // Forge accent
      secondary: '#4E85BF', // Forge accent-2
      highlight: 'rgba(137, 170, 204, 0.3)',
      shadow: 'rgba(78, 133, 191, 0.2)',
    },
  },

  // Glow Morphism Effects
  GLOW_MORPH: {
    GLOW_MORPH: {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      insetShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.08)',
      outsetShadow: '0 0 30px rgba(137, 170, 204, 0.2), 0 0 60px rgba(137, 170, 204, 0.1)',
      animation: 'glow-pulse-anim 3s ease-in-out infinite',
    },

    // Glow colors
    GLOW_COLORS: {
      primary: 'rgba(137, 170, 204, 0.2)',
      secondary: 'rgba(137, 170, 204, 0.1)',
      highlight: 'rgba(255, 255, 255, 0.1)',
    },
  },

  // Animation Durations (all in seconds)
  ANIMATIONS: {
    GLASS_SHIMMER: {
      duration: 3,
      easing: 'ease-in-out',
      description: 'Horizontal light shimmer across glass',
    },
    WATER_WAVE: {
      duration: 8,
      easing: 'linear',
      description: 'Undulating wave pattern movement',
    },
    GLASS_FLOW: {
      duration: 5,
      easing: 'ease-in-out',
      description: 'Gradient flow animation for deep glass',
    },
    LIGHT_REFLECT: {
      duration: 4,
      easing: 'ease-in-out',
      description: 'Moving radial light that simulates reflection',
    },
    GLOW_PULSE: {
      duration: 3,
      easing: 'ease-in-out',
      description: 'Pulsing glow intensity',
    },
  },

  // Backdrop Filter Values
  BACKDROP_FILTERS: {
    LIGHT: 'blur(4px)',
    MEDIUM: 'blur(12px)',
    STANDARD: 'blur(15px)',
    HEAVY: 'blur(18px)',
    ULTRA: 'blur(20px)',
    PREMIUM: 'blur(30px)',
  },

  // Brightness Adjustments
  BRIGHTNESS: {
    NORMAL: 1,
    LIGHT_BOOST: 1.1,
    MEDIUM_BOOST: 1.15,
    STRONG_BOOST: 1.2,
  },

  // Opacity Values (for glass background)
  OPACITY: {
    ULTRA_LIGHT: 0.01, // liquid-glass
    VERY_LIGHT: 0.04, // glow-morph
    LIGHT: 0.06, // glass-deep
    LIGHT_STANDARD: 0.064, // light-morph (8% * 0.8)
    STANDARD: 0.08, // glass-3d (--glass-opacity default)
  },

  // Color Palettes
  COLORS: {
    // Primary forge colors
    FORGE_ACCENT: '#89AACC',
    FORGE_ACCENT_2: '#4E85BF',
    FORGE_BLACK: '#0a0a0a',
    FORGE_DARK: '#101010',
    
    // Glass highlights
    WHITE_HIGHLIGHT_STRONG: 'rgba(255, 255, 255, 0.45)',
    WHITE_HIGHLIGHT_MEDIUM: 'rgba(255, 255, 255, 0.25)',
    WHITE_HIGHLIGHT_LIGHT: 'rgba(255, 255, 255, 0.15)',
    WHITE_HIGHLIGHT_SUBTLE: 'rgba(255, 255, 255, 0.1)',
    
    // Dark shadow
    DARK_SHADOW_STRONG: 'rgba(0, 0, 0, 0.4)',
    DARK_SHADOW_MEDIUM: 'rgba(0, 0, 0, 0.15)',
    DARK_SHADOW_LIGHT: 'rgba(0, 0, 0, 0.1)',
    
    // Transparent
    TRANSPARENT: 'transparent',
  },

  // Border Styles
  BORDERS: {
    GLASS_LIGHT: '1px solid rgba(255, 255, 255, 0.15)',
    GLASS_MEDIUM: '1px solid rgba(255, 255, 255, 0.2)',
    GLASS_STRONG: '1px solid rgba(255, 255, 255, 0.25)',
    WATER: '1px solid rgba(137, 170, 204, 0.3)',
  },

  // Rounded Corners (Tailwind-compatible)
  BORDER_RADIUS: {
    SMALL: 'rounded-lg', // 8px
    MEDIUM: 'rounded-xl', // 12px
    LARGE: 'rounded-2xl', // 16px
    EXTRA_LARGE: 'rounded-3xl', // 18px
    FULL: 'rounded-full',
  },

  // Padding Standards
  PADDING: {
    COMPACT: 'p-4',
    STANDARD: 'p-6',
    LARGE: 'p-8',
    EXTRA_LARGE: 'p-12',
    HERO: 'p-20',
  },

  // CSS Variables (set in :root)
  CSS_VARIABLES: {
    'glass-opacity': '0.08',
    'glow-intensity': '1',
    'light-x': '50%',
    'light-y': '50%',
    'light-color': 'rgba(137, 170, 204, 0.2)',
  },

  // Transition Speeds
  TRANSITIONS: {
    FAST: '0.15s',
    STANDARD: '0.3s',
    SLOW: '0.5s',
    SMOOTH: '0.7s',
    LEISURELY: '1s',
  },

  // Shadow Preset Standards
  SHADOWS: {
    NONE: 'none',
    SUBTLE: '0 2px 4px rgba(0, 0, 0, 0.1)',
    SMALL: '0 4px 8px rgba(0, 0, 0, 0.15)',
    MEDIUM: '0 8px 16px rgba(0, 0, 0, 0.2)',
    LARGE: '0 12px 24px rgba(0, 0, 0, 0.25)',
    EXTRA_LARGE: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
}

// Export utility functions
export const getMorphismClass = (effect: 'glass-3d' | 'light-morph' | 'water-morph' | 'glass-deep' | 'glow-morph'): string => {
  return effect
}

export const getMorphismStyles = (effect: keyof typeof MORPHISM_TOKENS['GLASS']): Partial<CSSStyleDeclaration> => {
  return {}
}

export default MORPHISM_TOKENS
