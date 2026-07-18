import type {
  AnalyticsOverview,
  RegistrationData,
  CoursePopularityData,
  RegionData,
  DistrictData,
  TeacherPerformanceData,
  AcceptanceRateData,
  StudentGrowthData,
  ApplicationStatusData,
} from '../types';
import { teachers } from '@/data/teachers';
import { courses } from '@/data/courses';
import dayjs from 'dayjs';

// ============================================================
// Analytics Service
// ============================================================
// TODO: Replace mock data with real Prisma queries
// TODO: Add pagination support for large datasets
// TODO: Add caching layer (Redis / in-memory) for expensive queries
// TODO: Add query optimization and indexing hints

const REGIONS = [
  'Toshkent', 'Samarqand', 'Buxoro', 'Xorazm', 'Qashqadaryo',
  "Farg'ona", 'Andijon', 'Namangan', 'Sirdaryo', 'Jizzax', 'Navoiy', "Qoraqalpog'iston"
];

const DISTRICTS: Record<string, string[]> = {
  'Toshkent': ['Uchtepa', 'Yunusabad', 'Mirzo Ulug‘bek', 'Chilonzor', 'Sergeli'],
  'Samarqand': ['Samarqand shahar', "Urgut", 'Kattaqo‘rg‘on', 'Nurobod'],
  'Buxoro': ['Buxoro shahar', "Kogon", 'Peshku', 'Jondor'],
  'Xorazm': ["Urganch", 'Xiva', 'Hazorasp', 'Yangibozor'],
  'Qashqadaryo': ['Qarshi', 'Koson', 'Shahrisabz', 'Kitob'],
  "Farg'ona": ["Farg'ona shahar", 'Quvasoy', 'Qo‘qon', 'Marg‘ilon'],
  'Andijon': ['Andijon shahar', 'Asaka', 'Shahrixon', 'Xo‘jaobod'],
  'Namangan': ['Namangan shahar', 'Chust', 'Kosonsoy', 'Uchqorgon'],
  'Sirdaryo': ['Guliston', 'Shirin', 'Boyovut', 'Sardoba'],
  'Jizzax': ['Jizzax shahar', 'Baxmal', 'Do‘stlik', 'Zarbdar'],
  'Navoiy': ['Navoiy shahar', 'Zarafshon', 'Uchquduq', 'Karmana'],
  "Qoraqalpog'iston": ["Nukus", 'Beruniy', 'Chimboy', 'Taxiatosh'],
};

function generateMockRegistrations(days: number): RegistrationData[] {
  const data: RegistrationData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').toDate();
    const baseCount = 5 + Math.floor(Math.random() * 15);
    const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.3 : 1;

    data.push({
      date: dayjs(date).format('YYYY-MM-DD'),
      count: Math.floor(baseCount * weekendFactor),
    });
  }

  return data;
}

function generateMockCoursePopularity(): CoursePopularityData[] {
  return courses.slice(0, 6).map((course) => ({
    name: course.title,
    students: Math.floor(Math.random() * 200) + 50,
    applications: Math.floor(Math.random() * 300) + 100,
  }));
}

function generateMockRegions(): RegionData[] {
  return REGIONS.map((region) => ({
    name: region,
    students: Math.floor(Math.random() * 500) + 20,
    applications: Math.floor(Math.random() * 800) + 50,
  }));
}

function generateMockDistricts(): DistrictData[] {
  const allDistricts = Object.values(DISTRICTS).flat();
  return allDistricts.slice(0, 15).map((district) => ({
    name: district,
    students: Math.floor(Math.random() * 150) + 10,
  }));
}

function generateMockTeacherPerformance(): TeacherPerformanceData[] {
  return teachers.slice(0, 8).map((teacher) => ({
    name: teacher.name,
    students: Math.floor(Math.random() * 100) + 20,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    courses: Math.floor(Math.random() * 5) + 1,
  }));
}

function generateMockAcceptanceRate(): AcceptanceRateData[] {
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'];
  return months.map((month) => ({
    name: month,
    accepted: Math.floor(Math.random() * 150) + 50,
    rejected: Math.floor(Math.random() * 30) + 5,
    pending: Math.floor(Math.random() * 40) + 10,
  }));
}

