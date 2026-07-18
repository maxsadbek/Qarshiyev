import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// ============================================================
// Date Formatting Utilities
// ============================================================
// TODO: Add timezone support for Uzbekistan (Asia/Tashkent)

export function formatDate(date: Date | string): string {
  return dayjs(date).format('DD.MM.YYYY');
}

export function formatDateTime(date: Date | string): string {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function formatRelativeTime(date: Date | string): string {
  return dayjs(date).fromNow();
}

export function startOfDay(date: Date): Date {
  return dayjs(date).startOf('day').toDate();
}

export function endOfDay(date: Date): Date {
  return dayjs(date).endOf('day').toDate();
}

export function startOfWeek(date: Date): Date {
  return dayjs(date).startOf('week').toDate();
}

export function startOfMonth(date: Date): Date {
  return dayjs(date).startOf('month').toDate();
}

export function endOfMonth(date: Date): Date {
  return dayjs(date).endOf('month').toDate();
}

export function addDays(date: Date, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

export function subDays(date: Date, days: number): Date {
  return dayjs(date).subtract(days, 'day').toDate();
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  return dayjs(date1).isSame(date2, 'day');
}

export function isSameWeek(date1: Date | string, date2: Date | string): boolean {
  return dayjs(date1).isSame(date2, 'week');
}

export function isSameMonth(date1: Date | string, date2: Date | string): boolean {
  return dayjs(date1).isSame(date2, 'month');
}

export function getDaysBetween(start: Date, end: Date): number {
  return dayjs(end).diff(dayjs(start), 'day');
}

export function generateDateRange(start: Date, end: Date): string[] {
  const days: string[] = [];
  let current = startOfDay(start);
  const endDay = startOfDay(end);

  while (dayjs(current).isBefore(endDay) || dayjs(current).isSame(endDay, 'day')) {
    days.push(dayjs(current).format('YYYY-MM-DD'));
    current = addDays(current, 1);
  }

  return days;
}

export function generateMonthLabels(start: Date, end: Date): string[] {
  const months: string[] = [];
  let current = startOfMonth(start);
  const endMonth = startOfMonth(end);

  while (dayjs(current).isBefore(endMonth) || dayjs(current).isSame(endMonth, 'month')) {
    months.push(dayjs(current).format('MMM YYYY'));
    current = dayjs(current).add(1, 'month').startOf('month').toDate();
  }

  return months;
}

