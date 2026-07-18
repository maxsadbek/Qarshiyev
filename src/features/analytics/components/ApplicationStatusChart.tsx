import { motion } from 'framer-motion';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ApplicationStatusData } from '../types';
import { CHART_COLORS } from '../utils/constants';

// ============================================================
// ApplicationStatusChart Component
// ============================================================
// TODO: Add trend over time
// TODO: Add funnel visualization
// TODO: Add conversion metrics

interface ApplicationStatusChartProps {
  data: ApplicationStatusData[];
  title: string;
}

export function ApplicationStatusChart({ data, title }: ApplicationStatusChartProps) {
  const COLORS = [CHART_COLORS.warning, CHART_COLORS.success, CHART_COLORS.danger];

  const chartData = data.map((item) => ({
    name: item.status === 'pending' ? 'Kutilmoqda' : item.status === 'accepted' ? 'Qabul qilindi' : 'Rad etildi',
    value: item.count,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
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
    </motion.div>
  );
}

