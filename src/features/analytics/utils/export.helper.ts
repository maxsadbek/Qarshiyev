import * as XLSX from 'xlsx';
import type { ReportConfig } from '../types';

// ============================================================
// Export Utilities
// ============================================================
// TODO: Add CSV export with proper encoding (UTF-8 with BOM)
// TODO: Add Excel export with formatting, headers, and auto-width
// TODO: Add PDF export support (using @react-pdf/renderer)
// TODO: Add batch export for multiple reports

export function exportToExcel(data: unknown[], filename: string): void {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Auto-width columns
    const maxWidth = 50;
    worksheet['!cols'] = Object.keys(data[0] || {}).map((key) => ({
      wch: Math.min(maxWidth, Math.max(key.length, 12)),
    }));

    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error('Excel export failed:', error);
    throw new Error('Excel export failed');
  }
}

export function exportToCSV(data: unknown[], filename: string): void {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV export failed:', error);
    throw new Error('CSV export failed');
  }
}

export function downloadExport(
  data: unknown[],
  config: ReportConfig,
  baseFilename: string
): void {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${baseFilename}_${timestamp}`;

  switch (config.format) {
    case 'xlsx':
      exportToExcel(data, filename);
      break;
    case 'csv':
      exportToCSV(data, filename);
      break;
    default:
      throw new Error(`Unsupported export format: ${config.format}`);
  }
}

export function generateReportFilename(type: ReportConfig['type']): string {
  const date = new Date().toISOString().split('T')[0];
  const map = {
    daily: `daily_report_${date}`,
    weekly: `weekly_report_${date}`,
    monthly: `monthly_report_${date}`,
    custom: `custom_report_${date}`,
  };
  return map[type];
}
