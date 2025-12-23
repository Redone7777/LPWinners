/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔐 Auth - Page de Connexion / Inscription Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui';
import { UserIcon, MailIcon, LockIcon, ChevronLeftIcon } from '../../components/icons';
import { useAuth } from '../../shared/context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.username) {
          setLocalError('Le nom d\'utilisateur est requis');
          setIsSubmitting(false);
          return;
        }
        result = await register(formData.username, formData.email, formData.password);
      }

      if (!result.success) {
        setLocalError(result.error);
      }
    } catch (err) {
      setLocalError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER avec flèche et titre
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center gap-4 mb-8">
        <Link
          to="/"
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
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-white/50 text-sm">
            {isLogin
              ? 'Bon retour sur LP Winners !'
              : 'Rejoignez la communauté LP Winners'
            }
          </p>
        </div>
      </header>

      {/* Container principal */}
      <div className="w-full max-w-md mx-auto">
        {/* ═══════════════════════════════════════════════════════════════════
            Formulaire d'authentification
        ═══════════════════════════════════════════════════════════════════ */}

          <GlassCard padding="xl">
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Champ Username (inscription uniquement) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <div className="
                      absolute inset-y-0 left-0 pl-4
                      flex items-center pointer-events-none
                      text-white/40
                    ">
                      <UserIcon size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Invoqueur123"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="
                        w-full py-3 pl-12 pr-4
                        bg-white/[0.04] backdrop-blur-xl
                        border border-white/[0.08]
                        rounded-xl
                        text-white placeholder-white/40
                        outline-none
                        focus:border-arcane-500/50
                        focus:bg-white/[0.06]
                        transition-all duration-200
                      "
                    />
                  </div>
                </div>
              )}

              {/* Champ Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="
                    absolute inset-y-0 left-0 pl-4
                    flex items-center pointer-events-none
                    text-white/40
                  ">
                    <MailIcon size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="nom@exemple.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="
                      w-full py-3 pl-12 pr-4
                      bg-white/[0.04] backdrop-blur-xl
                      border border-white/[0.08]
                      rounded-xl
                      text-white placeholder-white/40
                      outline-none
                      focus:border-arcane-500/50
                      focus:bg-white/[0.06]
                      transition-all duration-200
                    "
                  />
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="
                    absolute inset-y-0 left-0 pl-4
                    flex items-center pointer-events-none
                    text-white/40
                  ">
                    <LockIcon size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="
                      w-full py-3 pl-12 pr-4
                      bg-white/[0.04] backdrop-blur-xl
                      border border-white/[0.08]
                      rounded-xl
                      text-white placeholder-white/40
                      outline-none
                      focus:border-arcane-500/50
                      focus:bg-white/[0.06]
                      transition-all duration-200
                    "
                  />
                </div>

                {/* Mot de passe oublié */}
                {isLogin && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      className="
                        text-xs text-arcane-400/70
                        hover:text-arcane-400
                        transition-colors duration-200
                      "
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                )}
              </div>

              {/* Message d'erreur */}
              {(localError || error) && (
                <div className="
                  p-3 rounded-lg
                  bg-red-500/10 border border-red-500/30
                  text-red-400 text-sm
                ">
                  {localError || error}
                </div>
              )}

              {/* Bouton de soumission amélioré */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group relative w-full py-4 rounded-xl
                    overflow-hidden
                    font-bold text-base
                    transition-all duration-200
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {/* Background gradient animé */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-r from-arcane-500 via-purple-500 to-electric-500
                    transition-all duration-300
                    group-hover:scale-105
                  " />

                  {/* Effet de brillance au survol */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    translate-x-[-200%]
                    group-hover:translate-x-[200%]
                    transition-transform duration-700
                  " />

                  {/* Glow effect */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-r from-arcane-500 to-electric-500
                    blur-xl opacity-0
                    group-hover:opacity-60
                    transition-opacity duration-300
                  " />

                  {/* Texte */}
                  <span className="relative z-10 text-white">
                    {isSubmitting ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
                  </span>
                </button>
              </div>
            </form>

            {/* Basculer entre connexion et inscription */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">
                {isLogin ? (
                  <>
                    Pas encore de compte ?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="
                        text-arcane-400 font-semibold
                        hover:text-arcane-300
                        transition-colors duration-200
                        underline decoration-arcane-400/30
                        hover:decoration-arcane-300/50
                        underline-offset-2
                      "
                    >
                      S'inscrire
                    </button>
                  </>
                ) : (
                  <>
                    Déjà un compte ?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="
                        text-arcane-400 font-semibold
                        hover:text-arcane-300
                        transition-colors duration-200
                        underline decoration-arcane-400/30
                        hover:decoration-arcane-300/50
                        underline-offset-2
                      "
                    >
                      Se connecter
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-white/40">
              En continuant, vous acceptez nos conditions d'utilisation
            </p>
        </GlassCard>
      </div>
    </div>
  );
}

export default Auth;
