export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { HomePage } from '@/screens/HomePage';

export const metadata: Metadata = {
  title: 'Qarshiyev Education Center | Premium Language & Academic Hub',
  description:
    "Unlock your global potential with Qarshi's premier education center. Specialized in IELTS, General English, and SAT preparation with internationally certified instructors.",
};

export default function Page() {
  return <HomePage />;
}

