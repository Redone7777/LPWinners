/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GlassButton - Bouton Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { forwardRef } from 'react';

const GlassButton = forwardRef(({
  children,
  className = '',
  variant = 'default',   // 'default' | 'primary' | 'ghost' | 'outline'
  size = 'md',           // 'sm' | 'md' | 'lg'
  active = false,
  disabled = false,
  as: Component = 'button',
  ...props
}, ref) => {
  
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium transition-all duration-200 ease-out
    backdrop-blur-lg
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variantClasses = {
    default: `
      bg-white/[0.05] border border-white/[0.1]
      hover:bg-white/[0.1] hover:border-white/[0.2]
      active:bg-arcane-500/20 active:border-arcane-500/40
      ${active ? 'bg-arcane-500/20 border-arcane-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : ''}
    `,
    primary: `
      bg-arcane-500/20 border border-arcane-500/40
      text-arcane-300
      hover:bg-arcane-500/30 hover:border-arcane-500/50
      hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
    `,
    ghost: `
      bg-transparent border-none
      hover:bg-white/[0.05]
      ${active ? 'bg-white/[0.05]' : ''}
    `,
    outline: `
      bg-transparent border border-white/[0.1]
      hover:bg-white/[0.05] hover:border-white/[0.2]
    `,
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  };
  
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Component
      ref={ref}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
});

GlassButton.displayName = 'GlassButton';

export default GlassButton;
