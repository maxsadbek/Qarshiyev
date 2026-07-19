'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, FileText, Clock, CheckCircle2, XCircle,
  BookOpen, GraduationCap, BarChart3,
} from 'lucide-react';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useExport } from '../hooks/useExport';
import { StatCard, FilterBar, GlobalSearch, ExportButtons, ChartsSection } from '../components';
import { useAuth } from '@/context/AuthContext';
import type { AnalyticsFilters, TimePeriod, SearchResult } from '../types';

// ============================================================
// Analytics Page
// ============================================================
// TODO: Add server-side data fetching with pagination
// TODO: Add real-time data updates via Supabase realtime
// TODO: Add print/PDF generation
// TODO: Add scheduled reports via email
// TODO: Add role-based data filtering (teacher sees only own students)

export const AnalyticsPage: React.FC = () => {
  useEffect(() => { document.title = 'Analitika | Qarshiyev'; }, []);
  const { user } = useAuth();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
  });
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');

  const { overview, timePeriodData, coursePopularity, regionStatistics, districtStatistics,
          teacherPerformance, acceptanceRate, studentGrowth, applicationStatus,
          isLoading, error, refetch } = useAnalyticsData(filters);
  const { isExporting, exportFullReport } = useExport();

  const handleSearchResult = (result: SearchResult) => {
    // TODO: Navigate to relevant page or open detail modal
    console.log('Search result clicked:', result);
  };

  const handleExport = (config: { type: 'daily' | 'weekly' | 'monthly' | 'custom'; format: 'xlsx' | 'csv' }) => {
    if (!overview) return;
    exportFullReport(
      overview,
      timePeriodData,
      coursePopularity,
      regionStatistics,
      teacherPerformance,
      { ...config, dateRange: filters.dateRange }
    );
  };

  // ============================================================
  // Statistics Cards
  // ============================================================
  const statCards = useMemo(() => {
    if (!overview) return [];
    return [
      {
        title: "Jami talabalar",
        value: overview.totalStudents.toLocaleString(),
        icon: Users,
        color: 'violet' as const,
      },
      {
        title: "Jami arizalar",
        value: overview.totalApplications.toLocaleString(),
        icon: FileText,
        color: 'blue' as const,
      },
      {
        title: "Kutilayotgan arizalar",
        value: overview.pendingApplications.toLocaleString(),
        icon: Clock,
        color: 'amber' as const,
      },
      {
        title: "Qabul qilinganlar",
        value: overview.acceptedStudents.toLocaleString(),
        icon: CheckCircle2,
        color: 'emerald' as const,
      },
      {
        title: "Rad etilganlar",
        value: overview.rejectedStudents.toLocaleString(),
        icon: XCircle,
        color: 'rose' as const,
      },
      {
        title: "Faol kurslar",
        value: overview.activeCourses.toLocaleString(),
        icon: BookOpen,
        color: 'violet' as const,
      },
      {
        title: "Jami o'qituvchilar",
        value: overview.totalTeachers.toLocaleString(),
        icon: GraduationCap,
        color: 'emerald' as const,
      },
    ];
  }, [overview]);

  // ============================================================
  // Today's Stats
  // ============================================================
  const todayStat = useMemo(() => {
    const today = timePeriodData.find((d) => d.date === new Date().toISOString().split('T')[0]);
    return today?.count || 0;
  }, [timePeriodData]);

  const weekStat = useMemo(() => {
    return timePeriodData.slice(-7).reduce((sum, d) => sum + d.count, 0);
  }, [timePeriodData]);

  const monthStat = useMemo(() => {
    return timePeriodData.reduce((sum, d) => sum + d.count, 0);
  }, [timePeriodData]);

  const conversionRate = useMemo(() => {
    if (!overview || overview.totalApplications === 0) return 0;
    return Math.round((overview.acceptedStudents / overview.totalApplications) * 100);
  }, [overview]);

  // ============================================================
  // Authorization Guard
  // ============================================================
  if (!user) {
    return null;
  }

  // ============================================================
  // Loading State
  // ============================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // Error State
  // ============================================================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-rose-600 font-medium mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Qayta yuklash
          </button>
        </div>
      </div>
    );
  }



  return (
    <main className="min-h-screen bg-slate-50">
        {/* ===== HEADER ===== */}
        <div className="bg-slate-950 text-white">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                    <BarChart3 size={20} />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">Analitika va Hisobotlar</h1>
                </div>
                <p className="text-slate-400 text-sm">
                  Tizimning to‘liq tahlili va statistikalari
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GlobalSearch onResultClick={handleSearchResult} />
                <ExportButtons onExport={handleExport} isExporting={isExporting} />
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="container-custom py-8 space-y-6">
          {/* Filters */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            timePeriod={timePeriod}
            onTimePeriodChange={setTimePeriod}
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <p className="text-xs font-medium text-slate-500 mb-1">Bugun</p>
              <p className="text-xl font-bold text-slate-900">{todayStat}</p>
              <p className="text-xs text-slate-500">talaba</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <p className="text-xs font-medium text-slate-500 mb-1">Bu hafta</p>
              <p className="text-xl font-bold text-slate-900">{weekStat}</p>
              <p className="text-xs text-slate-500">talaba</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <p className="text-xs font-medium text-slate-500 mb-1">Bu oy</p>
              <p className="text-xl font-bold text-slate-900">{monthStat}</p>
              <p className="text-xs text-slate-500">talaba</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <p className="text-xs font-medium text-slate-500 mb-1">Konversiya</p>
              <p className="text-xl font-bold text-slate-900">{conversionRate}%</p>
              <p className="text-xs text-slate-500">qabul darajasi</p>
            </motion.div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <StatCard key={card.title} data={card} index={index} />
            ))}
          </div>

          {/* Acceptance/Rejection/Pending Percentages */}
          {overview && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Qabul %</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                      {overview.totalApplications > 0
                        ? Math.round((overview.acceptedStudents / overview.totalApplications) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-emerald-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Kutish %</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">
                      {overview.totalApplications > 0
                        ? Math.round((overview.pendingApplications / overview.totalApplications) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock size={24} className="text-amber-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Rad etish %</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">
                      {overview.totalApplications > 0
                        ? Math.round((overview.rejectedStudents / overview.totalApplications) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                    <XCircle size={24} className="text-rose-600" />
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Charts */}
          <ChartsSection
            dailyRegistrations={timePeriodData}
            weeklyRegistrations={timePeriodData}
            monthlyRegistrations={timePeriodData}
            coursePopularity={coursePopularity}
            regionStatistics={regionStatistics}
            districtStatistics={districtStatistics}
            teacherPerformance={teacherPerformance}
            acceptanceRate={acceptanceRate}
            studentGrowth={studentGrowth}
            applicationStatus={applicationStatus}
            timePeriod={timePeriod}
            selectedRegion={filters.region}
          />
        </div>
      </main>
  );
};

