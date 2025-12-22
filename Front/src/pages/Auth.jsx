/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔐 Auth - Page de Connexion / Inscription Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { GlassCard, GlassButton } from '../components/ui';
import { LogoIcon, UserIcon, MailIcon, LockIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de connexion/inscription
    login({
      name: formData.username || formData.email.split('@')[0] || 'Invoqueur',
      email: formData.email,
      avatar: null
    });
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-gradient-void">
      <div className="w-full max-w-md animate-float">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2 tracking-tight">
            <span className="text-gradient drop-shadow-sm">{isLogin ? 'CONNEXION' : 'INSCRIPTION'}</span>
          </h1>
          <p className="text-white/50 font-medium">
            {isLogin 
              ? 'Le nexus vous attend, Invoqueur' 
              : 'Commencez votre ascension aujourd\'hui'}
          </p>
        </div>

        {/* Auth Card */}
        <GlassCard variant="glow" padding="xl" className="shadow-glass-xl border-white/10 backdrop-blur-glass-heavy relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-arcane-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1.5 group">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1 transition-colors group-focus-within:text-arcane-400">
                  Nom d'utilisateur
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within/input:text-arcane-400 transition-colors">
                    <UserIcon size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Invoqueur123"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-void-500/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-arcane-500/30 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 group">
              <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1 transition-colors group-focus-within:text-arcane-400">
                Email
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within/input:text-arcane-400 transition-colors">
                  <MailIcon size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="nom@exemple.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-void-500/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-arcane-500/30 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1 transition-colors group-focus-within:text-arcane-400">
                Mot de passe
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within/input:text-arcane-400 transition-colors">
                  <LockIcon size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-void-500/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-arcane-500/30 transition-all duration-300"
                />
              </div>
              {isLogin && (
                <div className="flex justify-end pr-1">
                  <button type="button" className="text-[10px] font-bold uppercase tracking-wider text-arcane-400/60 hover:text-arcane-400 transition-all hover:translate-x-0.5">
                    Mot de passe oublié ?
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <GlassButton type="submit" variant="primary" className="w-full py-4 text-sm font-black uppercase tracking-[0.2em] shadow-glow-arcane hover:shadow-glow-arcane-lg transform active:scale-[0.98] transition-all" size="lg">
                {isLogin ? 'Entrer dans l\'arène' : 'Forger mon destin'}
              </GlassButton>
            </div>
          </form>

          {/* Switch Login/Register */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              {isLogin ? "Nouveau sur LP Winners ?" : "Déjà membre de l'élite ?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-arcane-400 font-bold hover:text-arcane-300 transition-colors hover:underline underline-offset-4"
              >
                {isLogin ? "S'INSCRIRE" : 'SE CONNECTER'}
              </button>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Auth;