function generateMockStudentGrowth(): StudentGrowthData[] {
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'];
  let total = 1000;

  return months.map((month) => {
    const newStudents = Math.floor(Math.random() * 100) + 30;
    total += newStudents;
    return {
      month,
      total,
      new: newStudents,
    };
  });
}

function generateMockApplicationStatus(): ApplicationStatusData[] {
  return [
    { status: 'pending', count: Math.floor(Math.random() * 50) + 20 },
    { status: 'accepted', count: Math.floor(Math.random() * 200) + 100 },
    { status: 'rejected', count: Math.floor(Math.random() * 30) + 10 },
  ];
}

function generateMockOverview(): AnalyticsOverview {
  return {
    totalStudents: 2450,
    totalApplications: 3890,
    pendingApplications: 156,
    acceptedStudents: 3200,
    rejectedStudents: 534,
    activeCourses: courses.length,
    totalTeachers: teachers.length,
  };
}

// ============================================================
// Public API
// ============================================================
// TODO: Add server-side pagination and filtering

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    // TODO: Replace with Prisma query:
    // const totalStudents = await prisma.student.count();
    // const totalApplications = await prisma.enrollment.count();
    // const pendingApplications = await prisma.enrollment.count({ where: { status: 'ACTIVE' } });
    // ...
    return generateMockOverview();
  },

  async getDailyRegistrations(days: number = 30): Promise<RegistrationData[]> {
    // TODO: Replace with Prisma aggregation query grouped by date
    return generateMockRegistrations(days);
  },

  async getWeeklyRegistrations(weeks: number = 12): Promise<RegistrationData[]> {
    // TODO: Replace with Prisma query grouped by week
    const data: RegistrationData[] = [];

    for (let i = weeks - 1; i >= 0; i--) {
      const weekStart = dayjs().subtract(i * 7, 'day').toDate();
      const weekEnd = dayjs(weekStart).add(6, 'day').toDate();
      data.push({
        date: `${dayjs(weekStart).format('DD MMM')} - ${dayjs(weekEnd).format('DD MMM')}`,
        count: Math.floor(Math.random() * 100) + 30,
      });
    }

    return data;
  },

  async getMonthlyRegistrations(months: number = 12): Promise<RegistrationData[]> {
    // TODO: Replace with Prisma query grouped by month
    const data: RegistrationData[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = dayjs().subtract(i, 'month').startOf('month').toDate();
      data.push({
        date: dayjs(monthStart).format('MMM YYYY'),
        count: Math.floor(Math.random() * 500) + 100,
      });
    }

    return data;
  },

  async getCoursePopularity(): Promise<CoursePopularityData[]> {
    // TODO: Replace with Prisma join query
    return generateMockCoursePopularity();
  },

  async getRegionStatistics(): Promise<RegionData[]> {
    // TODO: Replace with Prisma group by region
    return generateMockRegions();
  },

  async getDistrictStatistics(region?: string): Promise<DistrictData[]> {
    // TODO: Replace with Prisma query filtered by region
    if (region && region !== 'all') {
      const districts = DISTRICTS[region] || [];
      return districts.map((district) => ({
        name: district,
        students: Math.floor(Math.random() * 100) + 10,
      }));
    }
    return generateMockDistricts();
  },

  async getTeacherPerformance(): Promise<TeacherPerformanceData[]> {
    // TODO: Replace with Prisma aggregation query
    return generateMockTeacherPerformance();
  },

  async getAcceptanceRate(): Promise<AcceptanceRateData[]> {
    // TODO: Replace with Prisma time-series query
    return generateMockAcceptanceRate();
  },

  async getStudentGrowth(): Promise<StudentGrowthData[]> {
    // TODO: Replace with Prisma cumulative count query
    return generateMockStudentGrowth();
  },

  async getApplicationStatus(): Promise<ApplicationStatusData[]> {
    // TODO: Replace with Prisma count query grouped by status
    return generateMockApplicationStatus();
  },
};
