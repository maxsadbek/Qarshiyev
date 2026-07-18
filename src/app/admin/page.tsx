import prisma from '../../lib/prisma';
import { requirePermission } from '../../lib/auth';
import { OverviewCharts } from './OverviewCharts';

export default async function AdminOverviewPage() {
  await requirePermission('dashboard:read');

  const [totalStudents, totalTeachers, totalCourses, totalApplications] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.course.count({ where: { isActive: true } }),
    prisma.application.count(),
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={totalStudents} color="bg-blue-500" />
        <StatCard title="Total Teachers" value={totalTeachers} color="bg-green-500" />
        <StatCard title="Active Courses" value={totalCourses} color="bg-purple-500" />
        <StatCard title="Applications" value={totalApplications} color="bg-orange-500" />
      </div>

      {/* Charts Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Application Trends</h3>
        <OverviewCharts />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}>
        {/* Placeholder icon */}
        <span className="text-xl font-bold">#</span>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
