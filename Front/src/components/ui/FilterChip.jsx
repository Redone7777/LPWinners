/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏷️ FilterChip - Pilule de filtre Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 */

const FilterChip = ({
  children,
  icon,
  active = false,
  onClick,
  className = '',
  showDropdown = false,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center gap-2 px-4 py-2
        bg-white/[0.05] backdrop-blur-lg
        border border-white/[0.1]
        rounded-full
        text-sm font-medium
        transition-all duration-200 ease-out
        hover:bg-white/[0.08] hover:border-white/[0.15]
        ${active 
          ? 'bg-arcane-500/20 border-arcane-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
          : 'text-white/70 hover:text-white/90'
        }
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <span className={`w-4 h-4 ${active ? 'text-arcane-400' : 'text-white/50'}`}>
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {showDropdown && (
        <svg 
          className={`w-3 h-3 transition-transform ${active ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </button>
  );
};

export default FilterChip;
