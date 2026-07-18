import { motion } from 'framer-motion';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { AcceptanceRateData } from '../types';
import { CHART_COLORS } from '../utils/constants';

// ============================================================
// AcceptanceRateChart Component
// ============================================================
// TODO: Add trend line over time
// TODO: Add comparison with industry benchmarks
// TODO: Add click to filter by status

interface AcceptanceRateChartProps {
  data: AcceptanceRateData[];
  title: string;
}

export function AcceptanceRateChart({ data, title }: AcceptanceRateChartProps) {
  const COLORS = [CHART_COLORS.danger, CHART_COLORS.success, CHART_COLORS.warning];

  const totalAccepted = data.reduce((sum, item) => sum + item.accepted, 0);
  const totalRejected = data.reduce((sum, item) => sum + item.rejected, 0);
  const totalPending = data.reduce((sum, item) => sum + item.pending, 0);
  const total = totalAccepted + totalRejected + totalPending;

  const acceptanceRate = total > 0 ? Math.round((totalAccepted / total) * 100) : 0;
  const rejectionRate = total > 0 ? Math.round((totalRejected / total) * 100) : 0;
  const pendingRate = total > 0 ? Math.round((totalPending / total) * 100) : 0;

  const chartData = [
    { name: 'Qabul qilindi', value: totalAccepted },
    { name: 'Rad etildi', value: totalRejected },
    { name: 'Kutilmoqda', value: totalPending },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Qabul qilish darajasi</span>
            <span className="text-lg font-bold text-emerald-600">{acceptanceRate}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Kutish darajasi</span>
            <span className="text-lg font-bold text-amber-600">{pendingRate}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Rad etish darajasi</span>
            <span className="text-lg font-bold text-rose-600">{rejectionRate}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
