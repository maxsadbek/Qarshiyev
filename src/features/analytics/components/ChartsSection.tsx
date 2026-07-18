import type {
  RegistrationData,
  CoursePopularityData,
  RegionData,
  DistrictData,
  TeacherPerformanceData,
  AcceptanceRateData,
  StudentGrowthData,
  ApplicationStatusData,
} from '../types';
import {
  RegistrationChart,
  CoursePopularityChart,
  RegionStatisticsChart,
  TeacherPerformanceChart,
  AcceptanceRateChart,
  StudentGrowthChart,
  DistrictStatisticsChart,
  ApplicationStatusChart,
} from './index';

// ============================================================
// ChartsSection Component
// ============================================================
// TODO: Add chart visibility toggles
// TODO: Add print-friendly layout
// TODO: Add chart resizing and fullscreen mode

interface ChartsSectionProps {
  dailyRegistrations: RegistrationData[];
  weeklyRegistrations: RegistrationData[];
  monthlyRegistrations: RegistrationData[];
  coursePopularity: CoursePopularityData[];
  regionStatistics: RegionData[];
  districtStatistics: DistrictData[];
  teacherPerformance: TeacherPerformanceData[];
  acceptanceRate: AcceptanceRateData[];
  studentGrowth: StudentGrowthData[];
  applicationStatus: ApplicationStatusData[];
  timePeriod: 'daily' | 'weekly' | 'monthly';
  selectedRegion?: string;
}

export function ChartsSection({
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
  timePeriod,
  selectedRegion,
}: ChartsSectionProps) {
  const timePeriodLabel = timePeriod === 'daily' ? 'Kunlik' : timePeriod === 'weekly' ? 'Haftalik' : 'Oylik';

  const getTimePeriodData = () => {
    switch (timePeriod) {
      case 'daily':
        return dailyRegistrations;
      case 'weekly':
        return weeklyRegistrations;
      case 'monthly':
        return monthlyRegistrations;
      default:
        return dailyRegistrations;
    }
  };

  return (
    <div className="space-y-6">
      {/* Registration Trends */}
      <div className="grid grid-cols-1 gap-6">
        <RegistrationChart
          data={getTimePeriodData()}
          title={`${timePeriodLabel} ro'yxatdan o'tish dinamikasi`}
          subtitle={`Oxirgi ${timePeriod === 'daily' ? '30 kun' : timePeriod === 'weekly' ? '12 hafta' : '12 oy'}`}
        />
      </div>

      {/* Growth & Application Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentGrowthChart data={studentGrowth} title="Talabalar o'sishi" />
        <ApplicationStatusChart data={applicationStatus} title="Ariza holatlari" />
      </div>

      {/* Course & Teacher Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CoursePopularityChart data={coursePopularity} title="Kurslar mashhurligi" />
        <TeacherPerformanceChart data={teacherPerformance} title="O'qituvchilar samaradorligi" />
      </div>

      {/* Region & District Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionStatisticsChart data={regionStatistics} title="Viloyatlar bo'yicha statistika" />
        <DistrictStatisticsChart
          data={districtStatistics}
          title="Tumanlar bo'yicha statistika"
          region={selectedRegion}
        />
      </div>

      {/* Acceptance Rate */}
      <AcceptanceRateChart data={acceptanceRate} title="Qabul qilish darajasi" />
    </div>
  );
}

