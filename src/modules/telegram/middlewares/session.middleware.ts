import { session } from 'telegraf';

/**
 * In-memory session middleware for Telegraf.
 * Wizard state, scene data, registration progress, and note creation
 * state are all stored inside `ctx.session` using Telegraf's built-in
 * session middleware — no database required.
 */
export const sessionMiddleware = () => session();
