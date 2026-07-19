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
}

export interface Application {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  data: ApplicationData;
  createdAt: Date;
  updatedAt: Date;
  teacherNote?: string;
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
      },
    ];

    // Track seed users
    sampleData.forEach((data) => {
      this.users.add(Number(data.telegramId));
    });

    sampleData.forEach((data, index) => {
      const statuses: Application['status'][] = ['PENDING', 'APPROVED', 'REJECTED'];
      const daysAgo = [0, 2, 5];
      const d = new Date();
      d.setDate(d.getDate() - daysAgo[index]);
      this.add({
        id: `sample-${index + 1}`,
        status: statuses[index],
        data,
        createdAt: d,
        updatedAt: d,
      });
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
    const app: Application = {
      id: crypto.randomUUID(),
      status: 'PENDING',
      data,
      createdAt: new Date(),
      updatedAt: new Date(),
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

  getFiltered(params: {
    status?: Application['status'] | 'ALL';
    search?: string;
    page?: number;
    limit?: number;
  }): { applications: Application[]; total: number; page: number; totalPages: number } {
    const page = params.page || 1;
    const limit = params.limit || 10;
    let filtered = this.getAll();

    if (params.status && params.status !== 'ALL') {
      filtered = filtered.filter((a) => a.status === params.status);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.data.firstName.toLowerCase().includes(q) ||
          a.data.lastName.toLowerCase().includes(q) ||
          a.data.phone.includes(q) ||
          a.data.telegramId.includes(q)
      );
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const applications = filtered.slice(start, start + limit);

    return { applications, total, page, totalPages };
  }

  updateStatus(id: string, status: Application['status'], teacherNote?: string): boolean {
    const app = this.applications.get(id);
    if (!app) return false;
    app.status = status;
    app.updatedAt = new Date();
    if (teacherNote) app.teacherNote = teacherNote;
    return true;
  }

  getStats(): { total: number; pending: number; approved: number; rejected: number; cancelled: number } {
    const all = Array.from(this.applications.values());
    return {
      total: all.length,
      pending: all.filter((a) => a.status === 'PENDING').length,
      approved: all.filter((a) => a.status === 'APPROVED').length,
      rejected: all.filter((a) => a.status === 'REJECTED').length,
      cancelled: all.filter((a) => a.status === 'CANCELLED').length,
    };
  }
}

export const applicationStore = new ApplicationStore();
