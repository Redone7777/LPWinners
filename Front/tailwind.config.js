/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════
      // 🎨 PALETTE DE COULEURS "LIQUID GLASS" - LP WINNERS
      // ═══════════════════════════════════════════════════════════════════
      colors: {
        // Couleurs de fond principales
        'void': {
          900: '#0a0a0f',    // Fond le plus profond
          800: '#0d0d14',    // Fond principal
          700: '#12121c',    // Fond des panneaux
          600: '#1a1a28',    // Fond des cartes
          500: '#252536',    // Éléments surélevés
        },
        // Accent violet/magenta (couleur principale)
        'arcane': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',     // Violet principal
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Accent bleu électrique
        'electric': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',     // Bleu principal
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Accent magenta/rose
        'neon': {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',     // Magenta principal
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // Couleur de verre
        'glass': {
          white: 'rgba(255, 255, 255, 0.03)',
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
          heavy: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.10)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
          'border-active': 'rgba(255, 255, 255, 0.25)',
        },
      },

      // ═══════════════════════════════════════════════════════════════════
      // 🔮 EFFETS DE FLOU POUR GLASSMORPHISME
      // ═══════════════════════════════════════════════════════════════════
      backdropBlur: {
        'xs': '2px',
        'glass': '12px',
        'glass-heavy': '20px',
        'glass-ultra': '40px',
      },

      // ═══════════════════════════════════════════════════════════════════
      // ✨ OMBRES ET LUEURS
      // ═══════════════════════════════════════════════════════════════════
      boxShadow: {
        // Ombres de profondeur
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.5)',
        
        // Lueurs colorées (glow effects)
        'glow-arcane': '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)',
        'glow-arcane-lg': '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)',
        'glow-electric': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
        'glow-neon': '0 0 20px rgba(217, 70, 239, 0.4), 0 0 40px rgba(217, 70, 239, 0.2)',
        
        // Lueur interne pour icônes
        'inner-glow': 'inset 0 0 20px rgba(168, 85, 247, 0.15)',
        
        // Ombre pour cartes au hover
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(168, 85, 247, 0.15)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // 🌈 DÉGRADÉS
      // ═══════════════════════════════════════════════════════════════════
      backgroundImage: {
        // Dégradés de fond
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-void': 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
        'gradient-cosmic': 'radial-gradient(ellipse at top, #2d1f3d 0%, #0a0a0f 50%, #0a0a0f 100%)',
        
        // Dégradés pour bordures (border-image)
        'gradient-border-arcane': 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.3), rgba(217, 70, 239, 0.5))',
        'gradient-border-subtle': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        
        // Dégradé pour overlay sur images
        'gradient-card-overlay': 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(10, 10, 15, 0.8) 70%, rgba(10, 10, 15, 0.95) 100%)',
        
        // Dégradé néon pour éléments actifs
        'gradient-neon': 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #d946ef 100%)',
      },

      // ═══════════════════════════════════════════════════════════════════
      // 📐 BORDURES
      // ═══════════════════════════════════════════════════════════════════
      borderRadius: {
        'glass': '16px',
        'glass-lg': '24px',
        'glass-xl': '32px',
        'pill': '9999px',
      },

      // ═══════════════════════════════════════════════════════════════════
      // 🔤 TYPOGRAPHIE
      // ═══════════════════════════════════════════════════════════════════
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },

      // ═══════════════════════════════════════════════════════════════════
      // 🎭 ANIMATIONS
      // ═══════════════════════════════════════════════════════════════════
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // ═══════════════════════════════════════════════════════════════════
      // 📏 ESPACEMENTS PERSONNALISÉS
      // ═══════════════════════════════════════════════════════════════════
      spacing: {
        'sidebar': '80px',
        'sidebar-expanded': '280px',
      },
    },
  },
  plugins: [],
}
