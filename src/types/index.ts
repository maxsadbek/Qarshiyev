// ============================================================
// CORE TYPES — Education Center Website
// ============================================================

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  image: string;
  instructor: string;
  instructorAvatar: string;
  description: string;
  shortDescription: string;
  tags: string[];
  featured: boolean;
  startDate: string;
  schedule: string;
  language: string;
  certificate: boolean;
}

export type CourseCategory =
  | 'IELTS'
  | 'TOEFL'
  | 'SAT'
  | 'English'
  | 'Math'
  | 'Science'
  | 'Programming'
  | 'Business'
  | 'Tarix'
  | 'Ona tili va adabiyot';

export type CourseLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'All Levels'
  | 'Boshlang\'ich (Beginner)'
  | 'O\'rta (Intermediate)'
  | 'Mukammal (Advanced)';

// ============================================================

export interface Teacher {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialization: string[];
  experience: number;
  students: number;
  rating: number;
  bio: string;
  shortBio: string;
  avatar: string;
  coverImage?: string;
  certificates: Certificate[];
  socialLinks: SocialLinks;
  introVideoUrl?: string;
  featured: boolean;
  languages: string[];
  achievements: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: number;
  image?: string;
}

export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
  twitter?: string;
}

// ============================================================

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title: string;
  category: GalleryCategory;
  date: string;
  width?: number;
  height?: number;
}

export type GalleryCategory =
  | 'All'
  | 'Classrooms'
  | 'Events'
  | 'Graduates'
  | 'Teachers'
  | 'Campus'
  | 'Awards';

// ============================================================

export interface Video {
  id: string;
  title: string;
  description: string;
  type: 'youtube' | 'local' | 'vimeo';
  url: string;
  thumbnail: string;
  duration: string;
  category: VideoCategory;
  featured: boolean;
  date: string;
  views?: number;
}

export type VideoCategory =
  | 'Presentation'
  | 'Teacher Introduction'
  | 'Student Success'
  | 'Parent Testimonial'
  | 'Event Recap';

// ============================================================

export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: string;
  description?: string;
}

// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  relation: 'Student' | 'Parent' | 'Graduate';
  rating: number;
  review: string;
  course?: string;
  date: string;
  featured: boolean;
}

// ============================================================

export interface StudentResult {
  id: string;
  name: string;
  avatar: string;
  score: string;
  exam: 'IELTS' | 'TOEFL' | 'SAT' | 'CEFR' | 'Cambridge';
  cefrLevel?: string;
  university?: string;
  country?: string;
  certificate?: string;
  achievement: string;
  year: number;
  course: string;
  beforeScore?: string;
  improvement?: string;
}

// ============================================================

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  description: string;
  shortDescription: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  image: string;
  isFree: boolean;
  price?: number;
  capacity?: number;
  registered?: number;
  speaker?: string;
  featured: boolean;
  tags: string[];
}

export type EventCategory =
  | 'Open Day'
  | 'Workshop'
  | 'Seminar'
  | 'Exam Prep'
  | 'Award Ceremony'
  | 'Cultural'
  | 'Online'
  | 'Ochiq Eshiklar Kuni'
  | 'Imtihon Tayyorgarligi'
  | 'Mukofot Marosimi'
  | 'Madaniy';

// ============================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  thumbnail: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
}

export type BlogCategory =
  | 'IELTS Tips'
  | 'Study Abroad'
  | 'Language Learning'
  | 'Student Life'
  | 'Career Advice'
  | 'News'
  | 'Success Stories'
  | 'Barchasi'
  | 'IELTS Maslahatlari'
  | 'Xorijda O\'qish'
  | 'Til O\'rganish'
  | 'O\'quvchi Hayoti'
  | 'Karyera Maslahati'
  | 'Yangiliklar'
  | 'Muvaffaqiyat Tarixi';

// ============================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | 'General'
  | 'Courses'
  | 'Enrollment'
  | 'Fees & Payment'
  | 'Certificates'
  | 'Schedule';

// ============================================================

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  type: 'University' | 'Publisher' | 'Sponsor' | 'Media' | 'Government';
}

// ============================================================

export interface HotSpot {
  id: string;
  yaw: number;
  pitch: number;
  label: string;
  description: string;
  icon: string;
  image?: string;
}

// ============================================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  course?: string;
}

// ============================================================

export interface WhyChooseItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  stat?: string;
}

// ============================================================
// AUTH / USER
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  location?: string;
  bio?: string;
  birthDate?: string;
  joinedDate: string;
  role: 'student' | 'admin';
  enrolledCourses: string[];
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}
