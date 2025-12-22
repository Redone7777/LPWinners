import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlassCard } from '../components/ui';
import { ChevronLeftIcon } from '../components/icons';

function Profile() {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données mockées pour le profil
  const playerData = {
    name: name || 'Faker',
    realName: 'Lee Sang-hyeok',
    team: 'T1',
    role: 'Mid Laner',
    region: 'LCK',
    avatar: 'https://i.pravatar.cc/200?img=12',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=300&fit=crop',
    stats: {
      gamesPlayed: 847,
      winRate: 67.3,
      kda: 4.8,
      avgKills: 5.2,
      avgDeaths: 2.1,
      avgAssists: 7.9,
      csPerMin: 9.2,
      goldPerMin: 445,
      killParticipation: 72.5
    },
    recentMatches: [
      { 
        id: 1, 
        champion: 'Azir', 
        result: 'Victoire', 
        kda: '8/2/12', 
        duration: '34:22',
        date: '2025-12-21',
        opponent: 'Gen.G'
      },
      { 
        id: 2, 
        champion: 'Orianna', 
        result: 'Victoire', 
        kda: '6/3/15', 
        duration: '38:45',
        date: '2025-12-21',
        opponent: 'DK'
      },
      { 
        id: 3, 
        champion: 'Syndra', 
        result: 'Défaite', 
        kda: '4/4/8', 
        duration: '29:12',
        date: '2025-12-20',
        opponent: 'KT'
      },
      { 
        id: 4, 
        champion: 'LeBlanc', 
        result: 'Victoire', 
        kda: '11/1/9', 
        duration: '31:55',
        date: '2025-12-20',
        opponent: 'HLE'
      },
      { 
        id: 5, 
        champion: 'Ahri', 
        result: 'Victoire', 
        kda: '7/2/14', 
        duration: '36:18',
        date: '2025-12-19',
        opponent: 'KDF'
      },
    ],
    topChampions: [
      { name: 'Azir', games: 156, winRate: 71.2, kda: 5.1, icon: '🦅' },
      { name: 'Orianna', games: 142, winRate: 68.3, kda: 4.9, icon: '⚽' },
      { name: 'Syndra', games: 128, winRate: 69.5, kda: 5.3, icon: '🔮' },
      { name: 'LeBlanc', games: 98, winRate: 65.8, kda: 4.6, icon: '🎭' },
      { name: 'Ahri', games: 87, winRate: 64.2, kda: 4.7, icon: '🦊' },
    ],
    achievements: [
      { title: 'Worlds Champion', year: '2023, 2024', icon: '🏆' },
      { title: 'LCK Champion', year: '2024 Spring/Summer', icon: '👑' },
      { title: 'MVP', year: '2024', icon: '⭐' },
      { title: 'Pentakill Master', count: 23, icon: '💥' },
    ],
    socialStats: {
      followers: 2847000,
      following: 127,
      posts: 342
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'matches', label: 'Matchs récents' },
    { id: 'champions', label: 'Champions' },
    { id: 'achievements', label: 'Accomplissements' }
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="
            p-2 rounded-xl
            bg-white/[0.05] border border-white/10
            text-white/60
            hover:bg-white/[0.08] hover:text-white/90
            transition-all duration-200
          ">
            <ChevronLeftIcon size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">Profil Joueur</h1>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <GlassCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img 
                src={playerData.avatar} 
                alt={playerData.name}
                className="w-24 h-24 rounded-2xl border-2 border-cyan-500/50"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-1.5">
                <span className="text-lg">⭐</span>
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gradient mb-1">
                {playerData.name}
              </h2>
              <p className="text-lg text-white/60 mb-3">{playerData.realName}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {playerData.team}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {playerData.role}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {playerData.region}
                </span>
              </div>

              {/* Social Stats */}
              <div className="flex gap-6 justify-center md:justify-start text-sm text-white/60">
                <div>
                  <span className="font-bold text-white">{(playerData.socialStats.followers / 1000000).toFixed(1)}M</span>
                  <span className="ml-1">Abonnés</span>
                </div>
                <div>
                  <span className="font-bold text-white">{playerData.socialStats.following}</span>
                  <span className="ml-1">Abonnements</span>
                </div>
                <div>
                  <span className="font-bold text-white">{playerData.socialStats.posts}</span>
                  <span className="ml-1">Posts</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                Suivre
              </button>
              <button className="px-5 py-2 rounded-xl bg-white/5 text-white/80 text-sm font-medium hover:bg-white/10 transition-all">
                Message
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats principales */}
              <GlassCard className="p-6 col-span-full">
                <h2 className="text-xl font-bold mb-6 text-gradient">
                  Statistiques Globales
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <StatItem label="Matchs joués" value={playerData.stats.gamesPlayed} />
                  <StatItem label="Taux de victoire" value={`${playerData.stats.winRate}%`} highlight />
                  <StatItem label="KDA" value={playerData.stats.kda} highlight />
                  <StatItem label="K/D/A Moyen" value={`${playerData.stats.avgKills}/${playerData.stats.avgDeaths}/${playerData.stats.avgAssists}`} />
                  <StatItem label="CS/min" value={playerData.stats.csPerMin} />
                  <StatItem label="Gold/min" value={playerData.stats.goldPerMin} />
                  <StatItem label="Kill Participation" value={`${playerData.stats.killParticipation}%`} />
                </div>
              </GlassCard>

              {/* Top Champions */}
              <GlassCard className="p-6 lg:col-span-2">
                <h2 className="text-xl font-bold mb-6 text-gradient">
                  Champions Favoris
                </h2>
                <div className="space-y-3">
                  {playerData.topChampions.map((champion, index) => (
                    <div key={champion.name} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                      <div className="text-2xl">{champion.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-white">{champion.name}</span>
                          <span className="text-xs text-white/40">{champion.games} parties</span>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span className="text-green-400">{champion.winRate}% WR</span>
                          <span className="text-cyan-400">{champion.kda} KDA</span>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-white/20">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-6 text-gradient">
                  Accomplissements
                </h2>
                <div className="space-y-3">
                  {playerData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <div className="font-semibold text-yellow-300 text-sm">{achievement.title}</div>
                        <div className="text-xs text-white/40">
                          {achievement.year || `${achievement.count} fois`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === 'matches' && (
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-6 text-gradient">
                Matchs Récents
              </h2>
              <div className="space-y-3">
                {playerData.recentMatches.map(match => (
                  <div 
                    key={match.id}
                    className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border-l-4 ${
                      match.result === 'Victoire' 
                        ? 'bg-green-500/5 border-green-500/50' 
                        : 'bg-red-500/5 border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1.5 rounded-lg font-bold text-sm ${
                        match.result === 'Victoire' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {match.result === 'Victoire' ? 'V' : 'D'}
                      </div>
                      <div>
                        <div className="font-bold text-white">{match.champion}</div>
                        <div className="text-xs text-white/40">vs {match.opponent}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-center">
                      <div>
                        <div className="font-bold text-white">{match.kda}</div>
                        <div className="text-xs text-white/40">KDA</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white/80 text-sm">{match.duration}</div>
                        <div className="text-xs text-white/40">Durée</div>
                      </div>
                      <div>
                        <div className="font-semibold text-white/80 text-sm">{match.date}</div>
                        <div className="text-xs text-white/40">Date</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {activeTab === 'champions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerData.topChampions.map(champion => (
                <GlassCard key={champion.name} className="p-6 hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-center">
                    <div className="text-5xl mb-4">{champion.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{champion.name}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="text-xl font-bold text-cyan-400">{champion.games}</div>
                        <div className="text-xs text-white/40">Parties</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-400">{champion.winRate}%</div>
                        <div className="text-xs text-white/40">Victoires</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-400">{champion.kda}</div>
                        <div className="text-xs text-white/40">KDA</div>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                      Voir les détails
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playerData.achievements.map((achievement, index) => (
                <GlassCard key={index} className="p-8 text-center hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-gradient mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {achievement.year || `Obtenu ${achievement.count} fois`}
                  </p>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour les statistiques
function StatItem({ label, value, highlight }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold mb-1 ${
        highlight 
          ? 'text-gradient' 
          : 'text-white'
      }`}>
        {value}
      </div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

export default Profile;
