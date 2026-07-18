export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { ProfilePage } from '@/screens/ProfilePage';

export const metadata: Metadata = {
  title: 'Kabinet | Qarshiyev',
  description: 'Shaxsiy kabinetingiz — kurs natijalari, profil ma\'lumotlari va boshqalar.',
};

export default function Page() {
  return <ProfilePage />;
}

