import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText } from 'lucide-react';
import type { ReportConfig } from '../types';

// ============================================================
// ExportButtons Component
// ============================================================
// TODO: Add loading state during export
// TODO: Add success/error toast notifications
// TODO: Add export history
// TODO: Add scheduled export functionality

interface ExportButtonsProps {
  onExport: (config: ReportConfig) => void;
  isExporting: boolean;
  disabled?: boolean;
}

export function ExportButtons({ onExport, isExporting, disabled }: ExportButtonsProps) {
  const handleExport = (format: ReportConfig['format']) => {
    onExport({
      type: 'custom',
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
      },
      format,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-700">Eksport:</span>
      <button
        onClick={() => handleExport('xlsx')}
        disabled={disabled || isExporting}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileSpreadsheet size={16} />
        Excel
      </button>
      <button
        onClick={() => handleExport('csv')}
        disabled={disabled || isExporting}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileText size={16} />
        CSV
      </button>
      {isExporting && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-xs text-slate-500"
        >
          Eksport qilinmoqda...
        </motion.div>
      )}
    </div>
  );
}

