/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔮 GlassCard - Composant de carte Liquid Glass réutilisable
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Carte premium avec effet glassmorphisme (verre dépoli), bordure lumineuse
 * et animations de survol luxueuses.
 * 
 * @example
 * <GlassCard>
 *   <h2>Contenu</h2>
 * </GlassCard>
 * 
 * @example avec glow
 * <GlassCard variant="glow" hover="lift">
 *   <p>Carte avec lueur</p>
 * </GlassCard>
 */

import { forwardRef } from 'react';

const GlassCard = forwardRef(({
  children,
  className = '',
  variant = 'default',   // 'default' | 'subtle' | 'glow' | 'solid'
  hover = 'default',     // 'default' | 'lift' | 'glow' | 'scale' | 'none'
  padding = 'md',        // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded = 'xl',        // 'md' | 'lg' | 'xl' | '2xl' | 'full'
  border = true,
  blur = true,
  as: Component = 'div',
  onClick,
  ...props
}, ref) => {
  
  // ─────────────────────────────────────────────────────────────────────────
  // Classes de base
  // ─────────────────────────────────────────────────────────────────────────
  const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-out';
  
  // ─────────────────────────────────────────────────────────────────────────
  // Variantes de fond
  // ─────────────────────────────────────────────────────────────────────────
  const variantClasses = {
    default: `
      bg-gradient-to-br from-white/[0.05] to-white/[0.02]
      ${blur ? 'backdrop-blur-xl' : ''}
    `,
    subtle: `
      bg-white/[0.02]
      ${blur ? 'backdrop-blur-lg' : ''}
    `,
    glow: `
      bg-gradient-to-br from-white/[0.06] to-white/[0.02]
      ${blur ? 'backdrop-blur-xl' : ''}
      shadow-[0_0_30px_rgba(168,85,247,0.1)]
    `,
    solid: `
      bg-void-700
      ${blur ? 'backdrop-blur-sm' : ''}
    `,
  };
  
  // ─────────────────────────────────────────────────────────────────────────
  // Effets de survol
  // ─────────────────────────────────────────────────────────────────────────
  const hoverClasses = {
    default: 'hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-white/[0.03] hover:border-white/[0.15]',
    lift: 'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(168,85,247,0.1)]',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-arcane-500/40',
    scale: 'hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]',
    none: '',
  };
  
  // ─────────────────────────────────────────────────────────────────────────
  // Padding
  // ─────────────────────────────────────────────────────────────────────────
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  // ─────────────────────────────────────────────────────────────────────────
  // Border radius
  // ─────────────────────────────────────────────────────────────────────────
  const roundedClasses = {
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-[20px]',
    '2xl': 'rounded-3xl',
    full: 'rounded-full',
  };
  
  // ─────────────────────────────────────────────────────────────────────────
  // Bordure
  // ─────────────────────────────────────────────────────────────────────────
  const borderClasses = border 
    ? 'border border-white/[0.08]' 
    : '';
  
  // ─────────────────────────────────────────────────────────────────────────
  // Assemblage des classes
  // ─────────────────────────────────────────────────────────────────────────
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    hoverClasses[hover],
    paddingClasses[padding],
    roundedClasses[rounded],
    borderClasses,
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Component
      ref={ref}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {/* Bordure gradient lumineuse */}
      <div 
        className="absolute inset-0 rounded-inherit pointer-events-none opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(168,85,247,0.1) 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: 'inherit',
        }}
      />
      
      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
