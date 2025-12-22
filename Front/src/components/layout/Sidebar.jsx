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
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../shared/context/AuthContext';
import {
  LogoIcon,
  HomeIcon,
  GridIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  LoginIcon,
  ChatIcon,
  StatsIcon
} from '../icons';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Éléments de navigation principale
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Accueil' },
    { path: '/game-data', icon: GridIcon, label: 'Jeu' },
    { path: '/players', icon: SearchIcon, label: 'Joueurs' },
    { path: '/forum', icon: ChatIcon, label: 'Forum' },
    { path: '/pro-stats', icon: StatsIcon, label: 'Stats Pro' },
  ];

  // Variantes d'animation pour la sidebar
  const sidebarVariants = {
    hidden: {
      x: -100,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="
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
      "
    >
      {/* ─────────────────────────────────────────────────────────────────────
          Logo LP Winners
      ───────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="
          mb-6 p-2
          rounded-2xl
          bg-arcane-500/20
          text-arcane-400
          shadow-[0_0_20px_rgba(168,85,247,0.3)]
          cursor-pointer
        "
      >
        <LogoIcon size={28} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
      </motion.div>
      
      {/* ─────────────────────────────────────────────────────────────────────
          Navigation principale
      ───────────────────────────────────────────────────────────────────────── */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => (
          <motion.div key={item.path} variants={itemVariants}>
            <NavItem
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          </motion.div>
        ))}
      </nav>

      {/* ─────────────────────────────────────────────────────────────────────
          Navigation secondaire (bas)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
        <NavItem
          to="/notifications"
          icon={BellIcon}
          label="Notifications"
          isActive={location.pathname === '/notifications'}
        />

        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <NavItem
                to="/profile"
                icon={UserIcon}
                label="Profil"
                isActive={location.pathname === '/profile'}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <NavItem
                to="/login"
                icon={LoginIcon}
                label="Connexion"
                isActive={location.pathname === '/login'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

/**
 * NavItem - Élément de navigation individuel avec animations
 */
const NavItem = ({ to, icon: Icon, label, isActive }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
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
        {/* Icône avec animation */}
        <motion.div
          animate={isActive ? {
            rotate: [0, -5, 5, 0],
            scale: [1, 1.1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
        </motion.div>

        {/* Indicateur actif - lueur externe avec animation */}
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1]
            }}
            transition={{ duration: 0.5 }}
            className="
              absolute inset-0 -z-10
              rounded-xl
              bg-arcane-500/10
              animate-pulse
              shadow-[0_0_20px_rgba(168,85,247,0.3)]
            "
          />
        )}

        {/* Tooltip avec animation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="
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
          "
        >
          {label}
        </motion.div>
      </NavLink>
    </motion.div>
  );
};

export default Sidebar;
