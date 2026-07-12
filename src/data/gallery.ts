import type { GalleryItem } from '../types';

import img1 from '@/assets/gallery/5287239582334263299_119.jpg';
import img2 from '@/assets/gallery/5287239582334263301_119.jpg';
import img3 from '@/assets/gallery/5287239582334263302_119.jpg';
import img4 from '@/assets/gallery/5287239582334263303_121.jpg';
import img5 from '@/assets/gallery/5287239582334263304_121.jpg';
import img6 from '@/assets/gallery/5287239582334263305_121.jpg';
import img7 from '@/assets/gallery/5287239582334263307_121.jpg';

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: img1,
    title: 'Modern Classroom Environment',
    category: 'Classrooms',
    date: '2026-04-10',
  },
  {
    id: '2',
    type: 'image',
    src: img2,
    title: 'Interactive Learning Sessions',
    category: 'Classrooms',
    date: '2026-03-22',
  },
  {
    id: '3',
    type: 'image',
    src: img3,
    title: 'Graduation Ceremony 2025',
    category: 'Graduates',
    date: '2025-09-15',
  },
  {
    id: '4',
    type: 'image',
    src: img4,
    title: 'Open Day — Summer 2025',
    category: 'Events',
    date: '2025-07-02',
  },
  {
    id: '5',
    type: 'image',
    src: img5,
    title: 'Teacher Development Workshop',
    category: 'Teachers',
    date: '2025-11-10',
  },
  {
    id: '6',
    type: 'image',
    src: img6,
    title: 'Our Academic Library',
    category: 'Campus',
    date: '2026-01-20',
  },
  {
    id: '7',
    type: 'image',
    src: img7,
    title: 'IELTS Writing Workshop',
    category: 'Events',
    date: '2026-05-18',
  },
];

export const galleryCategories = ['All', 'Classrooms', 'Events', 'Graduates', 'Teachers', 'Campus', 'Awards'] as const;
