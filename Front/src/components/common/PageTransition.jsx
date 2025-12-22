/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ✨ PageTransition - Cyber Shutter (LP Winners Edition)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  // Configuration des colonnes (shutters)
  const columns = 5;
  
  // Variantes pour les colonnes
  const shutterVariants = {
    initial: {
      scaleY: 1,
      transformOrigin: "bottom", // Pour l'animation d'entrée (reveal)
    },
    animate: (i) => ({
      scaleY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier
        delay: i * 0.05, // Stagger effect
      },
    }),
    exit: (i) => ({
      scaleY: 1,
      transformOrigin: "top", // Pour l'animation de sortie (cover)
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.05,
      },
    }),
  };

  // Variantes pour le contenu de la page
  const contentVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: -10,
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  return (
    <>
      {/* Overlay Shutters */}
      <div className="fixed inset-0 z-[100] flex pointer-events-none h-screen w-screen">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={shutterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full bg-[#0a0a0f]/80 backdrop-blur-md relative" // Semi-transparent avec flou
          >
            {/* Ligne brillante en bas/haut de chaque shutter pour effet scan */}
            <div className="absolute left-0 right-0 h-[2px] bg-purple-500/50 bottom-0 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
          </motion.div>
        ))}
      </div>

      {/* Contenu de la page */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
