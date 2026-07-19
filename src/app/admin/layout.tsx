import React from 'react';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">Overview</Link>
          <Link href="/admin/students" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">Students</Link>
          <Link href="/admin/applications" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">Applications</Link>
          <Link href="/student" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">Student Panel</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <LogoutButton className="text-sm px-3 py-1 rounded border border-red-300 dark:border-red-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition cursor-pointer" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      
    </div>
  );
}

