import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Eye, Filter, Camera, Layers, Grid, List, Sparkles, X, Heart, Compass } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types';
import TiltCard from './TiltCard';
import HoverRevealList from './HoverRevealList';
import HighlighterText from './HighlighterText';

interface PortfolioGridProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
}

export default function PortfolioGrid({ projects, onOpenProject }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'reveal-list'>('reveal-list');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const handleLike = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation(); // prevent opening lightbox
    const hasLiked = likedList[projectId];
    setLikedList(prev => ({ ...prev, [projectId]: !hasLiked }));
    setLikes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + (hasLiked ? -1 : 1)
    }));
  };

  const categoriesSet: { label: string; value: ProjectCategory; icon: typeof Grid }[] = [
    { label: 'All Cases', value: 'all', icon: Grid },
    { label: 'Data & Analytics', value: 'design', icon: Layers },
    { label: 'Applied Quantitative Systems', value: 'photography', icon: Compass }
  ];

  // Filter and search computation
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8" id="portfolio-gallery-anchor">
      {/* Search & Categories Selection Panel */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-2xl">
        {/* Horizontal Nav tabs */}
        <div className="flex flex-wrap gap-2">
          {categoriesSet.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setActiveTab(cat.value);
                }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded text-xs md:text-sm font-mono font-bold tracking-widest transition-all duration-300 select-none cursor-pointer uppercase ${
                  isSelected
                    ? 'text-white'
                    : 'text-white/60 hover:text-[#FF4D00] hover:bg-white/5 bg-transparent'
                }`}
              >
                {/* Underlay Active pills animation */}
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-[#FF4D00] rounded z-0"
                    transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#FF4D00]'}`} />
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Search Elements Container */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:max-w-2xl justify-end">
          
          {/* Elegant layout switcher pills */}
          <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-white/10 w-full sm:w-auto justify-center select-none">
            <button
              onClick={() => setViewMode('reveal-list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'reveal-list'
                  ? 'bg-[#FF4D00] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" /> HOVER REVEAL
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#FF4D00] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> GRID CARDS
            </button>
          </div>

          {/* Input Text Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags, clients..."
              className="w-full pl-11 pr-10 py-3 rounded bg-black text-white border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4D00] focus:border-[#FF4D00] transition-all text-[#CCCCCC]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 p-0.5 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render conditional views based on configured viewMode */}
      {viewMode === 'reveal-list' ? (
        <HoverRevealList projects={filteredProjects} onOpenProject={onOpenProject} />
      ) : (
        /* Grid List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <TiltCard
                  onClick={() => onOpenProject(item)}
                  className="flex flex-col h-full bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-[#FF4D00]/50 hover:shadow-2xl transition-all duration-300"
                  id={`portfolio-card-${item.id}`}
                >
                  {/* Media Wrap with Hover Glow overlays & glitch-image-wrapper */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-900 border-b border-white/5 glitch-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover glitch-image-base filter brightness-95"
                      referrerPolicy="no-referrer"
                    />

                    {/* Glitch Channel 1 (Red Accent) */}
                    <img
                      src={item.image}
                      alt={`${item.title} Red channel glitch`}
                      className="glitch-channel glitch-red"
                      referrerPolicy="no-referrer"
                    />

                    {/* Glitch Channel 2 (Blue Accent) */}
                    <img
                      src={item.image}
                      alt={`${item.title} Blue channel glitch`}
                      className="glitch-channel glitch-blue"
                      referrerPolicy="no-referrer"
                    />

                    {/* Ambient vignette hovering mask */}
                    <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Tags atop graphic */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      <span className="bg-black/90 backdrop-blur-md text-white border border-white/10 text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                        {item.subCategory.split(' ')[0]}
                      </span>
                    </div>

                    {/* Floating Like Icon */}
                    <div className="absolute top-3 right-3 z-10 p-0">
                      <button
                        onClick={(e) => handleLike(e, item.id)}
                        className={`px-2.5 py-1.5 rounded border shadow-md backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono font-bold ${
                          likedList[item.id]
                            ? 'bg-[#FF4D00] border-transparent text-white'
                            : 'bg-black/75 border-white/10 text-neutral-400 hover:text-[#FF4D00] hover:bg-black'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedList[item.id] ? 'fill-white animate-ping-once' : ''}`} />
                        <span>
                          {(likes[item.id] || 0) + (item.category === 'design' ? 12 : 24)}
                        </span>
                      </button>
                    </div>

                    {/* Hover Center Eye Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 bg-[#FF4D00] text-white font-mono text-xs px-4 py-2.5 rounded font-bold tracking-wider">
                        <Eye className="w-4 h-4 text-white" /> VIEW CASE STUDY
                      </span>
                    </div>
                  </div>

                  {/* Card Meta Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                          {item.category === 'design' ? (
                            <Layers className="w-3.5 h-3.5 text-[#FF4D00]" />
                          ) : (
                            <Camera className="w-3.5 h-3.5 text-[#FF4D00]" />
                          )}
                          {item.category} • {item.year}
                        </span>
                      </div>
                      <h4 className="text-base font-display font-black text-white leading-snug tracking-tight uppercase group-hover:text-[#FF4D00] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        <HighlighterText>{item.description}</HighlighterText>
                      </p>
                    </div>

                    {/* Card Tags Swatches */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono bg-white/5 text-neutral-300 px-2 py-0.5 rounded border border-white/5 uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 text-right uppercase tracking-wider font-semibold">
                        {item.category === 'design' ? 'Client Work' : 'Personal Series'}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty Search matched State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-[#121212] border border-white/5 rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-[#FF4D00]">
                <Filter className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-black uppercase tracking-wider text-white">No projects match criteria</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                We couldn't locate cases containing "{searchQuery}". Give other tags such as Leica, Figma, Minimal, or Packaging a try instead.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setActiveTab('all');
                }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-mono font-bold text-white hover:text-black bg-[#FF4D00] hover:bg-white px-5 py-3 rounded transition-colors cursor-pointer uppercase tracking-wider"
              >
                Reset Search Grid
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
