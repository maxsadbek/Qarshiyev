export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { HomePage } from '@/screens/HomePage';

export const metadata: Metadata = {
  title: "QARSHIYEV SCHOOL | Premium Ta'lim Markazi",
  description:
    "2018-yilda tashkil etilgan QARSHIYEV SCHOOL Ta'lim Markazi — IELTS, CEFR, ingliz tili, ona tili va adabiyot, tarix va boshqa fanlardan yuqori natijalarga erishing.",

};

export default function Page() {
  return <HomePage />;
}

