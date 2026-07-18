import type { GalleryCategory } from '../types';

export interface Achievement {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  category: GalleryCategory;
  date: string;
}

const filenames = [
  "5188275341036818928_119.jpg",
  "5197657172648959540.mp4",
  "5199908972462644233.mp4",
  "5203953946892217609.mp4",
  "5206278039595423018.mp4",
  "5246750499973139457.mp4",
  "5246750499973140208.mp4",
  "5296525765484681677_121.jpg",
  "5296525765484681682_119.jpg",
  "5296525765484682438_119.jpg",
  "5296525765484682445_119.jpg",
  "5296525765484682453_119.jpg",
  "5296525765484682458_119.jpg",
  "5296525765484682461_119.jpg",
  "5296525765484682463_119.jpg",
  "5296525765484682468_119.jpg",
  "5296525765484682479_119.jpg",
  "5296525765484682482_119.jpg",
  "5296525765484682491_119.jpg",
  "5305512808457901536_119.jpg",
  "5305512808457901878_121.jpg",
  "5305512808457901882_121.jpg",
  "5310172199430255512_121.jpg",
  "5310172199430255513_121.jpg",
  "5310172199430255514_120.jpg",
  "5310172199430255515_120.jpg",
  "5310172199430255532_121.jpg",
  "5310172199430255533_119.jpg",
  "5310172199430255534_121.jpg",
  "5310283086895906098_121.jpg",
  "5325642400591279740.mp4",
  "5334956179362802202_119.jpg",
  "5334956179362802203_119.jpg",
  "5334956179362802205_119.jpg",
  "5334956179362802206_119.jpg",
  "5334956179362802207_119.jpg",
  "5334956179362802208_119.jpg",
  "5334956179362802394_119.jpg",
  "5334956179362802395_119.jpg",
  "5334956179362802402_119.jpg",
  "5334956179362802403_121.jpg",
  "5334956179362802404_119.jpg",
  "5424769644487547954.mp4"
];

function isVideo(name: string): boolean {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(name);
}

const sortedNames = filenames.sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true })
);

export const achievementItems: Achievement[] = sortedNames.map((fileName, i) => {
  const type = isVideo(fileName) ? 'video' : 'image';
  return {
    id: `ach-${i + 1}`,
    type,
    src: `/assets/o'quvchilar-natijasi/${fileName}`,
    title: fileName.replace(/\.[^.]+$/, ''),
    category: type === 'video' ? 'Awards' : 'Graduates',
    date: '2026-01-01',
  };
});

export const achievementVideos = achievementItems.filter((i) => i.type === 'video');
export const achievementImages = achievementItems.filter((i) => i.type === 'image');

export const achievementFilter = ['Hammasi', 'Videolar', 'Rasmlar'] as const;
export type AchievementFilter = (typeof achievementFilter)[number];

