/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 💬 Forum Post - Guide Champion
 * ═══════════════════════════════════════════════════════════════════════════
 * Page détaillée d'un guide/blog posté par un joueur.
 * Design: Liquid Glass & Neon
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronLeftIcon, UserIcon, ChatIcon, BellIcon,
  BotLaneIcon, MarksmanIcon, StatsIcon
} from '../../components/icons/Icons';
import { getForumPost, getPostComments, createComment } from '../../shared/services/api';

// --- MOCK DATA: Guide pour Jinx ---
const MOCK_GUIDE = {
  id: "jinx-guide-s14",
  title: "JINX - LA DÉESSE DE L'HYPERCARRY | Guide Ultime S14",
  author: {
    name: "X_JinxMain_X",
    rank: "Grand Maître",
    mastery: "1.2M",
    avatar: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/5316.png"
  },
  stats: {
    votes: 1245,
    views: "12.5k",
    date: "il y a 2 jours",
    winrate: "54.2%"
  },
  champion: {
    name: "Jinx",
    title: "La Gâchette Folle",
    role: "ADC",
    splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Jinx.png"
  },
  content: {
    intro: "Jinx est l'un des hypercarries les plus puissants de la Saison 14. Avec les nouveaux changements d'objets, elle déchiquette les tanks comme les cibles fragiles. Ce guide se concentre sur l'optimisation des réinitialisations de son passif et son positionnement.",
    gameplay: "Le début de partie consiste à survivre. Harcelez avec votre Z, mais gardez votre E pour les ganks. Une fois que vous avez le Tueur de Krakens, vous pouvez commencer à chercher des échanges prolongés. Votre but est de vous 'Enthousiasmer' (Passif) dans les combats d'équipe pour tout nettoyer.",
    combos: [
      { keys: ["W", "Flash"], desc: "Snipe Surprise : Lancez le Z et flashez en avant pour étendre la portée de manière inattendue." },
      { keys: ["E", "Q", "A", "A"], desc: "Piège Racine : Placez les pièges derrière l'ennemi, passez aux roquettes et kite en reculant." },
      { keys: ["R", "Flash"], desc: "Annulation d'Animation : Flashez pendant l'incantation du R pour vous repositionner en toute sécurité." }
    ]
  },
  loadout: {
    runes: {
      primary: "Tempo Mortel",
      secondary: "Domination",
      tree: ["Présence d'Esprit", "Légende : Sangsue", "Coup de Grâce", "Goût du Sang", "Chasseur de Trésors"]
    },
    spells: ["Saut Éclair", "Fantôme"]
  },
  items: {
    core: [
      { name: "Tueur de Krakens", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6672.png" },
      { name: "Lame d'Infini", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3031.png" },
      { name: "Jambières du Berzerker", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png" }
    ],
    situational: [
      { name: "Salutations de Dominik", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3036.png" },
      { name: "Canon Ultrarapide", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3094.png" },
      { name: "Ange Gardien", img: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3026.png" }
    ]
  },
  synergies: {
    good: ["Lulu", "Thresh", "Milio"],
    bad: ["Samira", "Draven", "Nautilus"]
  },
  comments: [
    { id: 1, user: "SuppKing99", text: "Super guide ! J'ai testé ce build et j'ai fait un Penta dès la première game.", votes: 45, time: "il y a 5h" },
    { id: 2, user: "IronIV_Warrior", text: "Pourquoi Fantôme plutôt que Soin ? C'est vraiment mieux ?", votes: 12, time: "il y a 1h" }
  ]
};

const ForumPost = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(MOCK_GUIDE); // Initialiser avec les données de démo
  const [comments, setComments] = useState(MOCK_GUIDE.comments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(MOCK_GUIDE.stats.votes);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [visibleComments, setVisibleComments] = useState(3);
  const [postingComment, setPostingComment] = useState(false);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    setPostingComment(true);
    try {
      const newComment = await createComment(id, { text: commentText });
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (err) {
      console.error('Erreur lors de la création du commentaire:', err);
      alert('Impossible de poster le commentaire. Veuillez réessayer.');
    } finally {
      setPostingComment(false);
    }
  };

  useEffect(() => {
    // NOTE: Appels API commentés car le backend n'est pas encore prêt
    // Décommenter une fois le backend opérationnel
    /*
    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      try {
        const postData = await getForumPost(id);
        setGuide(postData);
        setVotes(postData.stats?.votes || 0);

        // Charger les commentaires
        const commentsData = await getPostComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error('Erreur lors du chargement du post:', err);
        setError('Impossible de charger le post. Utilisation des données de démonstration.');
        // Garder les données de démo en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    */
    // Utilise les données de démo pour l'instant
    setLoading(false);
  }, [id]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-900/20 via-[#0a0a0f] to-[#0a0a0f] z-0 pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <div className="relative z-10 w-full h-[400px] mask-gradient-b">
        <img 
          src={guide.champion.splash} 
          alt={guide.champion.name} 
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-8 container mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col gap-4"
          >
            {/* Breadcrumbs */}
            <Link to="/forum" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors w-fit">
              <ChevronLeftIcon size={18} /> Retour au Forum
            </Link>

            {/* Title & Tags */}
            <div className="flex flex-wrap gap-3 items-center ">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                Guide {guide.champion.role}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                Saison 14
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-blue-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              {guide.title}
            </h1>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center gap-6 mt-6 p-4 rounded-2xl bg-white/3 backdrop-blur-xl border border-white/10 w-fit ml-16">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={guide.author.avatar} alt="Author" className="w-12 h-12 rounded-full border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 border border-yellow-200 text-black text-[10px] px-1.5 rounded-full font-black shadow-lg">
                    GM
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{guide.author.name}</div>
                  <div className="text-white/60 text-xs font-medium tracking-wide">{guide.author.mastery} Maîtrise</div>
                </div>
              </div>
              
              <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
              
              <div className="flex gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Winrate</span>
                  <span className="text-green-400 font-black text-base">{guide.stats.winrate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Vues</span>
                  <span className="text-white font-black text-base">{guide.stats.views}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 -mt-4 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left Sidebar (Quick Stats & Loadout) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 h-fit"
          >
            
            {/* Quick Stats Card */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <StatsIcon className="text-purple-400" size={20} /> Loadout
              </h3>
              
              {/* Summoner Spells */}
              <div className="mb-6">
                <span className="text-xs text-white/40 uppercase font-bold tracking-wider mb-3 block">Summoner Spells</span>
                <div className="flex gap-3">
                  {guide.loadout.spells.map(spell => (
                    <div key={spell} className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative group cursor-help">
                      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg blur-md" />
                      {/* Placeholder for spell icon */}
                      <span className="text-[10px] text-white/70 font-bold">{spell[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Runes Compact View */}
              <div>
                <span className="text-xs text-white/40 uppercase font-bold tracking-wider mb-3 block">Primary Runes</span>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-4 mb-2 flex items-center gap-3 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-yellow-400 text-xs font-bold">LT</span>
                    </div>
                    <span className="text-yellow-100 font-bold text-sm">Lethal Tempo</span>
                  </div>
                  {/* Small Runes */}
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 mx-auto" />
                  ))}
                </div>
              </div>
            </div>

            {/* Synergies Card */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold mb-4">Synergies</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-green-400 font-bold">Fort avec</span>
                    <span className="text-white/30">Winrate +2%</span>
                  </div>
                  <div className="flex gap-2">
                    {guide.synergies.good.map(champ => (
                      <div key={champ} className="w-10 h-10 rounded-full bg-white/5 border border-green-500/30 overflow-hidden relative" title={champ}>
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white/50">{champ.substring(0,2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-red-400 font-bold">Faible contre</span>
                    <span className="text-white/30">Winrate -3%</span>
                  </div>
                  <div className="flex gap-2">
                    {guide.synergies.bad.map(champ => (
                      <div key={champ} className="w-10 h-10 rounded-full bg-white/5 border border-red-500/30 overflow-hidden relative" title={champ}>
                         <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white/50">{champ.substring(0,2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Item Build Path (Moved to Sidebar) */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Item Build</h2>
              
              <div className="space-y-6">
                {/* Core Items */}
                <div>
                  <span className="text-xs text-purple-400 uppercase font-bold tracking-widest mb-3 block">Core Items</span>
                  <div className="flex flex-wrap gap-3">
                    {guide.items.core.map((item, idx) => (
                      <div key={idx} className="group relative">
                        <div className="w-12 h-12 rounded-lg bg-gray-900 border border-white/10 overflow-hidden relative group-hover:border-purple-500 transition-colors">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                          {item.name}
                        </span>
                        {/* Arrow connector (Hidden on sidebar for cleaner look) */}
                        {/* {idx < guide.items.core.length - 1 && (
                          <div className="absolute top-1/2 -right-3 w-3 h-[1px] bg-white/10 hidden md:block" />
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Situational */}
                <div>
                  <span className="text-xs text-blue-400 uppercase font-bold tracking-widest mb-3 block">Situational</span>
                  <div className="flex flex-wrap gap-3">
                    {guide.items.situational.map((item, idx) => (
                      <div key={idx} className="group relative">
                         <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 overflow-hidden relative group-hover:border-blue-500 transition-colors">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Center Content (Guide Body) */}
          <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Introduction */}
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Gameplay Overview</h2>
              <p className="text-white/70 leading-relaxed relative z-10 text-lg">
                {guide.content.intro}
              </p>
              <div className="h-[1px] w-full bg-white/5 my-6" />
              <p className="text-white/70 leading-relaxed relative z-10">
                {guide.content.gameplay}
              </p>
            </div>

            {/* Combos & Mechanics */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Combos & Tips</h2>
              <div className="grid gap-4">
                {guide.content.combos.map((combo, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      {combo.keys.map((k, idx) => (
                        <React.Fragment key={idx}>
                          <span className="w-8 h-8 flex items-center justify-center rounded bg-black/40 border border-white/20 text-white font-mono font-bold text-sm shadow-[0_2px_0_rgba(255,255,255,0.1)]">
                            {k}
                          </span>
                          {idx < combo.keys.length - 1 && <span className="text-white/20 text-xs">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm">{combo.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <ChatIcon /> Commentaires <span className="text-base text-white/30 font-normal">({comments.length})</span>
                </h2>
                
                {/* Toggle Switch */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                    {showComments ? 'Activés' : 'Masqués'}
                  </span>
                  <button 
                    onClick={() => setShowComments(!showComments)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 p-1 ${showComments ? 'bg-purple-600' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)] ${showComments ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showComments && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* Comment Input */}
                    <div className="glass-card p-4 mb-6 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                        Me
                      </div>
                      <div className="flex-1">
                        <textarea 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your thoughts on this build..."
                          className="w-full bg-transparent border-none text-white placeholder-white/30 focus:ring-0 resize-none min-h-[60px]"
                        />
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                          <span className="text-xs text-white/30">Markdown supported</span>
                          <button
                            onClick={handlePostComment}
                            disabled={postingComment || !commentText.trim()}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {postingComment ? 'Posting...' : 'Post Comment'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                      {comments.slice(0, visibleComments).map((comment) => (
                        <motion.div 
                          key={comment.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/5 rounded-2xl p-4 border border-white/5"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                                {comment.user[0]}
                              </div>
                              <div>
                                <span className="text-white font-bold text-sm block">{comment.user}</span>
                                <span className="text-white/30 text-xs">{comment.time}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm ml-11">{comment.text}</p>
                          <div className="ml-11 mt-3 flex items-center gap-4 text-xs text-white/40">
                            <button className="hover:text-green-400 transition-colors flex items-center gap-1">
                              ▲ {comment.votes}
                            </button>
                            <button className="hover:text-red-400 transition-colors">
                              Reply
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Load More Button */}
                    {visibleComments < comments.length && (
                      <button
                        onClick={() => setVisibleComments(prev => Math.min(prev + 3, comments.length))}
                        className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white/60 text-sm font-bold transition-all"
                      >
                        Show {Math.min(3, comments.length - visibleComments)} more comments...
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- SIMILAR GUIDES SUGGESTIONS --- */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-purple-400">✦</span> You might also like
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 1,
                    champ: "Caitlyn",
                    title: "One Shot Caitlyn Build",
                    author: "SniperWolf",
                    votes: 892,
                    img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg"
                  },
                  {
                    id: 2,
                    champ: "Zeri",
                    title: "Zeri 1v9 Kiting Machine",
                    author: "LightningZ",
                    votes: 1540,
                    img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zeri_0.jpg"
                  },
                  {
                    id: 3,
                    champ: "Thresh",
                    title: "Best Support for Jinx?",
                    author: "HookCity",
                    votes: 620,
                    img: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg"
                  }
                ].map((post) => (
                  <Link to="#" key={post.id} className="group relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 block">
                    {/* Background Image */}
                    <img src={post.img} alt={post.champ} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">Guide</span>
                      </div>
                      <h4 className="text-white font-bold leading-tight group-hover:text-purple-200 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex justify-between items-center mt-2 text-xs text-white/50">
                        <span>by {post.author}</span>
                        <span className="flex items-center gap-1 text-green-400">▲ {post.votes}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Bar (Mobile/Tablet) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 flex items-center gap-6 z-50 lg:hidden"
      >
        <button onClick={() => setVotes(v => v + 1)} className="flex flex-col items-center gap-1 text-white/60 hover:text-green-400">
          <span className="text-lg">▲</span>
          <span className="text-xs font-bold">{votes}</span>
        </button>
        <div className="w-[1px] h-8 bg-white/10" />
        <button className="flex flex-col items-center gap-1 text-white/60 hover:text-purple-400">
          <ChatIcon size={20} />
          <span className="text-xs font-bold">Chat</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ForumPost;