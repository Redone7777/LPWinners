/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧭 Sidebar - Barre de navigation latérale Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Navigation principale inspirée de image_2.png avec :
 * - Effet glassmorphisme prononcé
 * - Icônes avec effet de lueur au survol/actif
 * - Logo LP Winners en haut
 * - Navigation verticale compacte
 */

import { NavLink, useLocation } from 'react-router-dom';
import { 
  LogoIcon, 
  HomeIcon, 
  GridIcon, 
  SearchIcon, 
  BellIcon, 
  UserIcon,
  ChatIcon,
  StatsIcon
} from '../icons';

const Sidebar = () => {
  const location = useLocation();
  
  // Éléments de navigation
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Accueil' },
    { path: '/champions', icon: GridIcon, label: 'Champions' },
    { path: '/profile', icon: SearchIcon, label: 'Rechercher' },
    { path: '/forum', icon: ChatIcon, label: 'Forum' },
    { path: '/pro-stats', icon: StatsIcon, label: 'Stats Pro' },
  ];
  
  const bottomItems = [
    { path: '/notifications', icon: BellIcon, label: 'Notifications' },
    { path: '/settings', icon: UserIcon, label: 'Profil' },
  ];
  
  return (
    <aside className="
      fixed left-4 top-1/2 -translate-y-1/2
      z-50
      flex flex-col items-center
      py-6 px-2
      w-[72px]
      bg-gradient-to-b from-white/[0.06] to-white/[0.02]
      backdrop-blur-2xl
      border border-white/[0.08]
      rounded-[28px]
      shadow-[0_8px_32px_rgba(0,0,0,0.4)]
    ">
      {/* ─────────────────────────────────────────────────────────────────────
          Logo LP Winners
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="
        mb-6 p-2
        rounded-2xl
        bg-arcane-500/20
        text-arcane-400
        shadow-[0_0_20px_rgba(168,85,247,0.3)]
      ">
        <LogoIcon size={28} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
      </div>
      
      {/* ─────────────────────────────────────────────────────────────────────
          Navigation principale
      ───────────────────────────────────────────────────────────────────────── */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => (
          <NavItem 
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>
      
      {/* ─────────────────────────────────────────────────────────────────────
          Navigation secondaire (bas)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
        {bottomItems.map((item) => (
          <NavItem 
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>
    </aside>
  );
};

/**
 * NavItem - Élément de navigation individuel
 */
const NavItem = ({ to, icon: Icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      className={`
        group relative
        flex items-center justify-center
        w-12 h-12
        rounded-xl
        transition-all duration-300 ease-out
        ${isActive 
          ? 'bg-arcane-500/20 text-arcane-400' 
          : 'text-white/40 hover:text-white/80 hover:bg-white/[0.05]'
        }
      `}
      title={label}
    >
      {/* Icône */}
      <Icon 
        size={22} 
        className={`
          transition-all duration-300
          ${isActive 
            ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' 
            : 'group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]'
          }
        `}
      />
      
      {/* Indicateur actif - lueur externe */}
      {isActive && (
        <div className="
          absolute inset-0 -z-10
          rounded-xl
          bg-arcane-500/10
          animate-pulse
          shadow-[0_0_20px_rgba(168,85,247,0.3)]
        " />
      )}
      
      {/* Tooltip */}
      <div className="
        absolute left-full ml-3
        px-3 py-1.5
        bg-void-700/95 backdrop-blur-lg
        border border-white/10
        rounded-lg
        text-sm text-white/90 font-medium
        whitespace-nowrap
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-200
        translate-x-2 group-hover:translate-x-0
        shadow-lg
      ">
        {label}
      </div>
    </NavLink>
  );
};

export default Sidebar;
