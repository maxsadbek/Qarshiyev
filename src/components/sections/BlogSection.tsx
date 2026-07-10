import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { blogPosts } from '@/data/blog';
import { formatShortDate } from '@/utils';

export const BlogSection: React.FC = () => {
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 3);

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
            overline="So'nggi Yangiliklar va Maslahatlar"
            title="Tushunchalar va"
            titleAccent="Yangilanishlar"
            description="Til o'rganish bo'yicha mutaxassis maslahatlar, imtihon tayyorgarligi strategiyalari va bizning ta'lim markazimizdan yangiliklar."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{}}
            >
              <Link to={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden shrink-0">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{post.category}</Badge>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-violet-500" />
                    <span>{formatShortDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-violet-500" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <Link to={`/blog/${post.slug}`} className="block mb-3">
                  <h3 className="font-serif font-bold text-slate-950 text-xl leading-snug group-hover:text-violet-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-slate-950">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-500 group-hover:text-white transition-colors"
                  >
                    <ArrowRight size={14} />
                  </Link>
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
          <Link to="/blog">
            <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
              Read More Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
