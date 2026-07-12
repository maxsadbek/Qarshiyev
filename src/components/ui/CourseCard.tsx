import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/utils';
import type { Course } from '@/types';

export const CourseCard: React.FC<{ course: Course; className?: string }> = ({
  course,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full ${className ?? ''}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="gold">{course.category}</Badge>
          {course.featured && <Badge variant="dark">Tavsiya Etilgan</Badge>}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} fill="#f59e0b" className="text-violet-400" />
            <span className="text-white text-xs font-semibold">{course.rating}</span>
            <span className="text-white/60 text-xs">({course.reviewCount})</span>
          </div>
          <Badge variant="dark">{course.level}</Badge>
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

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            {course.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-950 text-sm">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="text-slate-400 text-xs line-through">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-slate-950 text-sm">{formatPrice(course.price)}</span>
            )}
            <div className="text-slate-400 text-xs mt-0.5">{course.schedule}</div>
          </div>
          <Link to="/contact">
            <button className="bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-violet-600 transition-colors">
              Ro'yxatdan O'tish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
