/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📐 Layout - Structure principale de l'application
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Layout principal avec :
 * - Arrière-plan cosmique sombre
 * - Sidebar de navigation flottante
 * - Zone de contenu principale
 * - Curseur futuriste interactif
 */

import Sidebar from './Sidebar';
import FuturisticCursor from '../common/FuturisticCursor';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-void-900 overflow-x-hidden" draggable="false">
      {/* ─────────────────────────────────────────────────────────────────────
          Curseur futuriste personnalisé
      ───────────────────────────────────────────────────────────────────────── */}
      <FuturisticCursor />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Effet de lueur réactive au curseur
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-cursor-reactive" />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Arrière-plan cosmique avec gradients
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient principal */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-900 via-void-800 to-void-900" />
        
        {/* Orbe violet (haut gauche) */}
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
          }}
        />
        
        {/* Orbe bleu (bas droite) */}
        <div 
          className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
          }}
        />
        
        {/* Orbe magenta (centre) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(217, 70, 239, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Texture de bruit subtile */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* ─────────────────────────────────────────────────────────────────────
          Sidebar de navigation
      ───────────────────────────────────────────────────────────────────────── */}
      <Sidebar />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Contenu principal
      ───────────────────────────────────────────────────────────────────────── */}
      <main className="ml-24 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
