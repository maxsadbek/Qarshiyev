/**
 * src/modules/applications/store.ts
 * In-memory store for applications submitted via Telegram.
 * Works without a database — data persists in memory for the lifetime
 * of the Node process.
 */

// ── Types ──────────────────────────────────────────────────────────
export interface ApplicationData {
  telegramId: string;
  firstName: string;
  lastName: string;
  phone: string;
  districtId: string;
  courseId: string;
  shift: string;
  age: number;
  experience: string;
  device: string;
  note?: string;
  language?: string;
  username?: string;
}

export type ApplicationStatusType = 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface HistoryEntry {
  timestamp: Date;
  action: string;
  performedBy?: string;
  details?: string;
}

export interface ReminderData {
  remindAt: Date;
  createdAt: Date;
  createdBy: string;
  triggered: boolean;
}

export interface Application {
  id: string;
  status: ApplicationStatusType;
  data: ApplicationData;
  createdAt: Date;
  updatedAt: Date;
  teacherNote?: string;
  important: boolean;
  contactedBy?: string;
  contactedAt?: Date;
  history: HistoryEntry[];
  reminder?: ReminderData;
}

type ApplicationFilterStatus = ApplicationStatusType | 'ALL';

interface FilterParams {
  status?: ApplicationFilterStatus;
  search?: string;
  page?: number;
  limit?: number;
  important?: boolean;
  today?: boolean;
  region?: string;
  course?: string;
}

interface FilterResult {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
}

// ── Store ──────────────────────────────────────────────────────────
class ApplicationStore {
  private applications: Map<string, Application> = new Map();
  private users: Set<number> = new Set();
  private seeded: boolean = false;

  constructor() {
    this.seed();
  }

  private seed() {
    if (this.seeded) return;
    this.seeded = true;
    // Seed with sample data so the admin page is not empty
    const sampleData: ApplicationData[] = [
      {
        telegramId: '123456789',
        firstName: 'Ali',
        lastName: 'Valiyev',
        phone: '+998901234567',
        districtId: 'chilonzor',
        courseId: 'web-dasturlash',
        shift: 'Morning',
        age: 18,
        experience: 'Yo\'q',
        device: 'yes',
        note: 'Dars jadvali haqida ma\'lumot bersangiz',
        language: 'uz',
        username: 'alivaliyev',
      },
      {
        telegramId: '987654321',
        firstName: 'Zarina',
        lastName: 'Karimova',
        phone: '+998937654321',
        districtId: 'yunusobod',
        courseId: 'ingliz-tili',
        shift: 'Evening',
        age: 22,
        experience: '1 yil',
        device: 'yes',
        note: '-',
        language: 'uz',
        username: 'zarina_karimova',
      },
      {
        telegramId: '555555555',
        firstName: 'Dmitriy',
        lastName: 'Ivanov',
        phone: '+998901111111',
        districtId: 'sergeli',
        courseId: 'backend',
        shift: 'Afternoon',
        age: 20,
        experience: '2 yil',
        device: 'no',
        note: 'Noutbuk sotib olish rejasi bor',
        language: 'ru',
        username: 'dmitriy_ivanov',
      },
    ];

    // Track seed users
    sampleData.forEach((data) => {
      this.users.add(Number(data.telegramId));
    });

    sampleData.forEach((data, index) => {
      const statuses: ApplicationStatusType[] = ['PENDING', 'APPROVED', 'REJECTED'];
      const daysAgo = [0, 2, 5];
      const d = new Date();
      d.setDate(d.getDate() - daysAgo[index]);
      const app: Application = {
        id: `sample-${index + 1}`,
        status: statuses[index],
        data,
        createdAt: d,
        updatedAt: d,
        important: false,
        history: [
          { timestamp: d, action: 'Application received', details: 'Ariza qabul qilindi' },
        ],
      };
      this.add(app);
    });
  }

  // ── User tracking ───────────────────────────────────
  trackUser(telegramId: number): void {
    this.users.add(telegramId);
  }

  getUserCount(): number {
    return this.users.size;
  }

  getAllUserIds(): number[] {
    return Array.from(this.users);
  }

  // ── Applications ────────────────────────────────────
  add(app: Application): void {
    this.applications.set(app.id, app);
  }

  create(data: ApplicationData): Application {
    const now = new Date();
    const app: Application = {
      id: crypto.randomUUID(),
      status: 'PENDING',
      data,
      createdAt: now,
      updatedAt: now,
      important: false,
      history: [
        { timestamp: now, action: 'Application received', details: 'Ariza qabul qilindi' },
      ],
    };
    this.applications.set(app.id, app);
    return app;
  }

  delete(id: string): boolean {
    return this.applications.delete(id);
  }

  getById(id: string): Application | undefined {
    return this.applications.get(id);
  }

