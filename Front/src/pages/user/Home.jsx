/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏠 Home - Page d'accueil Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Link } from 'react-router-dom';
import { GlassCard, GlassButton } from '../../components/ui';
import { GridIcon, SearchIcon, StatsIcon, ChatIcon } from '../../components/icons';

function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col">
      {/* ═══════════════════════════════════════════════════════════════════
          Hero Section
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        {/* Logo / Titre */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-gradient">LP Winners</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl">
            La plateforme d'analyse premium pour League of Legends. 
            Statistiques, builds, et conseils pour dominer la Faille.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link to="/profile">
            <GlassButton variant="primary" size="lg">
              <SearchIcon size={18} />
              Rechercher un joueur
            </GlassButton>
          </Link>
          <Link to="/game-data">
            <GlassButton size="lg">
              <GridIcon size={18} />
              Explorer les champions
            </GlassButton>
          </Link>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          <FeatureCard 
            icon={<GridIcon size={28} />}
            title="Champions"
            description="Explorez tous les champions, leurs statistiques et les meilleurs builds."
            link="/game-data"
          />
          <FeatureCard 
            icon={<StatsIcon size={28} />}
            title="Stats Pro"
            description="Analysez les performances des joueurs professionnels."
            link="/pro-stats"
          />
          <FeatureCard 
            icon={<ChatIcon size={28} />}
            title="Forum"
            description="Partagez vos stratégies et discutez avec la communauté."
            link="/forum"
          />
        </div>
      </section>
    </div>
  );
}

/**
 * FeatureCard - Carte de fonctionnalité
 */
const FeatureCard = ({ icon, title, description, link }) => (
  <Link to={link}>
    <GlassCard 
      hover="lift" 
      padding="lg"
      className="h-full text-left group"
    >
      <div className="
        w-14 h-14 mb-4
        flex items-center justify-center
        rounded-2xl
        bg-arcane-500/10
        text-arcane-400
        group-hover:bg-arcane-500/20
        group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
        transition-all duration-300
      ">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-arcane-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/50">
        {description}
      </p>
    </GlassCard>
  </Link>
);

export default Home;
