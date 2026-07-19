/**
 * src/modules/marketplace/marketplace.store.ts
 * In-memory store for the FreeBuff Gaming Marketplace.
 * Manages users, orders, reviews, promo codes, wallets, and referrals.
 */
import { randomBytes } from 'node:crypto';
import type { OrderData, OrderStatus, LangCode } from './types';
import { REFERRAL_CODE_LENGTH } from './types';

// ── Types ──────────────────────────────────────────────────────────

export interface MpUser {
  id: string;
  telegramId: number;
  username?: string;
  firstName: string;
  language: LangCode;
  balance: number;
  referralCode: string;
  referredBy?: string;
  referredUsers: string[];
  createdAt: Date;
  lastActivity: Date;
}

export interface MpOrder {
  id: string;
  userId: string;
  game: string;
  service: string;
  quantity: number;
  username: string;
  platform: string;
  notes: string;
  promoCode?: string;
  totalPrice: number;
  status: OrderStatus;
  adminNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MpReview {
  id: string;
  userId: string;
  orderId: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface MpPromoCode {
  code: string;
  discountPct: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
}

export interface MpTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAW' | 'REFERRAL_BONUS' | 'ORDER_PAYMENT';
  reference?: string;
  createdAt: Date;
}

// ── Service mapping for display ─────────────────────────────────────
const SERVICE_NAMES: Record<string, string> = {
  level_farming: 'Level Farming',
  money_farming: 'Money Farming',
  fruit_farming: 'Fruit Farming',
  raid_service: 'Raid Service',
  boss_farming: 'Boss Farming',
  race_v4: 'Race V4',
  race_awakening: 'Race Awakening',
  leviathan: 'Leviathan',
  fragments: 'Fragments',
  sea_events: 'Sea Events',
  gamepasses: 'Gamepasses',
  cdk: 'CDK',
  soul_guitar: 'Soul Guitar',
  kitsune_shrine: 'Kitsune Shrine',
  dragon_tokens: 'Dragon Tokens',
  custom_order: 'Custom Order',
};

const GAME_NAMES: Record<string, string> = {
  blox_fruits: 'Blox Fruits',
  king_legacy: 'King Legacy',
  grand_piece: 'Grand Piece',
  project_slayer: 'Project Slayer',
  aopg: 'A One Piece Game',
  mini_world: 'Mini World',
  minecraft: 'Minecraft',
  other: 'Other',
};

// ── Price mapping (base prices) ─────────────────────────────────────
const SERVICE_PRICES: Record<string, number> = {
  level_farming: 5,
  money_farming: 3,
  fruit_farming: 4,
  raid_service: 8,
  boss_farming: 10,
  race_v4: 15,
  race_awakening: 12,
  leviathan: 20,
  fragments: 6,
  sea_events: 7,
  gamepasses: 25,
  cdk: 30,
  soul_guitar: 18,
  kitsune_shrine: 14,
  dragon_tokens: 9,
  custom_order: 0,
};

function generateReferralCode(): string {
  return randomBytes(REFERRAL_CODE_LENGTH)
    .toString('base64url')
    .slice(0, REFERRAL_CODE_LENGTH)
    .toUpperCase();
}

function generateId(): string {
  return randomBytes(8).toString('hex');
}

// ── Store ──────────────────────────────────────────────────────────

class MarketplaceStore {
  private users: Map<string, MpUser> = new Map();
  private orders: Map<string, MpOrder> = new Map();
  private reviews: Map<string, MpReview> = new Map();
  private promoCodes: Map<string, MpPromoCode> = new Map();
  private transactions: Map<string, MpTransaction> = new Map();
  private pendingNotes: Map<string, string> = new Map(); // orderId -> admin waiting for note

  // ── Users ──────────────────────────────────────────────

