import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { videos } from '@/data/videos';
import { getYouTubeId } from '@/utils';

export const VideoExperience: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  const featured = videos.find((v) => v.featured && v.category === 'Presentation');
  const others = videos.filter((v) => v.id !== featured?.id).slice(0, 4);

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Media"
            title="Stories That"
            titleAccent="Inspire"
            description="Watch our center presentation, teacher introductions, student success stories, and parent testimonials."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured large video */}
          {featured && (
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <VideoCard video={featured} large onPlay={setActiveVideo} />
            </motion.div>
          )}

          {/* Side videos */}
          <StaggerContainer className="flex flex-col gap-4">
            {others.slice(0, 3).map((v) => (
              <StaggerItem key={v.id}>
                <VideoCard video={v} onPlay={setActiveVideo} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Video Modal */}
      <Modal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)} size="xl" showClose title={activeVideo?.title}>
        <div className="p-4">
          {activeVideo && (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              {activeVideo.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.url)}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={activeVideo.title}
                />
              ) : (
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>
          )}
          {activeVideo?.description && (
            <p className="text-slate-500 text-sm mt-4 px-2 pb-2">{activeVideo.description}</p>
          )}
        </div>
      </Modal>
    </section>
  );
};

const VideoCard: React.FC<{
  video: typeof videos[0];
  large?: boolean;
  onPlay: (v: typeof videos[0]) => void;
}> = ({ video, large = false, onPlay }) => {
  const ytId = getYouTubeId(video.url);
  const thumbnail = ytId
    ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
    : video.thumbnail;

  return (
    <motion.div
      className={`relative group rounded-xl overflow-hidden bg-slate-950 cursor-pointer ${large ? 'aspect-video' : 'h-36'}`}
      whileHover={{}}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPlay(video)}
      aria-label={`Play ${video.title}`}
    >
      <img
        src={thumbnail || video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`rounded-full bg-violet-500/30 backdrop-blur-md border border-white/30 shadow-lg shadow-violet-500/40 flex items-center justify-center text-white transition-colors ${large ? 'w-16 h-16' : 'w-10 h-10'}`}
          whileHover={{ backgroundColor: 'rgba(139,92,246,0.5)' }}
          transition={{ duration: 0.2 }}
        >
          <Play size={large ? 22 : 14} fill="white" />
        </motion.div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Badge variant="gold" size="sm">{video.category}</Badge>
            {large && (
              <h3 className="text-white font-serif font-bold text-xl mt-2 leading-tight line-clamp-2">
                {video.title}
              </h3>
            )}
            {!large && (
              <p className="text-white text-xs font-semibold mt-1 line-clamp-1">{video.title}</p>
            )}
          </div>
          {large && video.views && (
            <div className="flex items-center gap-1 text-white/60 text-xs shrink-0">
              <Eye size={12} />
              <span>{(video.views / 1000).toFixed(1)}K</span>
            </div>
          )}
        </div>
        {large && (
          <div className="flex items-center gap-3 mt-2 text-white/50 text-xs">
            <span>{video.duration}</span>
            <span>·</span>
            <span>{video.category}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
