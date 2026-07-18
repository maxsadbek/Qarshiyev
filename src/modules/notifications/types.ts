/**
 * src/modules/notifications/types.ts
 * Shared event types and payloads for the Notification System.
 * Every channel receives a typed payload — no stringly-typed magic.
 */

export type NotificationEventType =
  | 'REGISTRATION'
  | 'ACCEPTANCE'
  | 'REJECTION'
  | 'PENDING_STATUS'
  | 'REMINDER'
  | 'CUSTOM';

export type NotificationChannelType = 'TELEGRAM' | 'EMAIL' | 'DASHBOARD';

// ── Per-event payload contracts ──────────────────────────────────────────────

export interface RegistrationPayload {
  studentName: string;
  phone: string;
  courseName: string;
  applicationId: string;
  // Recipients
  studentTelegramId?: string;
  studentEmail?: string;
  studentUserId: string;
  teacherTelegramId?: string;
  teacherEmail?: string;
}

export interface StatusChangePayload {
  studentName: string;
  courseName: string;
  applicationId: string;
  newStatus: 'APPROVED' | 'REJECTED' | 'PENDING';
  teacherNote?: string;
  // Recipients
  studentTelegramId?: string;
  studentEmail?: string;
  studentUserId: string;
}

export interface ReminderPayload {
  studentName: string;
  courseName: string;
  message: string;
  studentTelegramId?: string;
  studentEmail?: string;
  studentUserId: string;
}

export interface CustomPayload {
  recipientUserId: string;
  recipientTelegramId?: string;
  recipientEmail?: string;
  subject: string;
  message: string;
}

// ── Unified dispatch request ──────────────────────────────────────────────────

export type NotificationPayload =
  | { event: 'REGISTRATION';   payload: RegistrationPayload }
  | { event: 'ACCEPTANCE';     payload: StatusChangePayload }
  | { event: 'REJECTION';      payload: StatusChangePayload }
  | { event: 'PENDING_STATUS'; payload: StatusChangePayload }
  | { event: 'REMINDER';       payload: ReminderPayload }
  | { event: 'CUSTOM';         payload: CustomPayload };

export interface ChannelResult {
  channel: NotificationChannelType;
  success: boolean;
  error?: string;
}
