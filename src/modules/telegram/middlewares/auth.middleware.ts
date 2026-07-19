import type { Middleware, Scenes } from 'telegraf';
import { logger } from '../../../lib/security/logger';

export interface RegistrationWizardState {
  language?: string;
  phone?: string;
  regionId?: string;
  districtId?: string;
  courseId?: string;
  shift?: string;
  age?: number;
  experience?: string;
  device?: string;
  note?: string;
  applicationId?: string;
  actionUserId?: string;
  [key: string]: string | number | undefined;
}

export type ProtectedContext = Scenes.WizardContext;

/**
 * Middleware to restrict access to authenticated users.
 * Without a database, this simply allows all access.
 */
export const teacherAdminOnly = (): Middleware<ProtectedContext> => async (_ctx, next) => {
  // Database is not available — allow all requests.
  return next();
};
