import { motion } from 'framer-motion';
import { CalendarIcon, X } from 'lucide-react';
import type { AnalyticsFilters, TimePeriod } from '../types';
import { DATE_RANGE_PRESETS, FILTER_OPTIONS } from '../utils/constants';

// ============================================================
// FilterBar Component
// ============================================================
// TODO: Add debounced search input
// TODO: Add filter persistence to URL query params
// TODO: Add reset filters button
// TODO: Add collapsible filters for mobile

interface FilterBarProps {
  filters: AnalyticsFilters;
  onFilterChange: (filters: AnalyticsFilters) => void;
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
}

export function FilterBar({ filters, onFilterChange, timePeriod, onTimePeriodChange }: FilterBarProps) {
  const handleChange = (key: keyof AnalyticsFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleDatePreset = (preset: { start: Date; end: Date }) => {
    onFilterChange({
      ...filters,
      dateRange: {
        start: preset.start.toISOString().split('T')[0],
        end: preset.end.toISOString().split('T')[0],
      },
    });
  };

  const resetFilters = () => {
    onFilterChange({
      dateRange: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
      },
      course: undefined,
      region: undefined,
      district: undefined,
      teacher: undefined,
      status: undefined,
      language: undefined,
      search: undefined,
    });
    onTimePeriodChange('daily');
  };

  const hasActiveFilters = filters.course || filters.region || filters.district || filters.teacher || filters.status || filters.language;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-4 space-y-4"
    >
      {/* Time Period */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-700 mr-2">Davr:</span>
        {(['daily', 'weekly', 'monthly'] as TimePeriod[]).map((period) => (
          <button
            key={period}
            onClick={() => onTimePeriodChange(period)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              timePeriod === period
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {period === 'daily' ? 'Kunlik' : period === 'weekly' ? 'Haftalik' : 'Oylik'}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleChange('dateRange', e.target.value)}
            className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>
        <span className="text-slate-400">—</span>
        <div className="relative">
          <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleChange('dateRange', e.target.value)}
            className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>

        {DATE_RANGE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handleDatePreset(preset)}
            className="px-2 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.course || 'all'}
          onChange={(e) => handleChange('course', e.target.value === 'all' ? '' : e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-white"
        >
          {FILTER_OPTIONS.courses.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <select
          value={filters.region || 'all'}
          onChange={(e) => handleChange('region', e.target.value === 'all' ? '' : e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-white"
        >
          {FILTER_OPTIONS.regions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <select
          value={filters.status || 'all'}
          onChange={(e) => handleChange('status', e.target.value === 'all' ? '' : e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-white"
        >
          {FILTER_OPTIONS.statuses.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <select
          value={filters.language || 'all'}
          onChange={(e) => handleChange('language', e.target.value === 'all' ? '' : e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-white"
        >
          {FILTER_OPTIONS.languages.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <X size={14} />
            Tozalash
          </button>
        )}
      </div>
    </motion.div>
  );
}
