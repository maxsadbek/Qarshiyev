import prisma from '../../lib/prisma';
import { z } from 'zod';
import { logger } from '../../lib/security/logger';

export const RegistrationSchema = z.object({
  telegramId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(9),
  districtId: z.string().uuid(),
  courseId: z.string().uuid(),
  shift: z.string(),
  age: z.number().min(5).max(100),
  experience: z.string(),
  device: z.string(),
  note: z.string().optional(),
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;

/**
 * Local interfaces matching the exact shapes returned by the `findMany` calls
 * below (no `include` clauses are used, so these are each model's own scalar
 * fields, limited to what is actually consumed by callers such as
 * `registration.wizard.ts`).
 *
 * Why this exists: Prisma 7 no longer exports a `Prisma` namespace from
 * `@prisma/client`. Without an explicit return type on these service methods,
 * `regions`/`districts`/`courses` in the wizard file — and the bare `.map((r) =>
 * ...)` callbacks there — would be left to bare inference from
 * `prisma.<model>.findMany(...)`, which has repeatedly widened to `any[]` on
 * this project's Vercel builds (the locally cached generated Prisma client
 * differs from a fresh Vercel-side `prisma generate`). Annotating the return
 * type here fixes it at the source, so every caller gets a concrete type
 * without needing its own cast.
 */
interface RegionItem {
  id: string;
  name: string;
}

interface DistrictItem {
  id: string;
  name: string;
}

interface CourseItem {
  id: string;
  title: string;
}

export class TelegramService {
  async getRegions(): Promise<RegionItem[]> {
    return prisma.region.findMany({
      orderBy: { name: 'asc' },
    }) as Promise<RegionItem[]>;
  }

  async getDistricts(regionId: string): Promise<DistrictItem[]> {
    return prisma.district.findMany({
      where: { regionId },
      orderBy: { name: 'asc' },
    }) as Promise<DistrictItem[]>;
  }

  async getActiveCourses(): Promise<CourseItem[]> {
    return prisma.course.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
    }) as Promise<CourseItem[]>;
  }

  /**
   * Saves the completed registration to the database
   */
  async completeRegistration(data: RegistrationData) {
    try {
      // 1. Find or create User by telegramId
      const user = await prisma.user.upsert({
        where: { telegramId: data.telegramId },
        create: {
          telegramId: data.telegramId,
          email: `${data.telegramId}@tg.local`, // Use telegramId for placeholder email
          passwordHash: 'tg-no-pass',
          name: `${data.firstName} ${data.lastName}`.trim(),
          phone: data.phone,
        },
        update: {
          phone: data.phone, // Update phone if changed
        },
      });

      // 2. Find or create Student profile
      const student = await prisma.student.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          districtId: data.districtId,
        },
        update: {
          districtId: data.districtId,
        },
      });

      // 3. Prevent duplicate application
      const existingApp = await prisma.application.findUnique({
        where: {
          studentId_courseId: {
            studentId: student.id,
            courseId: data.courseId,
          },
        },
      });

      if (existingApp) {
        throw new Error('DUPLICATE_APPLICATION');
      }

      // 4. Create Application
      const application = await prisma.application.create({
        data: {
          studentId: student.id,
          courseId: data.courseId,
          status: 'PENDING',
          notes: `Age: ${data.age}\nExperience: ${data.experience}\nDevice: ${data.device}\nShift: ${data.shift}\nNote: ${data.note || 'None'}`,
        },
      });

      logger.info('Telegram registration completed', { applicationId: application.id, userId: user.id });
      return application;
    } catch (error) {
      if (error instanceof Error && error.message === 'DUPLICATE_APPLICATION') {
        throw error;
      }
      logger.error('Failed to complete telegram registration', { error: String(error), data });
      throw new Error('REGISTRATION_FAILED');
    }
  }
}

export const telegramService = new TelegramService();
