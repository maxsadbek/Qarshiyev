// ============================================================
// Analytics Types
// ============================================================

export interface AnalyticsFilters {
  dateRange: {
    start: string;
    end: string;
  };
  course?: string;
  region?: string;
  district?: string;
  teacher?: string;
  status?: string;
  language?: string;
  search?: string;
  timePeriod?: TimePeriod;
}

export interface DateRangePreset {
  label: string;
  value: string;
  start: Date;
  end: Date;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: 'violet' | 'emerald' | 'amber' | 'rose' | 'blue' | 'slate';
}

export interface RegistrationData {
  date: string;
  count: number;
}

export interface CoursePopularityData {
  name: string;
  students: number;
  applications: number;
}

export interface RegionData {
  name: string;
  students: number;
  applications: number;
}

export interface DistrictData {
  name: string;
  students: number;
}

export interface TeacherPerformanceData {
  name: string;
  students: number;
  rating: number;
  courses: number;
}

export interface AcceptanceRateData {
  name: string;
  accepted: number;
  rejected: number;
  pending: number;
}

export interface StudentGrowthData {
  month: string;
  total: number;
  new: number;
}

export interface ApplicationStatusData {
  status: 'pending' | 'accepted' | 'rejected';
  count: number;
}

export interface AnalyticsOverview {
  totalStudents: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedStudents: number;
  rejectedStudents: number;
  activeCourses: number;
  totalTeachers: number;
}

export interface ReportConfig {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  dateRange: {
    start: string;
    end: string;
  };
  format: 'xlsx' | 'csv';
}

export interface SearchResult {
  id: string;
  type: 'student' | 'teacher' | 'course';
  name: string;
  subtitle: string;
  url?: string;
}

export type TimePeriod = 'daily' | 'weekly' | 'monthly';

