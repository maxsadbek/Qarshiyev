import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Monitor, BookOpen, Coffee, Users, Wifi } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Hotspot {
  id: string;
  x: number; // percentage left
  y: number; // percentage top
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'reception',
    x: 20, y: 45,
    label: 'Reception',
    description: 'Our welcoming reception desk where our friendly staff greets every student and parent. Enrollment, scheduling, and general inquiries are all handled here.',
    icon: <Users size={16} />,
    color: 'bg-violet-500',
  },
  {
    id: 'classroom',
    x: 50, y: 35,
    label: 'Main Classroom',
    description: 'A premium, air-conditioned classroom with interactive whiteboards, ergonomic seating for 12 students, and state-of-the-art audio systems for listening practice.',
    icon: <Monitor size={16} />,
    color: 'bg-violet-500',
  },
  {
    id: 'computer',
    x: 75, y: 40,
    label: 'Computer Room',
    description: '40 high-performance workstations with licensed IELTS, TOEFL, and Cambridge practice software. Dedicated headsets and noise-canceling microphones for speaking practice.',
    icon: <Monitor size={16} />,
    color: 'bg-violet-500',
  },
  {
    id: 'library',
    x: 35, y: 65,
    label: 'Academic Library',
    description: 'Over 2,000 academic books, IELTS & Cambridge prep materials, reference guides, and study resources. Quiet study area with comfortable reading chairs.',
    icon: <BookOpen size={16} />,
    color: 'bg-violet-500',
  },
  {
    id: 'lounge',
    x: 65, y: 70,
    label: 'Student Lounge',
    description: 'A relaxed social space with complimentary Wi-Fi, charging stations, and a comfortable area for students to study, relax, or connect between classes.',
    icon: <Coffee size={16} />,
    color: 'bg-violet-500',
  },
  {
    id: 'wifi',
    x: 85, y: 25,
    label: 'Rooftop Terrace',
    description: 'Our open-air rooftop terrace — a favorite spot for speaking clubs, group study sessions, and social events. Beautiful views of Qarshi city.',
    icon: <Wifi size={16} />,
    color: 'bg-violet-500',
  },
];

// Panorama placeholder image (equirectangular style)
const PANORAMA_PLACEHOLDER =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=4096&q=90';

export const VirtualTour: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple panorama drag effect
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX - offset;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX.current;
    setOffset(Math.max(-600, Math.min(0, newOffset)));
  };
  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Virtual Tour"
            title="Explore Our"
            titleAccent="Campus"
            description="Take an interactive virtual tour of Qarshiyev Education Center. Click on the hotspots to discover each space."
          />
        </motion.div>

        {/* Tour container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-xl overflow-hidden bg-slate-950 shadow-2xl"
          style={{ height: '520px' }}
        >
          {/* Panorama image (simulated drag) */}
          <div
            ref={containerRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ width: '200%', left: offset }}
              animate={{ left: offset }}
              transition={{ type: 'tween', duration: isDragging ? 0 : 0.3 }}
            >
              <img
                src={PANORAMA_PLACEHOLDER}
                alt="Virtual tour of Qarshiyev Education Center"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-950/30" />
            </motion.div>
          </div>

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <motion.button
              key={spot.id}
              className="absolute z-10 group"
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              aria-label={`View ${spot.label} information`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Pulse rings */}
              <motion.div
                className={`absolute inset-0 rounded-full ${spot.color} opacity-30`}
                animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full ${spot.color} opacity-20`}
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />

              {/* Dot */}
              <div
                className={`relative w-10 h-10 rounded-full ${spot.color} text-white flex items-center justify-center shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform`}
              >
                {spot.icon}
              </div>

              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-950 text-xs font-semibold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {spot.label}
              </div>
            </motion.button>
          ))}

          {/* Info overlay */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                key={activeHotspot.id}
                className="absolute bottom-5 left-5 right-5 md:left-auto md:right-5 md:w-80 bg-white rounded-lg shadow-2xl p-5 z-20"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${activeHotspot.color} text-white flex items-center justify-center`}>
                    {activeHotspot.icon}
                  </div>
                  <h4 className="font-serif font-bold text-slate-950">{activeHotspot.label}</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{activeHotspot.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full">
            <MapPin size={13} className="text-violet-400" />
            <span>Drag to explore · Click hotspots to discover</span>
          </div>

          {/* Replace image notice */}
          <div className="absolute top-5 right-5 bg-violet-500/90 text-white text-xs px-3 py-1.5 rounded-full font-medium">
            📸 Replace with 360° panorama
          </div>
        </motion.div>

        {/* Hotspot legend */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(spot)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeHotspot?.id === spot.id
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${spot.color}`} />
              {spot.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
