import { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  AnalyticsFilters, 
  RegistrationData, 
  TimePeriod,
  AnalyticsOverview,
  CoursePopularityData,
  RegionData,
  DistrictData,
  TeacherPerformanceData,
  AcceptanceRateData,
  StudentGrowthData,
  ApplicationStatusData,
} from '../types';
import { analyticsService } from '../services/analytics.service';
import { DEFAULT_FILTERS } from '../utils/constants';

// ============================================================
// useAnalyticsData Hook
// ============================================================
// TODO: Add React Query integration for caching and background refetching
// TODO: Add optimistic updates for filter changes
// TODO: Add error boundaries and retry logic

export function useAnalyticsData(filters: AnalyticsFilters) {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [dailyRegistrations, setDailyRegistrations] = useState<RegistrationData[]>([]);
  const [weeklyRegistrations, setWeeklyRegistrations] = useState<RegistrationData[]>([]);
  const [monthlyRegistrations, setMonthlyRegistrations] = useState<RegistrationData[]>([]);
  const [coursePopularity, setCoursePopularity] = useState<CoursePopularityData[]>([]);
  const [regionStatistics, setRegionStatistics] = useState<RegionData[]>([]);
  const [districtStatistics, setDistrictStatistics] = useState<DistrictData[]>([]);
  const [teacherPerformance, setTeacherPerformance] = useState<TeacherPerformanceData[]>([]);
  const [acceptanceRate, setAcceptanceRate] = useState<AcceptanceRateData[]>([]);
  const [studentGrowth, setStudentGrowth] = useState<StudentGrowthData[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatusData[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        overviewData,
        dailyData,
        weeklyData,
        monthlyData,
        courseData,
        regionData,
        districtData,
        teacherData,
        acceptanceData,
        growthData,
        statusData,
      ] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getDailyRegistrations(30),
        analyticsService.getWeeklyRegistrations(12),
        analyticsService.getMonthlyRegistrations(12),
        analyticsService.getCoursePopularity(),
        analyticsService.getRegionStatistics(),
        analyticsService.getDistrictStatistics(filters.region),
        analyticsService.getTeacherPerformance(),
        analyticsService.getAcceptanceRate(),
        analyticsService.getStudentGrowth(),
        analyticsService.getApplicationStatus(),
      ]);

      setOverview(overviewData);
      setDailyRegistrations(dailyData);
      setWeeklyRegistrations(weeklyData);
      setMonthlyRegistrations(monthlyData);
      setCoursePopularity(courseData);
      setRegionStatistics(regionData);
      setDistrictStatistics(districtData);
      setTeacherPerformance(teacherData);
      setAcceptanceRate(acceptanceData);
      setStudentGrowth(growthData);
      setApplicationStatus(statusData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ma‘lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [filters.region]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const timePeriodData = useMemo(() => {
    switch (filters.timePeriod) {
      case 'daily':
        return dailyRegistrations;
      case 'weekly':
        return weeklyRegistrations;
      case 'monthly':
        return monthlyRegistrations;
      default:
        return dailyRegistrations;
    }
  }, [filters.timePeriod, dailyRegistrations, weeklyRegistrations, monthlyRegistrations]);

  return {
    overview,
    dailyRegistrations,
    weeklyRegistrations,
    monthlyRegistrations,
    coursePopularity,
    regionStatistics,
    districtStatistics,
    teacherPerformance,
    acceptanceRate,
    studentGrowth,
    applicationStatus,
    timePeriodData,
    isLoading,
    error,
    refetch: fetchAll,
  };
}
