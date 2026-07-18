import prisma from '../../../lib/prisma';
import { Markup } from 'telegraf';
import bot from '../bot';
import { notificationService } from '../../notifications/notification.service';
import { auditChange } from '../../audit/audit.service';
import { logger } from '../../../lib/security/logger';

export class TeacherCrmService {
  /**
   * Notifies the relevant teacher(s) about a new application
   */
  async notifyTeacher(applicationId: string) {
    try {
      const application = await prisma.application.findUnique({
        where: { id: applicationId },
        include: {
          student: { include: { user: true } },
          course: { include: { teacher: { include: { user: true } } } }
        }
      });

      if (!application) {
        logger.warn('notifyTeacher: Application not found', { applicationId });
        return;
      }

      // The teacher's telegram ID (if connected)
      const teacherTelegramId = application.course.teacher.user.telegramId;
      
      // If the teacher doesn't have a Telegram ID, fallback to Admins
      const targetChatId = teacherTelegramId || process.env.TELEGRAM_ADMIN_CHAT_ID;
      
      if (!targetChatId) {
        logger.warn('notifyTeacher: No target chat ID (teacher or admin)', { applicationId });
        return;
      }

      const message = `
🆕 <b>Yangi Ariza!</b>
O'quvchi: <b>${application.student.user.firstName} ${application.student.user.lastName}</b>
Telefon: ${application.student.user.phone}
Kurs: <b>${application.course.title}</b>
Holat: PENDING

Ma'lumot:
<i>${application.notes || 'Izoh yo\'q'}</i>
      `;

      const keyboard = Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Qabul qilish', `CRM_ACCEPT_${application.id}`),
          Markup.button.callback('❌ Rad etish', `CRM_REJECT_${application.id}`)
        ],
        [
          Markup.button.callback('⏳ Kuttirish', `CRM_PENDING_${application.id}`),
          Markup.button.callback('📝 Izoh yozish', `CRM_NOTE_${application.id}`)
        ],
        [
          Markup.button.callback('👤 O\'quvchi profili', `CRM_PROFILE_${application.student.id}`)
        ]
      ]);

      await bot.telegram.sendMessage(targetChatId, message, {
        parse_mode: 'HTML',
        ...keyboard
      });
      
      logger.info('Teacher notified about new application', { applicationId, targetChatId });
    } catch (error) {
      logger.error('Failed to notify teacher about application', { applicationId, error: String(error) });
    }
  }

  async updateStatus(
    applicationId: string,
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED',
    actionUserId: string,
    teacherNote?: string,
  ) {
    try {
      const updated = await prisma.application.update({
        where: { id: applicationId },
        data: { status },
        include: { student: { include: { user: true } }, course: true },
      });

      // ── Activity Log ─────────────────────────────────────────────────
      await prisma.activityLog.create({
        data: {
          userId: actionUserId,
          action: `APPLICATION_${status}`,
          entity: 'Application',
          entityId: applicationId,
        },
      });

      // ── Audit Trail (status change) ──────────────────────────────────
      await auditChange({
        userId: actionUserId,
        action: 'STATUS_CHANGED',
        entity: 'Application',
        entityId: applicationId,
        field: 'status',
        oldValue: updated.status,
        newValue: status,
      });

      // ── Async Multi-Channel Notifications ────────────────────────────
      const studentPayload = {
        studentName: `${updated.student.user.firstName} ${updated.student.user.lastName}`,
        courseName: updated.course.title,
        applicationId,
        newStatus: status as 'APPROVED' | 'REJECTED' | 'PENDING',
        teacherNote,
        studentTelegramId: updated.student.user.telegramId ?? undefined,
        studentEmail:
          updated.student.user.email?.includes('@tg.local')
            ? undefined
            : updated.student.user.email,
        studentUserId: updated.student.userId,
      };

      if (status === 'APPROVED') {
        notificationService.acceptance(studentPayload).catch(e => logger.error('Acceptance notification failed', { error: String(e) }));
      } else if (status === 'REJECTED') {
        notificationService.rejection(studentPayload).catch(e => logger.error('Rejection notification failed', { error: String(e) }));
      } else if (status === 'PENDING') {
        notificationService.pendingStatus(studentPayload).catch(e => logger.error('Pending notification failed', { error: String(e) }));
      }

      logger.info('Application status updated', { applicationId, status, actionUserId });
      return updated;
    } catch (error) {
      logger.error('Failed to update application status', { applicationId, status, error: String(error) });
      throw error;
    }
  }

  async addNote(applicationId: string, note: string, actionUserId: string) {
    try {
      const app = await prisma.application.findUnique({ where: { id: applicationId } });
      if (!app) {
        logger.warn('addNote: Application not found', { applicationId });
        return null;
      }

      const newNotes = app.notes ? `${app.notes}\n---\nO'qituvchi izohi: ${note}` : `O'qituvchi izohi: ${note}`;
      
      const updated = await prisma.application.update({
        where: { id: applicationId },
        data: { notes: newNotes }
      });

      await prisma.activityLog.create({
        data: {
          userId: actionUserId,
          action: `APPLICATION_NOTE_ADDED`,
          entity: 'Application',
          entityId: applicationId,
        }
      });

      await auditChange({
        userId: actionUserId,
        action: 'ADMIN_ACTION',
        entity: 'Application',
        entityId: applicationId,
        field: 'notes',
        oldValue: app.notes,
        newValue: newNotes,
      });

      logger.info('Note added to application', { applicationId, actionUserId });
      return updated;
    } catch (error) {
      logger.error('Failed to add note to application', { applicationId, error: String(error) });
      throw error;
    }
  }

  async getStudentProfileText(studentId: string) {
    try {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          user: true,
          applications: { include: { course: true }, orderBy: { createdAt: 'desc' } }
        }
      });

      if (!student) return 'O\'quvchi topilmadi.';

      let text = `👤 <b>${student.user.firstName} ${student.user.lastName}</b>\n`;
      text += `📞 ${student.user.phone}\n\n`;
      text += `📋 <b>Tarix (Arizalar):</b>\n`;
      
      for (const app of student.applications) {
        text += `- ${app.course.title} [${app.status}] (${app.createdAt.toLocaleDateString()})\n`;
      }

      return text;
    } catch (error) {
      logger.error('Failed to get student profile text', { studentId, error: String(error) });
      return 'Ma\'lumotlarni yuklashda xatolik.';
    }
  }
}

export const teacherCrmService = new TeacherCrmService();


