import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
}

function NavLink({ href, icon, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150 font-medium"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">

      {/* ── Top Navigation Bar ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">Q</div>
            <span className="font-bold text-lg tracking-tight">My Panel</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/student" icon="🏠" label="Dashboard" />
            <NavLink href="/student/application" icon="📋" label="Application" />
            <NavLink href="/student/notifications" icon="🔔" label="Notifications" />
            <NavLink href="/student/settings" icon="⚙️" label="Settings" />
          </nav>

          <Link
            href="/student/login"
            className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* ── Mobile Bottom Navigation ────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-around h-16">
        <Link href="/student" className="flex flex-col items-center gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="text-xl">🏠</span> Home
        </Link>
        <Link href="/student/application" className="flex flex-col items-center gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="text-xl">📋</span> Application
        </Link>
        <Link href="/student/notifications" className="flex flex-col items-center gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="text-xl">🔔</span> Alerts
        </Link>
        <Link href="/student/settings" className="flex flex-col items-center gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="text-xl">⚙️</span> Settings
        </Link>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}

