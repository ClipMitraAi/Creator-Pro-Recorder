import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AdMobBanner } from '../ads/AdMobBanner';
import { 
  ArrowLeft, 
  Search, 
  Play, 
  Sliders, 
  Share2, 
  Trash2, 
  Heart, 
  X, 
  Film, 
  Clock, 
  HardDrive,
  Maximize2
} from 'lucide-react';
import { SAMPLE_RECORDINGS } from '../../data/sampleRecordings';
import { RecordingItem } from '../../types/recorder';

export const RecordingsGalleryScreen: React.FC = () => {
  const { theme, setCurrentScreen, showToast } = useTheme();

  const [recordings, setRecordings] = useState<RecordingItem[]>(SAMPLE_RECORDINGS);
  const [filter, setFilter] = useState<'all' | 'gameplay' | 'tutorial' | 'shorts' | 'favorite'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<RecordingItem | null>(null);

  // Filtered recordings
  const filtered = recordings.filter((rec) => {
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'favorite' 
      ? rec.isFavorite 
      : rec.category === filter;
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecordings(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isFavorite;
        showToast(nextState ? 'Added to favorites' : 'Removed from favorites');
        return { ...item, isFavorite: nextState };
      }
      return item;
    }));
  };

  const deleteRecording = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecordings(prev => prev.filter(item => item.id !== id));
    showToast('Recording deleted from library');
    if (activeVideo?.id === id) {
      setActiveVideo(null);
    }
  };

  return (
    <div className="flex-1 p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold" style={{ color: theme.textColor }}>
            Recordings Vault
          </h2>
          <p className="text-xs" style={{ color: theme.textMutedColor }}>
            {filtered.length} clips · Ready for export
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('editor')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: `${theme.primaryColor}15`,
            color: theme.primaryColor,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>
      </div>

      {/* Search Input */}
      <div 
        className="flex items-center gap-2 px-3 py-2 border transition-all"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.borderColor,
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <Search className="w-4 h-4" style={{ color: theme.textMutedColor }} />
        <input
          type="text"
          placeholder="Search recordings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full"
          style={{ color: theme.textColor }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="p-0.5 text-neutral-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All' },
          { id: 'gameplay', label: 'Gameplay' },
          { id: 'tutorial', label: 'Tutorials' },
          { id: 'shorts', label: 'Shorts' },
          { id: 'favorite', label: 'Favorites' },
        ].map(tab => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className="px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: isActive ? theme.primaryColor : `${theme.textColor}10`,
                color: isActive ? '#ffffff' : theme.textMutedColor,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Video Cards List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div 
            className="p-8 text-center border rounded-2xl space-y-2"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
            }}
          >
            <Film className="w-8 h-8 mx-auto" style={{ color: theme.textMutedColor }} />
            <h4 className="text-xs font-semibold" style={{ color: theme.textColor }}>
              No recordings found
            </h4>
            <p className="text-[11px]" style={{ color: theme.textMutedColor }}>
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          filtered.map(rec => (
            <div
              key={rec.id}
              onClick={() => setActiveVideo(rec)}
              className="p-3 border transition-all cursor-pointer group hover:scale-[1.01] active:scale-[0.99] flex flex-col gap-2.5"
              style={{
                backgroundColor: theme.surfaceColor,
                borderColor: theme.borderColor,
                borderRadius: `${theme.borderRadius}px`,
                boxShadow: theme.cardStyle === 'soft-glow' ? `0 4px 15px ${theme.glowColor}` : undefined,
              }}
            >
              <div className="flex gap-3">
                {/* Thumbnail Preview */}
                <div className="w-24 h-16 rounded-lg overflow-hidden relative bg-black shrink-0 flex items-center justify-center">
                  <img
                    src={rec.thumbnailUrl}
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Scrim & Play overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
                      <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                  {/* Duration Chip */}
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 font-mono text-[9px] text-white font-bold">
                    {rec.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="text-xs font-bold truncate leading-tight" style={{ color: theme.textColor }}>
                      {rec.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono mt-1" style={{ color: theme.textMutedColor }}>
                      <span>{rec.resolution}</span>
                      <span>·</span>
                      <span>{rec.fileSizeFormatted}</span>
                    </div>
                  </div>

                  <span className="text-[10px]" style={{ color: theme.textMutedColor }}>
                    {rec.date}
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div 
                className="flex items-center justify-between pt-2 border-t text-xs"
                style={{ borderColor: theme.borderColor }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleFavorite(rec.id, e)}
                    className="flex items-center gap-1 text-[11px] transition-colors"
                    style={{ color: rec.isFavorite ? '#ef4444' : theme.textMutedColor }}
                  >
                    <Heart className={`w-3.5 h-3.5 ${rec.isFavorite ? 'fill-red-500' : ''}`} />
                    <span>{rec.isFavorite ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentScreen('editor');
                    }}
                    className="flex items-center gap-1 text-[11px] hover:underline"
                    style={{ color: theme.primaryColor }}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Clip</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(`Share link created for "${rec.title}"`);
                    }}
                    className="p-1 rounded-md text-neutral-400 hover:text-white"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => deleteRecording(rec.id, e)}
                    className="p-1 rounded-md text-neutral-400 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADMOB TEST BANNER: ca-app-pub-3940256099942544/6300978111 */}
      <AdMobBanner />

      {/* FULL VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-center p-4">
          <div 
            className="w-full max-w-lg mx-auto overflow-hidden shadow-2xl border flex flex-col"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            {/* Modal Header */}
            <div className="p-3 flex items-center justify-between border-b" style={{ borderColor: theme.borderColor }}>
              <div className="min-w-0 pr-2">
                <h3 className="text-xs font-bold truncate" style={{ color: theme.textColor }}>
                  {activeVideo.title}
                </h3>
                <span className="text-[10px] font-mono" style={{ color: theme.textMutedColor }}>
                  {activeVideo.resolution} · {activeVideo.fileSizeFormatted}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Action Strip */}
            <div className="p-3 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setActiveVideo(null);
                  setCurrentScreen('editor');
                }}
                className="flex-1 py-2 text-xs font-bold text-white rounded-lg flex items-center justify-center gap-1.5 shadow"
                style={{
                  backgroundColor: theme.primaryColor,
                  borderRadius: `${theme.borderRadius - 4}px`,
                }}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open in Trimmer</span>
              </button>
              <button
                onClick={() => {
                  showToast('Exporting to phone gallery...');
                }}
                className="py-2 px-4 text-xs font-semibold rounded-lg border flex items-center gap-1.5"
                style={{
                  borderColor: theme.borderColor,
                  color: theme.textColor,
                  borderRadius: `${theme.borderRadius - 4}px`,
                }}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
