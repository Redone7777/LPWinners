/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💠 LES ARCHIVES DU NEXUS - FORUM ULTRA-IMMERSIF
 * ═══════════════════════════════════════════════════════════════════════════
 * Une interface holographique défiant la gravité pour la communauté.
 * Concept : "Éclats de données dans le Vide"
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SearchIcon, FilterIcon, FireIcon,
  ChatIcon, TrophyIcon, PenIcon,
  ArrowRightIcon, UserIcon, InfoIcon
} from '../../components/icons/Icons';
import { getForumPosts } from '../../shared/services/api';

// --- MOCK DATA ---
const TRENDING_TOPICS = [
  "🔥 Patch 14.5 : Changement de Meta ADC", 
  "🏆 T1 vs GEN : Analyse de Match", 
  "👀 Fuites sur le Rework de Skarner", 
  "📉 Chute du Taux de Victoire de Yasuo",
  "✨ Nouveaux Skins Prestige Révélés"
];

const POSTS = [
  {
    id: "jinx-guide-s14",
    type: "guide",
    layout: "featured", 
    author: "X_JinxMain_X",
    rank: "GM",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5316.png",
    title: "JINX : LA DÉESSE DE L'HYPERCARRY",
    subtitle: "Guide Ultime S14 • Tempo Mortel • Stratégie 1v9",
    desc: "Tout ce que vous devez savoir pour pulvériser les barres de vie en Saison 14. Inclut des feuilles de calcul détaillées et les synergies de support.",
    votes: "1.2k",
    comments: 89,
    tags: ["ADC", "Guide", "S14"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_1.jpg",
    color: "from-pink-500 to-purple-600",
    accent: "#d946ef"
  },
  {
    id: "2",
    type: "discussion",
    layout: "standard",
    author: "FakerFanboy",
    rank: "D2",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5317.png",
    title: "T1 est-il inarrêtable ?",
    desc: "En regardant la synergie entre Zeus and Oner, je ne vois aucune équipe les défier au MSI.",
    votes: 850,
    comments: 234,
    tags: ["Esport", "LCK"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg",
    color: "from-yellow-500 to-orange-600",
    accent: "#eab308"
  },
  {
    id: "3",
    type: "highlight",
    layout: "tall",
    author: "LeeSinGod",
    rank: "CH",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5318.png",
    title: "Le Vol de Baron à 1 PV",
    desc: "Un Z aveugle dans l'antre du Baron. Vous devez voir ça.",
    votes: "3.2k",
    comments: 120,
    tags: ["Clip", "Action"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_11.jpg",
    color: "from-blue-500 to-teal-400",
    accent: "#2dd4bf"
  },
  {
    id: "4",
    type: "meta",
    layout: "standard",
    author: "MetaSlave",
    rank: "M",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5319.png",
    title: "Maokai Support est MORT",
    desc: "Riot a enfin nerfé le jet de rejeton. Voici les calculs expliquant pourquoi vous devriez l'abandonner.",
    votes: 540,
    comments: 67,
    tags: ["Patch", "Nerf"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_2.jpg",
    color: "from-green-500 to-emerald-700",
    accent: "#10b981"
  },
  {
    id: "5",
    type: "guide",
    layout: "standard",
    author: "HookCity",
    rank: "P1",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5320.png",
    title: "Mécaniques de Thresh 101",
    desc: "Prédire les flashs comme MadLife devient facile.",
    votes: 420,
    comments: 34,
    tags: ["Support", "Conseils"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
    color: "from-cyan-500 to-blue-600",
    accent: "#06b6d4"
  },
  {
    id: "6",
    type: "discussion",
    layout: "wide",
    author: "RitoPls",
    rank: "G4",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5321.png",
    title: "Vanguard : Sauveur ou Spyware ?",
    desc: "La communauté est divisée. Parlons de l'accès au niveau du noyau et de ce que cela signifie pour votre vie privée par rapport à l'intégrité du jeu.",
    votes: "-15",
    comments: 999,
    tags: ["Tech", "Anticheat"],
    image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_9.jpg",
    color: "from-red-500 to-rose-700",
    accent: "#f43f5e"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'FLUX DU NEXUS', icon: <FireIcon size={18} /> },
  { id: 'guide', label: 'GRIMOIRE', icon: <PenIcon size={18} /> },
  { id: 'esport', label: 'ARÈNE', icon: <TrophyIcon size={18} /> },
  { id: 'discussion', label: 'TAVERNE', icon: <ChatIcon size={18} /> },
];

// --- COMPONENTS ---

const HolographicCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Determine span classes
  let spanClass = "col-span-1";
  if (post.layout === "featured") spanClass = "col-span-1 md:col-span-2 lg:col-span-2 row-span-2";
  if (post.layout === "wide") spanClass = "col-span-1 md:col-span-2";
  if (post.layout === "tall") spanClass = "row-span-2";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] bg-[#0f1016] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 ${spanClass}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${post.accent}20,
              transparent 80%
            )
          `
        }}
      />

      {/* Background Image with Parallax-like Zoom */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`} />
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        
        {/* Top Meta */}
        <div className="flex justify-between items-start translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur rounded border border-white/10">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <span className="text-xs font-mono">{post.votes} Votes</span>
          </div>
        </div>

        {/* Main Info */}
        <div className="mt-auto">
          {post.layout === "featured" && (
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              className={`h-1 bg-gradient-to-r ${post.color} mb-4`} 
            />
          )}
          
          <Link to={`/forum/${post.id}`} className="block group-hover:translate-x-2 transition-transform duration-300">
            <h3 className={`font-black text-white leading-[0.9] mb-2 ${post.layout === 'featured' ? 'text-4xl md:text-5xl uppercase' : 'text-xl md:text-2xl'}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 group-hover:to-white transition-all">
                {post.title}
              </span>
            </h3>
            {post.subtitle && (
              <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-2">{post.subtitle}</p>
            )}
            <p className="text-white/60 text-sm line-clamp-2 md:w-3/4 group-hover:text-white/80 transition-colors">
              {post.desc}
            </p>
          </Link>

          {/* Footer / Author */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full border border-white/20" />
                <div className="absolute -bottom-1 -right-1 bg-black/80 text-[8px] text-white border border-white/20 px-1 rounded">
                  {post.rank}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{post.author}</span>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">il y a 2h</span>
              </div>
            </div>
            
            <Link to={`/forum/${post.id}`} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all group-hover:rotate-[-45deg]">
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(POSTS); // Initialiser avec les données de démo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    // NOTE: Appel API commenté car le backend n'est pas encore prêt
    // Décommenter une fois le backend opérationnel
    /*
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getForumPosts();
        setPosts(data);
      } catch (err) {
        console.error('Erreur lors du chargement des posts:', err);
        setError('Impossible de charger les posts. Utilisation des données de démonstration.');
        // Garder les données de démo en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    */
    // Utilise les données de démo pour l'instant
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-purple-500/30">
      
      {/* --- LIVE TICKER --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 border-y border-white/5 bg-[#050507]/80 backdrop-blur-sm overflow-hidden py-1">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...TRENDING_TOPICS, ...TRENDING_TOPICS, ...TRENDING_TOPICS].map((topic, i) => (
            <span key={i} className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {topic}
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 pt-4 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        
        {/* --- HERO HEADER --- */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-12 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                  Système en Ligne
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-purple-500/50 to-transparent" />
              </motion.div>
              
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 leading-[0.85]">
                NEXUS<br />
                <span className="text-stroke-thin text-white/10">ARCHIVES</span>
              </h1>
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
                Barre de recherche Liquid Glass (Alignée à droite)
            ───────────────────────────────────────────────────────────────────────── */}
            <div className="
              relative w-full md:w-[400px]
              bg-white/[0.04] backdrop-blur-xl
              border border-white/[0.08]
              rounded-2xl
              overflow-hidden
            ">
              <div className="flex items-center px-4 py-3">
                <SearchIcon size={20} className="text-white/40 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans les archives..."
                  className="
                    flex-1 bg-transparent
                    text-white placeholder-white/40
                    outline-none
                    text-lg font-mono
                  "
                />
                <button className="
                  px-6 py-2
                  border border-purple-500/30
                  rounded-xl
                  text-purple-400 font-medium
                  transition-all duration-300
                ">
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────────
              Category Dock Liquid Glass (Centré et Compact)
          ───────────────────────────────────────────────────────────────────────── */}
          <div className="
            flex flex-wrap items-center gap-2 
            bg-white/[0.04] backdrop-blur-xl 
            border border-white/[0.08] 
            rounded-2xl p-2
            mx-auto w-fit my-12
          ">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300
                  ${activeCategory === cat.id 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/[0.08] border border-transparent'}
                `}
              >
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10 font-bold text-sm tracking-wide">{cat.label}</span>
              </button>
            ))}
            
            <div className="w-px h-8 bg-white/10 mx-2" />
            
            <Link to="/forum/new" className="px-6 py-3 rounded-xl bg-white text-black font-black uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <span>+ Nouveau</span>
            </Link>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="
              w-12 h-12 mx-auto mb-4
              border-4 border-arcane-500/30 border-t-arcane-500
              rounded-full animate-spin
            " />
            <p className="text-white/50">Chargement des posts...</p>
          </div>
        )}

        {/* --- HOLOGRAPHIC GRID --- */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
            {posts.map((post, index) => (
              <HolographicCard key={post.id} post={post} index={index} />
            ))}
          
          {/* Create New Prompt Card (Always last) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 border-2 border-dashed border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer group min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PenIcon size={24} className="text-white/30 group-hover:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Lancer une Discussion</h3>
              <p className="text-white/40 text-sm">Partagez vos connaissances avec le Nexus.</p>
            </div>
          </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Forum;