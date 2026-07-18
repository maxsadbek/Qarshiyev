'use client';

import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import type { ReportConfig } from '../types';
import { downloadExport, generateReportFilename } from '../utils/export.helper';
import type { RegistrationData, CoursePopularityData, RegionData, TeacherPerformanceData, AnalyticsOverview } from '../types';

// ============================================================
// useExport Hook
// ============================================================
// TODO: Add export queue for large datasets
// TODO: Add progress tracking
// TODO: Add email export functionality

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportRegistrationData = useCallback(
    async (data: RegistrationData[], config: ReportConfig) => {
      setIsExporting(true);
      try {
        const exportData = data.map((item) => ({
          Sana: item.date,
          'Yangi ro‘yxatdan o‘tganlar': item.count,
        }));
        downloadExport(exportData, config, generateReportFilename(config.type));
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const exportCoursePopularity = useCallback(
    async (data: CoursePopularityData[], config: ReportConfig) => {
      setIsExporting(true);
      try {
        const exportData = data.map((item) => ({
          'Kurs nomi': item.name,
          'Talabalar soni': item.students,
          'Arizalar soni': item.applications,
        }));
        downloadExport(exportData, config, `course_popularity_${new Date().toISOString().split('T')[0]}`);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const exportRegionStatistics = useCallback(
    async (data: RegionData[], config: ReportConfig) => {
      setIsExporting(true);
      try {
        const exportData = data.map((item) => ({
          'Viloyat': item.name,
          'Talabalar soni': item.students,
          'Arizalar soni': item.applications,
        }));
        downloadExport(exportData, config, `region_statistics_${new Date().toISOString().split('T')[0]}`);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const exportTeacherPerformance = useCallback(
    async (data: TeacherPerformanceData[], config: ReportConfig) => {
      setIsExporting(true);
      try {
        const exportData = data.map((item) => ({
          "O'qituvchi": item.name,
          'Talabalar soni': item.students,
          'Reyting': item.rating,
          'Kurslar soni': item.courses,
        }));
        downloadExport(exportData, config, `teacher_performance_${new Date().toISOString().split('T')[0]}`);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const exportFullReport = useCallback(
    async (
      overview: AnalyticsOverview | null,
      registrations: RegistrationData[],
      courses: CoursePopularityData[],
      regions: RegionData[],
      teachers: TeacherPerformanceData[],
      config: ReportConfig
    ) => {
      setIsExporting(true);
      try {
        const workbook = XLSX.utils.book_new();

        // Overview sheet
        if (overview) {
          const overviewData = [
            { key: 'Jami talabalar', value: overview.totalStudents },
            { key: 'Jami arizalar', value: overview.totalApplications },
            { key: 'Kutilayotgan arizalar', value: overview.pendingApplications },
            { key: 'Qabul qilinganlar', value: overview.acceptedStudents },
            { key: 'Rad etilganlar', value: overview.rejectedStudents },
            { key: 'Faol kurslar', value: overview.activeCourses },
            { key: "Jami o'qituvchilar", value: overview.totalTeachers },
          ];
          const ws1 = XLSX.utils.json_to_sheet(overviewData);
          XLSX.utils.book_append_sheet(workbook, ws1, 'Umumiy');
        }

        // Registrations sheet
        const regData = registrations.map((item) => ({
          Sana: item.date,
          'Yangi ro‘yxatdan o‘tganlar': item.count,
        }));
        const ws2 = XLSX.utils.json_to_sheet(regData);
        XLSX.utils.book_append_sheet(workbook, ws2, 'Ro‘yxatdan o‘tish');

        // Courses sheet
        const courseData = courses.map((item) => ({
          'Kurs nomi': item.name,
          'Talabalar soni': item.students,
          'Arizalar soni': item.applications,
        }));
        const ws3 = XLSX.utils.json_to_sheet(courseData);
        XLSX.utils.book_append_sheet(workbook, ws3, 'Kurslar');

        // Regions sheet
        const regionData = regions.map((item) => ({
          'Viloyat': item.name,
          'Talabalar soni': item.students,
          'Arizalar soni': item.applications,
        }));
        const ws4 = XLSX.utils.json_to_sheet(regionData);
        XLSX.utils.book_append_sheet(workbook, ws4, 'Viloyatlar');

        // Teachers sheet
        const teacherData = teachers.map((item) => ({
          "O'qituvchi": item.name,
          'Talabalar soni': item.students,
          'Reyting': item.rating,
          'Kurslar soni': item.courses,
        }));
        const ws5 = XLSX.utils.json_to_sheet(teacherData);
        XLSX.utils.book_append_sheet(workbook, ws5, "O'qituvchilar");

        const filename = generateReportFilename(config.type);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return {
    isExporting,
    exportRegistrationData,
    exportCoursePopularity,
    exportRegionStatistics,
    exportTeacherPerformance,
    exportFullReport,
  };
}