  getAll(): Application[] {
    return Array.from(this.applications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // ── Advanced Search ─────────────────────────────────
  getFiltered(params: FilterParams): FilterResult {
    const page = params.page || 1;
    const limit = params.limit || 10;
    let filtered = this.getAll();

    if (params.status && params.status !== 'ALL') {
      filtered = filtered.filter((a) => a.status === params.status);
    }

    if (params.important) {
      filtered = filtered.filter((a) => a.important);
    }

    if (params.today) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      filtered = filtered.filter(
        (a) => a.createdAt >= today && a.createdAt < tomorrow
      );
    }

    if (params.region) {
      const q = params.region.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.data.districtId.toLowerCase().includes(q)
      );
    }

    if (params.course) {
      const q = params.course.toLowerCase();
      filtered = filtered.filter(
        (a) => a.data.courseId.toLowerCase().includes(q)
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.data.firstName.toLowerCase().includes(q) ||
          a.data.lastName.toLowerCase().includes(q) ||
          `${a.data.firstName} ${a.data.lastName}`.toLowerCase().includes(q) ||
          a.data.phone.includes(q) ||
          a.data.telegramId.includes(q) ||
          a.id.toLowerCase().includes(q) ||
          (a.data.username || '').toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const applications = filtered.slice(start, start + limit);

    return { applications, total, page, totalPages };
  }

  updateStatus(id: string, status: ApplicationStatusType, teacherNote?: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    app.status = status;
    app.updatedAt = new Date();
    if (teacherNote) app.teacherNote = teacherNote;
    this.addHistoryEntry(id, `Status changed to ${status}`, `Holat o\'zgartirildi: ${status}`);
    return true;
  }

  // ── Duplicate Protection ────────────────────────────
  isAlreadyActioned(id: string, expectedStatus: ApplicationStatusType): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    return app.status === expectedStatus;
  }

  hasReminder(id: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    return !!app.reminder && !app.reminder.triggered;
  }

  // ── Important ────────────────────────────────────────
  markImportant(id: string, adminId: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    if (app.important) return false; // already important
    app.important = true;
    app.updatedAt = new Date();
    this.addHistoryEntry(id, '⭐ Marked Important', '⭐ Muhim deb belgilandi', adminId);
    return true;
  }

  unmarkImportant(id: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    if (!app.important) return false;
    app.important = false;
    app.updatedAt = new Date();
    this.addHistoryEntry(id, 'Unmarked Important', 'Muhim status olib tashlandi');
    return true;
  }

  getImportant(): Application[] {
    return this.getAll().filter((a) => a.important);
  }

  // ── Contacted ────────────────────────────────────────
  setContacted(id: string, adminId: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    if (app.status === 'CONTACTED') return false; // already contacted
    app.status = 'CONTACTED';
    app.contactedBy = adminId;
    app.contactedAt = new Date();
    app.updatedAt = new Date();
    this.addHistoryEntry(id, '📞 Contacted', '📞 Bog\'landi', adminId);
    return true;
  }

  // ── Reminder ─────────────────────────────────────────
  setReminder(id: string, remindAt: Date, createdBy: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    app.reminder = {
      remindAt,
      createdAt: new Date(),
      createdBy,
      triggered: false,
    };
    app.updatedAt = new Date();
    this.addHistoryEntry(id, `⏰ Reminder set for ${remindAt.toISOString()}`, '⏰ Eslatma o\'rnatildi', createdBy);
    return true;
  }

  triggerReminder(id: string): boolean {
    const app = this.applications.get(id);
    if (!app || !app.reminder) return false;
    app.reminder.triggered = true;
    this.addHistoryEntry(id, '🔔 Reminder triggered', '🔔 Eslatma yuborildi');
    return true;
  }

  getDueReminders(): Application[] {
    const now = new Date();
    return this.getAll().filter(
      (a) => a.reminder && !a.reminder.triggered && a.reminder.remindAt <= now
    );
  }

  // ── History ──────────────────────────────────────────
  addHistoryEntry(id: string, action: string, details?: string, performedBy?: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    app.history.push({
      timestamp: new Date(),
      action,
      details,
      performedBy,
    });
    return true;
  }

  getHistory(id: string): HistoryEntry[] {
    const app = this.applications.get(id);
    if (!app) return [];
    return [...app.history].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  // ── Add Note (with history) ──────────────────────────
  addNote(id: string, note: string, adminId: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    app.teacherNote = note;
    app.updatedAt = new Date();
    this.addHistoryEntry(id, '✍️ Note added', '✍️ Izoh qo\'shildi', adminId);
    return true;
  }

  getStats(): { total: number; pending: number; contacted: number; approved: number; rejected: number; cancelled: number } {
    const all = Array.from(this.applications.values());
    return {
      total: all.length,
      pending: all.filter((a) => a.status === 'PENDING').length,
      contacted: all.filter((a) => a.status === 'CONTACTED').length,
      approved: all.filter((a) => a.status === 'APPROVED').length,
      rejected: all.filter((a) => a.status === 'REJECTED').length,
      cancelled: all.filter((a) => a.status === 'CANCELLED').length,
    };
  }
}

export const applicationStore = new ApplicationStore();
