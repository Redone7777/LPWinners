/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ✨ New Forum Post Creator - LP Winners
 * ═══════════════════════════════════════════════════════════════════════════
 * Créer un nouveau guide/post pour la communauté
 * Design: Liquid Glass + Interactive Selection + Creative Layout
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  SearchIcon,
  PenIcon,
  MarksmanIcon,
  ChevronDownIcon,
  InfoIcon,
  ChatIcon,
  GridIcon
} from '../../components/icons/Icons';

// Mock Data - Champions (extrait de l'API Riot)
const CHAMPIONS = [
  { id: 'jinx', name: 'Jinx', title: 'La Gâchette Folle', role: 'ADC', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Jinx.png' },
  { id: 'ahri', name: 'Ahri', title: 'La Renarde à Neuf Queues', role: 'Mid', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Ahri.png' },
  { id: 'darius', name: 'Darius', title: 'La Main de Noxus', role: 'Top', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Darius.png' },
  { id: 'leesin', name: 'Lee Sin', title: 'Le Moine Aveugle', role: 'Jungle', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/LeeSin.png' },
  { id: 'thresh', name: 'Thresh', title: 'Le Geôlier', role: 'Support', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Thresh.png' },
  { id: 'zed', name: 'Zed', title: 'Le Maître des Ombres', role: 'Mid', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Zed.png' },
  { id: 'caitlyn', name: 'Caitlyn', title: 'La Shérif de Piltover', role: 'ADC', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Caitlyn.png' },
  { id: 'lulu', name: 'Lulu', title: 'La Fée Sorcière', role: 'Support', icon: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Lulu.png' },
];

// Mock Items
const ITEMS = [
  { id: 6672, name: 'Tueur de Krakens', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6672.png', category: 'Mythic' },
  { id: 3031, name: 'Lame d\'Infini', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3031.png', category: 'Legendary' },
  { id: 3006, name: 'Jambières du Berzerker', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png', category: 'Boots' },
  { id: 3036, name: 'Salutations de Dominik', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3036.png', category: 'Legendary' },
  { id: 3094, name: 'Canon Ultrarapide', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3094.png', category: 'Legendary' },
  { id: 3026, name: 'Ange Gardien', img: 'https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3026.png', category: 'Legendary' },
];

// Mock Runes
const RUNES = {
  precision: ['Tempo Mortel', 'Conquérant', 'Jeu de Jambes', 'Attaque Soutenue'],
  domination: ['Électrocution', 'Moisson Noire', 'Rush Nocturne', 'Prédateur'],
  sorcellerie: ['Invocation d\'Aéry', 'Comète Arcanique', 'Rush de Phase', 'Premier Coup'],
  résolution: ['Poigne de l\'Immortel', 'Après-Choc', 'Gardien', 'Feu Intérieur'],
  inspiration: ['Éveil Glacial', 'Sceau Noir', 'Premier Coup', 'Météore Glaciaire']
};

// Summoner Spells
const SUMMONER_SPELLS = [
  { id: 'flash', name: 'Flash', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png' },
  { id: 'ghost', name: 'Fantôme', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHaste.png' },
  { id: 'heal', name: 'Soin', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png' },
  { id: 'barrier', name: 'Barrière', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerBarrier.png' },
  { id: 'teleport', name: 'Téléportation', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerTeleport.png' },
  { id: 'ignite', name: 'Embrasement', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerDot.png' },
  { id: 'exhaust', name: 'Épuisement', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerExhaust.png' },
  { id: 'smite', name: 'Châtiment', img: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerSmite.png' },
];

const NewPost = () => {
  const navigate = useNavigate();

  // Form State
  const [postType, setPostType] = useState('guide'); // 'guide' | 'discussion' | 'question'
  const [title, setTitle] = useState('');
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [selectedRole] = useState(null);
  const [searchChamp, setSearchChamp] = useState('');

  // Content
  const [introText, setIntroText] = useState('');
  const [gameplayText, setGameplayText] = useState('');
  const [combos, setCombos] = useState([{ keys: [], description: '' }]);

  // Build
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRunes, setSelectedRunes] = useState({ primary: null, secondary: null });
  const [selectedSpells, setSelectedSpells] = useState([]);

  // UI State
  const [currentStep, setCurrentStep] = useState(1); // Multi-step wizard

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter champions based on search
  const filteredChampions = CHAMPIONS.filter(champ =>
    champ.name.toLowerCase().includes(searchChamp.toLowerCase())
  );

  // Handle Champion Selection
  const handleSelectChampion = (champion) => {
    setSelectedChampion(champion);
  };

  // Handle Item Toggle
  const toggleItem = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 6) {
        return [...prev, item];
      }
      return prev;
    });
  };

  // Handle Combo Management
  const addCombo = () => {
    setCombos([...combos, { keys: [], description: '' }]);
  };

  const updateCombo = (index, field, value) => {
    const newCombos = [...combos];
    newCombos[index][field] = value;
    setCombos(newCombos);
  };

  const removeCombo = (index) => {
    setCombos(combos.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    if (!title || !selectedChampion) {
      alert('Veuillez remplir le titre et sélectionner un champion');
      return;
    }

    setIsSubmitting(true);

    const postData = {
      type: postType,
      title,
      champion: selectedChampion,
      role: selectedRole,
      content: {
        intro: introText,
        gameplay: gameplayText,
        combos: combos.filter(c => c.description)
      },
      build: {
        items: selectedItems,
        runes: selectedRunes,
        spells: selectedSpells
      }
    };

    try {
      // TODO: API call to create post
      console.log('Creating post:', postData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to forum after creation
      navigate('/forum');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Erreur lors de la création du post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step Indicators
  const steps = [
    { num: 1, label: 'Type & Champion', icon: <SearchIcon size={18} /> },
    { num: 2, label: 'Build & Loadout', icon: <MarksmanIcon size={18} /> },
    { num: 3, label: 'Content & Tips', icon: <PenIcon size={18} /> }
  ];

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 pt-8 pb-6">
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
            <h1 className="text-2xl font-bold text-white">Forum</h1>
          </div>
        </div>
      </header>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-300 mb-2 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Créer un Post
            </h1>
            <p className="text-white/50 text-lg">Partagez vos stratégies avec la communauté</p>
          </div>

          {/* Step Progress */}
          <div className="hidden lg:flex items-center gap-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                    currentStep === step.num
                      ? 'bg-purple-600/20 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : currentStep > step.num
                        ? 'bg-green-600/10 border border-green-500/30'
                        : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.num
                      ? 'bg-purple-500 text-white'
                      : currentStep > step.num
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-white/40'
                  }`}>
                    {currentStep > step.num ? '✓' : step.icon}
                  </div>
                  <span className={`text-sm font-bold ${
                    currentStep === step.num ? 'text-white' : 'text-white/40'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-[2px] ${
                    currentStep > step.num ? 'bg-green-500/50' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Form - Left Side */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">

              {/* STEP 1: Type & Champion */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Post Type Selection */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                        <PenIcon className="text-purple-400" size={20} />
                      </div>
                      Type de Post
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { type: 'guide', label: 'Guide Complet', desc: 'Build, runes, combos détaillés', icon: GridIcon, color: 'purple' },
                        { type: 'discussion', label: 'Discussion', desc: 'Débat ou question ouverte', icon: ChatIcon, color: 'blue' },
                        { type: 'question', label: 'Question', desc: 'Demander de l\'aide', icon: InfoIcon, color: 'cyan' }
                      ].map(({ type, label, desc, icon: Icon, color }) => (
                        <button
                          key={type}
                          onClick={() => setPostType(type)}
                          className={`relative p-6 rounded-2xl border transition-all group ${
                            postType === type
                              ? 'border-white/20 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                              : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10'
                          }`}
                        >
                          <div className={`
                            w-14 h-14 mb-4 rounded-xl
                            flex items-center justify-center
                            transition-all
                            ${postType === type
                              ? `bg-${color}-500/20 border border-${color}-500/30`
                              : 'bg-white/[0.05] border border-white/10 group-hover:bg-white/[0.08]'
                            }
                          `}>
                            <Icon
                              size={24}
                              className={`transition-colors ${
                                postType === type
                                  ? `text-${color}-400`
                                  : 'text-white/50 group-hover:text-white/70'
                              }`}
                            />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-1">{label}</h3>
                          <p className="text-white/50 text-sm">{desc}</p>

                          {postType === type && (
                            <motion.div
                              layoutId="postTypeIndicator"
                              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xs font-bold"
                            >
                              ✓
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="glass-card p-8">
                    <label className="block text-white font-bold mb-4 text-lg">Titre du Post</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: JINX - LA DÉESSE DE L'HYPERCARRY | Guide Ultime S14"
                      className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors text-lg font-semibold"
                    />
                    <div className="mt-2 text-xs text-white/40 flex items-center gap-2">
                      <InfoIcon size={14} />
                      Utilisez un titre accrocheur et descriptif
                    </div>
                  </div>

                  {/* Champion Selection */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        <SearchIcon className="text-blue-400" size={20} />
                      </div>
                      Sélectionner un Champion
                    </h2>

                    {selectedChampion ? (
                      <div className="relative group">
                        <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50">
                          <img
                            src={selectedChampion.icon}
                            alt={selectedChampion.name}
                            className="w-24 h-24 rounded-xl border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                          />
                          <div className="flex-1">
                            <h3 className="text-3xl font-black text-white mb-1">{selectedChampion.name}</h3>
                            <p className="text-purple-300 text-sm mb-3">{selectedChampion.title}</p>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                                {selectedChampion.role}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedChampion(null)}
                            className="px-4 py-2 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 rounded-lg text-white text-sm font-bold transition-colors"
                          >
                            Changer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Search Bar */}
                        <div className="relative mb-6">
                          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                          <input
                            type="text"
                            value={searchChamp}
                            onChange={(e) => setSearchChamp(e.target.value)}
                            placeholder="Rechercher un champion..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Champion Grid */}
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                          {filteredChampions.map(champ => (
                            <button
                              key={champ.id}
                              onClick={() => handleSelectChampion(champ)}
                              className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white/10 hover:border-purple-500 transition-all hover:scale-110 hover:z-10"
                            >
                              <img
                                src={champ.icon}
                                alt={champ.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute bottom-0 left-0 right-0 p-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                                <span className="text-white text-xs font-bold drop-shadow-lg">{champ.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Build & Loadout */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Items Selection */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                          <MarksmanIcon className="text-yellow-400" size={20} />
                        </div>
                        Build Items
                      </span>
                      <span className="text-sm font-normal text-white/40">
                        {selectedItems.length}/6 sélectionnés
                      </span>
                    </h2>

                    {/* Selected Items Preview */}
                    <div className="flex gap-3 mb-6 min-h-[64px] p-4 rounded-xl bg-black/30 border border-white/5">
                      {selectedItems.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative group"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          />
                          <button
                            onClick={() => toggleItem(item)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                      {selectedItems.length === 0 && (
                        <span className="text-white/30 text-sm flex items-center">
                          Cliquez sur les items ci-dessous pour les ajouter
                        </span>
                      )}
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
                      {ITEMS.map(item => {
                        const isSelected = selectedItems.find(i => i.id === item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(item)}
                            className={`relative group aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                              isSelected
                                ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                                : 'border-white/10 hover:border-purple-500/50'
                            }`}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                ✓
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Runes Selection */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center">
                        <span className="text-orange-400 text-xl">⚡</span>
                      </div>
                      Runes
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary Runes */}
                      <div>
                        <label className="block text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider">
                          Primary Tree
                        </label>
                        <div className="space-y-2">
                          {Object.keys(RUNES).map(tree => (
                            <button
                              key={tree}
                              onClick={() => setSelectedRunes({ ...selectedRunes, primary: tree })}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                selectedRunes.primary === tree
                                  ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                                  : 'border-white/10 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <span className="text-white font-bold capitalize">{tree}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Secondary Runes */}
                      <div>
                        <label className="block text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">
                          Secondary Tree
                        </label>
                        <div className="space-y-2">
                          {Object.keys(RUNES).filter(t => t !== selectedRunes.primary).map(tree => (
                            <button
                              key={tree}
                              onClick={() => setSelectedRunes({ ...selectedRunes, secondary: tree })}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                selectedRunes.secondary === tree
                                  ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                  : 'border-white/10 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <span className="text-white font-bold capitalize">{tree}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summoner Spells */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                          <span className="text-cyan-400 text-xl">✨</span>
                        </div>
                        Summoner Spells
                      </span>
                      <span className="text-sm font-normal text-white/40">
                        {selectedSpells.length}/2 sélectionnés
                      </span>
                    </h2>

                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {SUMMONER_SPELLS.map(spell => {
                        const isSelected = selectedSpells.find(s => s.id === spell.id);
                        return (
                          <button
                            key={spell.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedSpells(selectedSpells.filter(s => s.id !== spell.id));
                              } else if (selectedSpells.length < 2) {
                                setSelectedSpells([...selectedSpells, spell]);
                              }
                            }}
                            disabled={!isSelected && selectedSpells.length >= 2}
                            className={`group aspect-square rounded-xl border-2 transition-all hover:scale-110 relative overflow-hidden ${
                              isSelected
                                ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                : 'border-white/10 bg-white/5 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100'
                            }`}
                          >
                            <img
                              src={spell.img}
                              alt={spell.name}
                              className={`w-full h-full object-cover transition-opacity ${
                                isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                              }`}
                              draggable="false"
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                ✓
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Content & Tips */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Introduction */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                        <PenIcon className="text-green-400" size={20} />
                      </div>
                      Introduction
                    </h2>
                    <textarea
                      value={introText}
                      onChange={(e) => setIntroText(e.target.value)}
                      placeholder="Présentez votre champion et votre stratégie globale..."
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Gameplay */}
                  <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        <span className="text-blue-400 text-xl">🎮</span>
                      </div>
                      Gameplay & Stratégie
                    </h2>
                    <textarea
                      value={gameplayText}
                      onChange={(e) => setGameplayText(e.target.value)}
                      placeholder="Décrivez votre style de jeu, early game, late game, teamfights..."
                      rows={6}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Combos */}
                  <div className="glass-card p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                          <span className="text-purple-400 text-xl">⚔️</span>
                        </div>
                        Combos & Techniques
                      </h2>
                      <button
                        onClick={addCombo}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm font-bold transition-colors"
                      >
                        + Ajouter Combo
                      </button>
                    </div>

                    <div className="space-y-4">
                      {combos.map((combo, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center gap-3 mb-3">
                            <input
                              type="text"
                              value={combo.keys}
                              onChange={(e) => updateCombo(index, 'keys', e.target.value.split(',').map(k => k.trim()))}
                              placeholder="Touches (ex: Q, W, E)"
                              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors"
                            />
                            <button
                              onClick={() => removeCombo(index)}
                              className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-bold transition-colors"
                            >
                              ×
                            </button>
                          </div>
                          <textarea
                            value={combo.description}
                            onChange={(e) => updateCombo(index, 'description', e.target.value)}
                            placeholder="Description du combo..."
                            rows={2}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeftIcon size={18} />
                Précédent
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 border border-purple-500/50 rounded-xl text-white font-bold transition-all flex items-center gap-2"
                >
                  Suivant
                  <ChevronDownIcon size={18} className="rotate-[-90deg]" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !title || !selectedChampion}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 border border-green-500/50 rounded-xl text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publication...' : '✓ Publier le Post'}
                </button>
              )}
            </div>
          </div>

          {/* Right Sidebar - Live Preview */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-purple-400">👁️</span>
                Aperçu en Direct
              </h3>

              <div className="space-y-4">
                {/* Preview Title */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">Titre</div>
                  <div className="text-white font-bold line-clamp-2">
                    {title || 'Votre titre apparaîtra ici...'}
                  </div>
                </div>

                {/* Preview Champion */}
                {selectedChampion && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChampion.icon}
                        alt={selectedChampion.name}
                        className="w-12 h-12 rounded-lg border border-purple-500/50"
                      />
                      <div>
                        <div className="text-white font-bold">{selectedChampion.name}</div>
                        <div className="text-purple-300 text-xs">{selectedChampion.title}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Items */}
                {selectedItems.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/40 mb-3 uppercase tracking-wider">Items ({selectedItems.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItems.map(item => (
                        <img
                          key={item.id}
                          src={item.img}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg border border-purple-500/30"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview Runes */}
                {(selectedRunes.primary || selectedRunes.secondary) && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/40 mb-3 uppercase tracking-wider">Runes</div>
                    <div className="space-y-2">
                      {selectedRunes.primary && (
                        <div className="text-purple-400 text-sm font-bold capitalize">
                          ⚡ {selectedRunes.primary}
                        </div>
                      )}
                      {selectedRunes.secondary && (
                        <div className="text-blue-400 text-sm font-bold capitalize">
                          ⚡ {selectedRunes.secondary}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-white/40 mb-3 uppercase tracking-wider">Progression</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Type</span>
                      <span className="text-white font-bold capitalize">{postType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Champion</span>
                      <span className={selectedChampion ? 'text-green-400' : 'text-red-400'}>
                        {selectedChampion ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Build</span>
                      <span className={selectedItems.length > 0 ? 'text-green-400' : 'text-white/30'}>
                        {selectedItems.length}/6
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Contenu</span>
                      <span className={introText || gameplayText ? 'text-green-400' : 'text-white/30'}>
                        {introText || gameplayText ? '✓' : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
};

export default NewPost;
