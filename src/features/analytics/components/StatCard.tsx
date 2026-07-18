import { motion } from 'framer-motion';
import type { StatCardData } from '../types';

const colorMap = {
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', iconBg: 'bg-violet-100' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', iconBg: 'bg-amber-100' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', iconBg: 'bg-rose-100' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', iconBg: 'bg-blue-100' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', iconBg: 'bg-slate-100' },
};

// ============================================================
// StatCard Component
// ============================================================
// TODO: Add trend sparkline mini-chart
// TODO: Add loading skeleton state
// TODO: Add drill-down click handler

interface StatCardProps {
  data: StatCardData;
  index: number;
}

export function StatCard({ data, index }: StatCardProps) {
  const colors = colorMap[data.color];
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`rounded-xl border ${colors.border} ${colors.bg} p-5 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{data.title}</p>
          <p className="text-2xl font-bold text-slate-900">{data.value}</p>
          {data.change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-semibold ${data.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {data.change >= 0 ? '+' : ''}{data.change}%
              </span>
              {data.changeLabel && (
                <span className="text-xs text-slate-500">{data.changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center ${colors.text}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}