  getOrCreateUser(ctx: {
    id: number;
    username?: string;
    first_name?: string;
    language_code?: string;
  }): MpUser {
    const existing = Array.from(this.users.values()).find(
      (u) => u.telegramId === ctx.id
    );
    if (existing) {
      existing.lastActivity = new Date();
      if (ctx.username) existing.username = ctx.username;
      return existing;
    }

    const user: MpUser = {
      id: generateId(),
      telegramId: ctx.id,
      username: ctx.username,
      firstName: ctx.first_name || 'User',
      language: (ctx.language_code as LangCode) || 'en',
      balance: 0,
      referralCode: generateReferralCode(),
      referredUsers: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): MpUser | undefined {
    return this.users.get(id);
  }

  getUserByTelegramId(telegramId: number): MpUser | undefined {
    return Array.from(this.users.values()).find(
      (u) => u.telegramId === telegramId
    );
  }

  getUserByReferralCode(code: string): MpUser | undefined {
    return Array.from(this.users.values()).find(
      (u) => u.referralCode === code
    );
  }

  getAllUsers(): MpUser[] {
    return Array.from(this.users.values());
  }

  getUserLanguage(ctxId: number): LangCode {
    const user = this.getUserByTelegramId(ctxId);
    return user?.language || 'en';
  }

  setUserLanguage(ctxId: number, lang: LangCode): void {
    const user = this.getUserByTelegramId(ctxId);
    if (user) {
      user.language = lang;
    }
  }

  // Referral logic
  applyReferral(newUserId: string, referralCode: string): boolean {
    const referrer = this.getUserByReferralCode(referralCode);
    if (!referrer || referrer.id === newUserId) return false;

    const newUser = this.getUser(newUserId);
    if (!newUser || newUser.referredBy) return false;

    newUser.referredBy = referrer.id;
    referrer.referredUsers.push(newUserId);
    return true;
  }

  addReferralBonus(userId: string, amount: number): void {
    const user = this.getUser(userId);
    if (user) {
      user.balance += amount;
      this.addTransaction({
        userId,
        amount,
        type: 'REFERRAL_BONUS',
        reference: `Referral bonus for order placement`,
      });
    }
  }

  // ── Orders ──────────────────────────────────────────────

  createOrder(
    userId: string,
    data: OrderData,
    promoDiscount: number
  ): MpOrder {
    const basePrice = SERVICE_PRICES[data.service] || 0;
    const totalPrice =
      data.service === 'custom_order'
        ? 0
        : basePrice * data.quantity * (1 - promoDiscount / 100);

    const order: MpOrder = {
      id: generateId(),
      userId,
      game: GAME_NAMES[data.game] || data.game,
      service: SERVICE_NAMES[data.service] || data.service,
      quantity: data.quantity,
      username: data.username,
      platform: data.platform,
      notes: data.notes,
      promoCode: data.promoCode,
      totalPrice: Math.round(totalPrice * 100) / 100,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.set(order.id, order);
    return order;
  }

  getOrder(id: string): MpOrder | undefined {
    return this.orders.get(id);
  }

  getUserOrders(userId: string): MpOrder[] {
    return Array.from(this.orders.values())
      .filter((o) => o.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getAllOrders(): MpOrder[] {
    return Array.from(this.orders.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getPendingOrders(): MpOrder[] {
    return this.getAllOrders().filter((o) => o.status === 'PENDING');
  }

  updateOrderStatus(
    id: string,
    status: OrderStatus,
    adminNote?: string
  ): MpOrder | undefined {
    const order = this.orders.get(id);
    if (!order) return undefined;

    order.status = status;
    order.updatedAt = new Date();
    if (adminNote !== undefined) {
      order.adminNote = adminNote;
    }
    return order;
  }

  addAdminNote(orderId: string, note: string): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.adminNote = (order.adminNote || '') + '\n' + note;
      order.updatedAt = new Date();
    }
  }

  // ── Pending Note State (for wizard) ─────────────────────

  setPendingNoteUser(userId: string, orderId: string): void {
    this.pendingNotes.set(userId, orderId);
  }

  getPendingNoteOrder(userId: string): string | undefined {
    return this.pendingNotes.get(userId);
  }

  clearPendingNote(userId: string): void {
    this.pendingNotes.delete(userId);
  }

  // ── Reviews ─────────────────────────────────────────────

  createReview(
    userId: string,
    orderId: string,
    rating: number,
    text: string
  ): MpReview {
    const review: MpReview = {
      id: generateId(),
      userId,
      orderId,
      rating,
      text,
      isApproved: false,
      createdAt: new Date(),
    };
    this.reviews.set(review.id, review);
    return review;
  }

  getApprovedReviews(): MpReview[] {
    return Array.from(this.reviews.values())
      .filter((r) => r.isApproved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getPendingReviews(): MpReview[] {
    return Array.from(this.reviews.values())
      .filter((r) => !r.isApproved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  approveReview(reviewId: string): void {
    const review = this.reviews.get(reviewId);
    if (review) {
      review.isApproved = true;
    }
  }

  getAllReviews(): MpReview[] {
    return Array.from(this.reviews.values());
  }

  hasReviewedOrder(orderId: string): boolean {
    return Array.from(this.reviews.values()).some(
      (r) => r.orderId === orderId
    );
  }

  // ── Promo Codes ─────────────────────────────────────────

  addPromoCode(
    code: string,
    discountPct: number,
    maxUses: number
  ): MpPromoCode {
    const promo: MpPromoCode = {
      code: code.toUpperCase(),
      discountPct,
      maxUses,
      usedCount: 0,
      isActive: true,
    };
    this.promoCodes.set(promo.code, promo);
    return promo;
  }

  validatePromoCode(code: string): MpPromoCode | null {
    const promo = this.promoCodes.get(code.toUpperCase());
    if (!promo || !promo.isActive || promo.usedCount >= promo.maxUses) {
      return null;
    }
    return promo;
  }

  usePromoCode(code: string): void {
    const promo = this.promoCodes.get(code.toUpperCase());
    if (promo) {
      promo.usedCount++;
    }
  }

  getAllPromoCodes(): MpPromoCode[] {
    return Array.from(this.promoCodes.values());
  }

  seedDefaultPromoCodes(): void {
    if (this.promoCodes.size > 0) return;
    this.addPromoCode('FREE10', 10, 100);
    this.addPromoCode('SUMMER20', 20, 50);
    this.addPromoCode('WELCOME5', 5, 200);
  }

  // ── Transactions / Wallet ───────────────────────────────

  addTransaction(tx: Omit<MpTransaction, 'id' | 'createdAt'>): MpTransaction {
    const transaction: MpTransaction = {
      ...tx,
      id: generateId(),
      createdAt: new Date(),
    };
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getUserTransactions(userId: string): MpTransaction[] {
    return Array.from(this.transactions.values())
      .filter((t) => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  updateBalance(userId: string, amount: number): void {
    const user = this.getUser(userId);
    if (user) {
      user.balance += amount;
      this.addTransaction({
        userId,
        amount,
        type: amount > 0 ? 'DEPOSIT' : 'WITHDRAW',
      });
    }
  }

  // ── Statistics ──────────────────────────────────────────

  getStats(): {
    revenue: number;
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    inProgressOrders: number;
    rejectedOrders: number;
    topService: string;
    activeUsers: number;
    todayOrders: number;
  } {
    const allOrders = this.getAllOrders();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completed = allOrders.filter((o) => o.status === 'COMPLETED');
    const pending = allOrders.filter((o) => o.status === 'PENDING');
    const inProgress = allOrders.filter((o) => o.status === 'IN_PROGRESS');
    const rejected = allOrders.filter((o) => o.status === 'REJECTED');
    const todayOrders = allOrders.filter(
      (o) => o.createdAt >= today
    );

    const revenue = completed.reduce((sum, o) => sum + o.totalPrice, 0);

    // Find top service
    const serviceCounts: Record<string, number> = {};
    allOrders.forEach((o) => {
      serviceCounts[o.service] = (serviceCounts[o.service] || 0) + 1;
    });
    const topService = Object.entries(serviceCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || 'N/A';

    return {
      revenue: Math.round(revenue * 100) / 100,
      totalOrders: allOrders.length,
      completedOrders: completed.length,
      pendingOrders: pending.length,
      inProgressOrders: inProgress.length,
      rejectedOrders: rejected.length,
      topService,
      activeUsers: this.users.size,
      todayOrders: todayOrders.length,
    };
  }

  // ── Seed data ───────────────────────────────────────────

  seedSampleData(): void {
    if (this.orders.size > 0) return;

    // Add default promo codes
    this.seedDefaultPromoCodes();
  }
}

export const marketplaceStore = new MarketplaceStore();
