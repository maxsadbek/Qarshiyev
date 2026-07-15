import type { GalleryCategory } from '../types';

const modules = import.meta.glob('@/assets/o\'quvchilar-natijasi/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export interface Achievement {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  category: GalleryCategory;
  date: string;
}

function getFileName(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1] ?? path;
}

function isVideo(name: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(name);
}

const sortedPaths = Object.keys(modules).sort((a, b) =>
  getFileName(a).localeCompare(getFileName(b), undefined, { numeric: true })
);

export const achievementItems: Achievement[] = sortedPaths.map((path, i) => {
  const fileName = getFileName(path);
  const type = isVideo(fileName) ? 'video' : 'image';
  return {
    id: `ach-${i + 1}`,
    type,
    src: modules[path],
    title: fileName.replace(/\.[^.]+$/, ''),
    category: type === 'video' ? 'Awards' : 'Graduates',
    date: '2026-01-01',
  };
});

export const achievementVideos = achievementItems.filter((i) => i.type === 'video');
export const achievementImages = achievementItems.filter((i) => i.type === 'image');

export const achievementFilter = ['Hammasi', 'Videolar', 'Rasmlar'] as const;
export type AchievementFilter = (typeof achievementFilter)[number];
