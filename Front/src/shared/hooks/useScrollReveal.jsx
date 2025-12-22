/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎬 useScrollReveal - Hook pour animer les éléments au scroll
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Hook personnalisé pour révéler les éléments au scroll
 * @returns {Object} - Variantes d'animation
 */
export const useScrollReveal = () => {
  return {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

/**
 * Variantes pour un conteneur avec animation stagger des enfants
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Variantes pour les éléments enfants
 */
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Variantes pour des cards avec effet 3D
 */
export const cardVariants = {
  hidden: {
    opacity: 0,
    rotateX: 15,
    y: 50,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Variantes pour effet de brillance (shimmer)
 */
export const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      repeatDelay: 3,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};
