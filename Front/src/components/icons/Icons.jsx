/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎨 Icônes personnalisées pour LP Winners
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Collection d'icônes SVG optimisées pour l'interface Liquid Glass
 */

// Logo LP Winners (inspiré du style Riot Games)
export const LogoIcon = ({ className = '', size = 32 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6z" 
      fill="currentColor" 
      opacity="0.3"
    />
    <path 
      d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-3.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5.5 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" 
      fill="currentColor"
    />
  </svg>
);

// Icône Accueil
export const HomeIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

// Icône Grille (Champions)
export const GridIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// Icône Recherche
export const SearchIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// Icône Notifications
export const BellIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

// Icône Utilisateur
export const UserIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Icône Email
export const MailIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Icône Cadenas (Password)
export const LockIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

// Icône Connexion (Login)
export const LoginIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

// Icône Forum/Messages
export const ChatIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

// Icône Stats/Graphique
export const StatsIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 20V10" />
    <path d="M12 20V4" />
    <path d="M6 20v-6" />
  </svg>
);

// Icône Flèche retour
export const ChevronLeftIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15,18 9,12 15,6" />
  </svg>
);

// Icône Flèche dropdown
export const ChevronDownIcon = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// ICÔNES DE RÔLES LEAGUE OF LEGENDS
// ═══════════════════════════════════════════════════════════════════════════

// Top Lane
export const TopLaneIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 4h6v2H6v4H4V4zm16 0v6h-2V6h-4V4h6zM4 20v-6h2v4h4v2H4zm16 0h-6v-2h4v-4h2v6z" opacity="0.3"/>
    <path d="M4 4h6v6H4V4z" />
  </svg>
);

// Jungle
export const JungleIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L8 8l4 2 4-2-4-6zm-6 8l-2 6 4 2 2-4-4-4zm12 0l-4 4 2 4 4-2-2-6zM9 16l-1 4h8l-1-4-3 2-3-2z" />
  </svg>
);

// Mid Lane
export const MidLaneIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 4h6v2H6v4H4V4zm16 0v6h-2V6h-4V4h6zM4 20v-6h2v4h4v2H4zm16 0h-6v-2h4v-4h2v6z" opacity="0.3"/>
    <path d="M8 8h8v8H8V8z" />
  </svg>
);

// ADC / Bot Lane
export const BotLaneIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 4h6v2H6v4H4V4zm16 0v6h-2V6h-4V4h6zM4 20v-6h2v4h4v2H4zm16 0h-6v-2h4v-4h2v6z" opacity="0.3"/>
    <path d="M14 14h6v6h-6v-6z" />
  </svg>
);

// Support
export const SupportIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// ICÔNES DE CLASSES DE CHAMPIONS
// ═══════════════════════════════════════════════════════════════════════════

// Assassin
export const AssassinIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5zm0 3l2 6h-4l2-6zm-2 8h4l-2 6-2-6z"/>
  </svg>
);

// Fighter
export const FighterIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.02-.22.03-.45.03-.68zm-7.5 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);

// Mage
export const MageIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Marksman
export const MarksmanIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Tank
export const TankIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.25 6 2.25v4.78z"/>
  </svg>
);

// Support class
export const SupportClassIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// UI ICONS (ADDED)
// ═══════════════════════════════════════════════════════════════════════════

export const FireIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.31.52.544 1.17.9 1.8z" />
  </svg>
);

export const PenIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export const TrophyIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

export const ArrowRightIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const FilterIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const InfoIcon = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default {
  LogoIcon,
  HomeIcon,
  GridIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  LoginIcon, // Added this back
  MailIcon,
  LockIcon,
  ChatIcon,
  StatsIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  TopLaneIcon,
  JungleIcon,
  MidLaneIcon,
  BotLaneIcon,
  SupportIcon,
  AssassinIcon,
  FighterIcon,
  MageIcon,
  MarksmanIcon,
  TankIcon,
  SupportClassIcon,
  FireIcon,
  PenIcon,
  TrophyIcon,
  ArrowRightIcon,
  FilterIcon,
  InfoIcon,
};