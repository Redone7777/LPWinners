/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏆 ChampionDetail - Page de détails d'un champion
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui';
import { ChevronLeftIcon } from '../../components/icons';
import { getChampion } from '../../shared/services/api';

function ChampionDetail() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // NOTE: Appel API commenté car le backend n'est pas encore prêt
    // Décommenter une fois le backend opérationnel
    /*
    const fetchChampion = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getChampion(id);
        setChampion(data);
      } catch (err) {
        console.error('Erreur lors du chargement du champion:', err);
        setError('Impossible de charger les détails du champion.');
      } finally {
        setLoading(false);
      }
    };

    fetchChampion();
    */
    // Pour l'instant, afficher un message d'erreur
    setLoading(false);
    setError('Page de détail du champion disponible une fois le backend connecté.');
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8">
        <GlassCard padding="lg">
          <div className="text-center py-12">
            <div className="
              w-12 h-12 mx-auto mb-4
              border-4 border-arcane-500/30 border-t-arcane-500
              rounded-full animate-spin
            " />
            <p className="text-white/50">Chargement du champion...</p>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (error || !champion) {
    return (
      <div className="min-h-screen p-6 lg:p-8">
        <header className="flex items-center gap-4 mb-8">
          <Link
            to="/game-data"
            className="
              p-2 rounded-xl
              bg-white/[0.05] border border-white/10
              text-white/60
              hover:bg-white/[0.08] hover:text-white/90
              transition-all duration-200
            "
          >
            <ChevronLeftIcon size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Détails du Champion</h1>
        </header>

        <GlassCard padding="lg">
          <div className="text-center py-12">
            <p className="text-red-400">{error || 'Champion introuvable'}</p>
            <Link
              to="/game-data"
              className="
                mt-4 inline-block px-6 py-3
                bg-arcane-500/20 hover:bg-arcane-500/30
                border border-arcane-500/30
                rounded-xl
                text-arcane-400
                transition-all duration-200
              "
            >
              Retour aux champions
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center gap-4 mb-8">
        <Link
          to="/game-data"
          className="
            p-2 rounded-xl
            bg-white/[0.05] border border-white/10
            text-white/60
            hover:bg-white/[0.08] hover:text-white/90
            transition-all duration-200
          "
        >
          <ChevronLeftIcon size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{champion.name}</h1>
          <p className="text-white/50 text-sm">{champion.title}</p>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          IMAGE HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <GlassCard padding="none" className="mb-6 overflow-hidden">
        <div className="relative h-96">
          <img
            src={champion.image_url}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
          <div className="
            absolute inset-0
            bg-gradient-to-t from-void-900 via-void-900/50 to-transparent
          " />
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-bold text-white mb-2">{champion.name}</h2>
            <p className="text-xl text-white/70">{champion.title}</p>
            <div className="mt-4 inline-block px-4 py-2 rounded-lg bg-arcane-500/20 border border-arcane-500/30">
              <span className="text-arcane-400 font-semibold capitalize">{champion.role}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══════════════════════════════════════════════════════════════════
            STATISTIQUES
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-1">
          <GlassCard padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Statistiques</h3>
            <div className="space-y-3">
              {champion.stats && Object.entries(champion.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-white/60 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
              {!champion.stats && (
                <p className="text-sm text-white/40">Aucune statistique disponible</p>
              )}
            </div>
          </GlassCard>

          {/* Informations supplémentaires */}
          <GlassCard padding="lg" className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Informations</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-white/40 mb-1">Rôle</p>
                <p className="text-sm text-white capitalize">{champion.role || 'Non défini'}</p>
              </div>
              {champion.difficulty && (
                <div>
                  <p className="text-xs text-white/40 mb-1">Difficulté</p>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`
                          h-2 w-full rounded
                          ${i < champion.difficulty
                            ? 'bg-arcane-500'
                            : 'bg-white/10'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            COMPÉTENCES & LORE
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description / Lore */}
          {champion.lore && (
            <GlassCard padding="lg">
              <h3 className="text-lg font-bold text-white mb-4">Histoire</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {champion.lore}
              </p>
            </GlassCard>
          )}

          {/* Compétences */}
          <GlassCard padding="lg">
            <h3 className="text-lg font-bold text-white mb-4">Compétences</h3>
            {champion.abilities && champion.abilities.length > 0 ? (
              <div className="space-y-4">
                {champion.abilities.map((ability, index) => (
                  <div
                    key={index}
                    className="
                      flex gap-4 p-4
                      bg-white/[0.03] border border-white/[0.06]
                      rounded-xl
                      hover:bg-white/[0.05] transition-all duration-200
                    "
                  >
                    {ability.image_url && (
                      <div className="
                        w-16 h-16 flex-shrink-0
                        rounded-lg overflow-hidden
                        bg-void-800
                      ">
                        <img
                          src={ability.image_url}
                          alt={ability.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{ability.name}</h4>
                        {ability.key && (
                          <span className="
                            px-2 py-0.5 rounded
                            bg-arcane-500/20 border border-arcane-500/30
                            text-xs text-arcane-400
                          ">
                            {ability.key}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/60">{ability.description}</p>
                      {ability.cooldown && (
                        <p className="text-xs text-white/40 mt-2">
                          Cooldown: {ability.cooldown}s
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">
                Aucune compétence disponible
              </p>
            )}
          </GlassCard>

          {/* Tips & Stratégies */}
          {champion.tips && (
            <GlassCard padding="lg">
              <h3 className="text-lg font-bold text-white mb-4">Conseils</h3>
              <div className="space-y-2">
                {champion.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="
                      flex gap-3 p-3
                      bg-white/[0.03] border border-white/[0.06]
                      rounded-lg
                    "
                  >
                    <span className="text-arcane-400">•</span>
                    <p className="text-sm text-white/70">{tip}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChampionDetail;
