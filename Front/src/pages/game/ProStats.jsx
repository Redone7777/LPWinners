import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, StatsIcon } from '../../components/icons';
import { GlassCard } from '../../components/ui';
import { getProMatches } from '../../shared/services/api';

function ProStats() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // NOTE: Appel API commenté car le backend n'est pas encore prêt
    // Décommenter une fois le backend opérationnel
    /*
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProMatches();
        setMatches(data);
      } catch (err) {
        console.error('Erreur lors du chargement des matchs:', err);
        setError('Impossible de charger les matchs professionnels.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    */
    // Pas de données de démo pour l'instant
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="
              p-2 rounded-xl
              bg-white/[0.05] border border-white/10
              text-white/60
              hover:bg-white/[0.08] hover:text-white/90
              transition-all duration-200
            "
          >
            <ChevronLeftIcon size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Statistiques Pro</h1>
            <p className="text-white/50 text-sm">Suivez les matchs et performances des équipes professionnelles</p>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENU
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Error Message */}
      {error && (
        <div className="
          mb-4 p-4 rounded-xl
          bg-red-500/10 border border-red-500/30
          text-red-400 text-sm
        ">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <GlassCard padding="lg">
          <div className="text-center py-12">
            <div className="
              w-12 h-12 mx-auto mb-4
              border-4 border-arcane-500/30 border-t-arcane-500
              rounded-full animate-spin
            " />
            <p className="text-white/50">Chargement des matchs...</p>
          </div>
        </GlassCard>
      )}

      {/* Content */}
      {!loading && matches.length > 0 && (
        <div className="space-y-4">
          {matches.map((match) => (
            <GlassCard key={match.id} padding="lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{match.team1_name}</div>
                    {match.team1_logo && (
                      <img src={match.team1_logo} alt={match.team1_name} className="w-12 h-12 mx-auto mt-2" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {match.team1_score} - {match.team2_score}
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{match.team2_name}</div>
                    {match.team2_logo && (
                      <img src={match.team2_logo} alt={match.team2_name} className="w-12 h-12 mx-auto mt-2" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/50">{match.tournament}</div>
                  <div className="text-xs text-white/30 mt-1">{match.date}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {!loading && matches.length === 0 && (
        <div className="
          text-center py-16
          text-white/40
        ">
          <StatsIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Aucun match professionnel disponible
          </p>
          <p className="text-sm mt-2">
            Les matchs à venir apparaîtront ici
          </p>
        </div>
      )}
    </div>
  );
}

export default ProStats;
