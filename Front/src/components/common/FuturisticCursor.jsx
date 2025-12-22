/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🖱️ LiquidGlassCursor - Curseur minimaliste style Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Curseur élégant et épuré avec :
 * - Design glassmorphisme subtil
 * - Animations fluides et douces
 * - Effet de flou en verre dépoli
 */

import { useEffect, useRef, useState, useCallback } from 'react';

const FuturisticCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Animation fluide avec interpolation douce
  const animate = useCallback(() => {
    // Interpolation du curseur principal
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;
    
    // Interpolation du glow (plus lent)
    glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
    glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;
    
    if (cursorRef.current) {
      cursorRef.current.style.transform = 
        `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
    }
    
    if (glowRef.current) {
      glowRef.current.style.transform = 
        `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
    }
    
    // Mise à jour de la position pour l'arrière-plan réactif
    document.documentElement.style.setProperty('--mouse-x', `${mousePos.current.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mousePos.current.y}px`);
    
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Détection des éléments interactifs
  const handleElementHover = useCallback((e) => {
    const target = e.target;
    const isInteractive = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.tagName === 'INPUT' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[data-cursor="pointer"]') ||
      target.classList.contains('glass-card') ||
      target.classList.contains('glass-button') ||
      target.classList.contains('filter-chip') ||
      target.classList.contains('nav-icon') ||
      target.classList.contains('champion-card-glass') ||
      target.closest('.glass-card') ||
      target.closest('.champion-card-glass') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [animate, handleMouseMove, handleElementHover, handleMouseDown, handleMouseUp]);

  return (
    <>
      {/* Glow subtil qui suit le curseur */}
      <div 
        ref={glowRef}
        className="cursor-glow"
      />
      
      {/* Curseur principal en verre */}
      <div 
        ref={cursorRef}
        className={`cursor-glass ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
};

export default FuturisticCursor;
