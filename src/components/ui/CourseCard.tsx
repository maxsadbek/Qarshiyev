import React from 'react';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Course } from '@/types';

export const CourseCard: React.FC<{ course: Course; className?: string }> = ({
  course,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full ${className ?? ''}`}
    >
      {/* Header (text-based, no image) */}
      <div className="relative bg-gradient-to-br from-slate-950 to-violet-950 p-5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_top_right,theme(colors.violet.400),transparent_60%)]" />
        <div className="relative flex items-center justify-between gap-2">
          <Badge variant="gold">{course.category}</Badge>
          <div className="flex items-center gap-2">
            {course.featured && <Badge variant="dark">Tavsiya Etilgan</Badge>}
            <Badge variant="dark">{course.level}</Badge>
          </div>
        </div>
        <p className="relative text-slate-300 text-sm leading-relaxed mt-4 line-clamp-4">
          {course.description}
        </p>
        <div className="relative flex items-center gap-1 mt-3">
          <Star size={13} fill="#f59e0b" className="text-amber-400" />
          <span className="text-white text-xs font-semibold">{course.rating}</span>
          <span className="text-white/60 text-xs">({course.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-slate-400 text-xs font-medium">{course.instructor}</span>
        </div>

        <h3 className="font-serif font-bold text-slate-950 text-lg leading-snug mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={13} />
            <span>{course.lessons} dars</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* CTA Button */}
        <div className="mt-auto flex justify-center">
          <a
            href="https://telegram.me/SIROJIDDIN_QARSHIYEV"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-violet-500 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/25">
              Bog'lanish
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

