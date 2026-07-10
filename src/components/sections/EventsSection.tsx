import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { events } from '@/data/events';
import { getDayOfMonth, getMonthAbbr } from '@/utils';

export const EventsSection: React.FC = () => {
  const featuredEvents = events.filter((e) => e.featured).slice(0, 3);

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
            overline="Keladigan Tadbirlar"
            title="Bizning"
            titleAccent="Jamiyatimizga Qo'shiling"
            description="Akademik workshoplardan madaniy bayramlargacha — bu oy Qarshiyev Ta'lim Markazida nima bo'layotganini kashf eting."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{}}
            >
              {/* Image & Date Badge */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={event.isFree ? 'green' : 'gold'}>
                    {event.isFree ? 'Free Entry' : 'Ticketed'}
                  </Badge>
                </div>
                {/* Date Calendar Icon */}
                <div className="absolute -bottom-6 right-6 w-16 h-18 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center border border-slate-100 z-10 overflow-hidden">
                  <div className="bg-violet-500 text-white w-full text-center text-[10px] font-bold py-1 uppercase tracking-wider">
                    {getMonthAbbr(event.date)}
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-950 flex-1 flex items-center">
                    {getDayOfMonth(event.date)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-8 flex-1 flex flex-col">
                <div className="text-violet-500 text-xs font-bold uppercase tracking-wider mb-2">
                  {event.category}
                </div>
                
                <h3 className="font-serif font-bold text-slate-950 text-xl leading-tight mb-4 group-hover:text-violet-600 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1">
                  {event.shortDescription}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Clock size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <span>{event.time} {event.endTime ? `– ${event.endTime}` : ''}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/events">
            <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
              View Event Calendar
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
