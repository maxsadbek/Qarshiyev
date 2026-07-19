/**
 * src/modules/marketplace/types.ts
 * Types, constants, and configuration for the FreeBuff gaming marketplace bot.
 */

// ── Services ────────────────────────────────────────────────────────
export interface ServiceItem {
  key: string;
  emoji: string;
  name: Record<LangCode, string>;
  description: Record<LangCode, string>;
  basePrice: number; // in your currency unit
}

export const SERVICES: ServiceItem[] = [
  { key: 'level_farming', emoji: '🔥', name: { uz: 'Level Farming', ru: 'Level Farming', en: 'Level Farming' }, description: { uz: 'Tezkor level ko\'tarish', ru: 'Быстрая прокачка уровня', en: 'Fast level boosting' }, basePrice: 5 },
  { key: 'money_farming', emoji: '💎', name: { uz: 'Money Farming', ru: 'Money Farming', en: 'Money Farming' }, description: { uz: 'Pul yig\'ish', ru: 'Фарминг денег', en: 'In-game currency farming' }, basePrice: 3 },
  { key: 'fruit_farming', emoji: '🍇', name: { uz: 'Fruit Farming', ru: 'Fruit Farming', en: 'Fruit Farming' }, description: { uz: 'Meva yig\'ish', ru: 'Сбор фруктов', en: 'Fruit harvesting' }, basePrice: 4 },
  { key: 'raid_service', emoji: '👹', name: { uz: 'Raid Service', ru: 'Raid Service', en: 'Raid Service' }, description: { uz: 'Raidlarda yordam', ru: 'Помощь в рейдах', en: 'Raid assistance' }, basePrice: 8 },
  { key: 'boss_farming', emoji: '⚔', name: { uz: 'Boss Farming', ru: 'Boss Farming', en: 'Boss Farming' }, description: { uz: 'Bosslarni yengish', ru: 'Фарминг боссов', en: 'Boss defeating' }, basePrice: 10 },
  { key: 'race_v4', emoji: '🏴', name: { uz: 'Race V4', ru: 'Race V4', en: 'Race V4' }, description: { uz: 'Race V4 ochish', ru: 'Открытие Race V4', en: 'Race V4 unlock' }, basePrice: 15 },
  { key: 'race_awakening', emoji: '🧬', name: { uz: 'Race Awakening', ru: 'Race Awakening', en: 'Race Awakening' }, description: { uz: 'Race uyg\'otish', ru: 'Пробуждение расы', en: 'Race awakening' }, basePrice: 12 },
  { key: 'leviathan', emoji: '🪽', name: { uz: 'Leviathan', ru: 'Leviathan', en: 'Leviathan' }, description: { uz: 'Leviathan boss', ru: 'Босс Левиафан', en: 'Leviathan boss' }, basePrice: 20 },
  { key: 'fragments', emoji: '⚡', name: { uz: 'Fragments', ru: 'Fragments', en: 'Fragments' }, description: { uz: 'Fragment yig\'ish', ru: 'Сбор фрагментов', en: 'Fragment farming' }, basePrice: 6 },
  { key: 'sea_events', emoji: '🌊', name: { uz: 'Sea Events', ru: 'Sea Events', en: 'Sea Events' }, description: { uz: 'Dengiz eventlari', ru: 'Морские события', en: 'Sea events' }, basePrice: 7 },
  { key: 'gamepasses', emoji: '🎁', name: { uz: 'Gamepasses', ru: 'Gamepasses', en: 'Gamepasses' }, description: { uz: 'Gamepass xaridi', ru: 'Покупка Gamepass', en: 'Gamepass purchase' }, basePrice: 25 },
  { key: 'cdk', emoji: '💀', name: { uz: 'CDK', ru: 'CDK', en: 'CDK' }, description: { uz: 'CDK olish', ru: 'Получение CDK', en: 'CDK obtain' }, basePrice: 30 },
  { key: 'soul_guitar', emoji: '👑', name: { uz: 'Soul Guitar', ru: 'Soul Guitar', en: 'Soul Guitar' }, description: { uz: 'Soul Guitar olish', ru: 'Получение Soul Guitar', en: 'Soul Guitar unlock' }, basePrice: 18 },
  { key: 'kitsune_shrine', emoji: '⚓', name: { uz: 'Kitsune Shrine', ru: 'Kitsune Shrine', en: 'Kitsune Shrine' }, description: { uz: 'Kitsune shrine', ru: 'Кицунэ святилище', en: 'Kitsune Shrine' }, basePrice: 14 },
  { key: 'dragon_tokens', emoji: '🐉', name: { uz: 'Dragon Tokens', ru: 'Dragon Tokens', en: 'Dragon Tokens' }, description: { uz: 'Dragon Token yig\'ish', ru: 'Сбор Dragon Token', en: 'Dragon Token farming' }, basePrice: 9 },
  { key: 'custom_order', emoji: '🎯', name: { uz: 'Custom Order', ru: 'Custom Order', en: 'Custom Order' }, description: { uz: 'Maxsus buyurtma', ru: 'Индивидуальный заказ', en: 'Custom order' }, basePrice: 0 },
];

// ── Games ───────────────────────────────────────────────────────────
export interface GameItem {
  key: string;
  emoji: string;
  name: Record<LangCode, string>;
}

export const GAMES: GameItem[] = [
  { key: 'blox_fruits', emoji: '🍎', name: { uz: 'Blox Fruits', ru: 'Blox Fruits', en: 'Blox Fruits' } },
  { key: 'king_legacy', emoji: '👑', name: { uz: 'King Legacy', ru: 'King Legacy', en: 'King Legacy' } },
  { key: 'grand_piece', emoji: '🏴‍☠️', name: { uz: 'Grand Piece', ru: 'Grand Piece', en: 'Grand Piece' } },
  { key: 'project_slayer', emoji: '⚔️', name: { uz: 'Project Slayer', ru: 'Project Slayer', en: 'Project Slayer' } },
  { key: 'aopg', emoji: '🌟', name: { uz: 'A One Piece Game', ru: 'A One Piece Game', en: 'A One Piece Game' } },
  { key: 'mini_world', emoji: '🌍', name: { uz: 'Mini World', ru: 'Mini World', en: 'Mini World' } },
  { key: 'minecraft', emoji: '⛏', name: { uz: 'Minecraft', ru: 'Minecraft', en: 'Minecraft' } },
  { key: 'other', emoji: '🎮', name: { uz: 'Boshqa', ru: 'Другое', en: 'Other' } },
];

// ── Platforms ───────────────────────────────────────────────────────
export const PLATFORMS = ['PC', 'Mobile', 'Console', 'Cross-Platform'];

// ── Order Status ────────────────────────────────────────────────────
export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'CANCELLED';

export const ORDER_STATUS_META: Record<OrderStatus, { emoji: string; label: Record<LangCode, string> }> = {
  PENDING: { emoji: '🟡', label: { uz: 'Kutilmoqda', ru: 'В ожидании', en: 'Pending' } },
  ACCEPTED: { emoji: '🔵', label: { uz: 'Qabul qilindi', ru: 'Принято', en: 'Accepted' } },
  IN_PROGRESS: { emoji: '🟠', label: { uz: 'Jarayonda', ru: 'В процессе', en: 'In Progress' } },
  COMPLETED: { emoji: '🟢', label: { uz: 'Bajarildi', ru: 'Завершено', en: 'Completed' } },
  REJECTED: { emoji: '🔴', label: { uz: 'Rad etildi', ru: 'Отклонено', en: 'Rejected' } },
  CANCELLED: { emoji: '⚪', label: { uz: 'Bekor qilindi', ru: 'Отменено', en: 'Cancelled' } },
};

export type LangCode = 'uz' | 'ru' | 'en';

// ── Order Data ──────────────────────────────────────────────────────
export interface OrderData {
  game: string;
  service: string;
  quantity: number;
  username: string;
  platform: string;
  notes: string;
  promoCode?: string;
}

// ── Wizard State ────────────────────────────────────────────────────
export interface OrderWizardState {
  language: LangCode;
  game?: string;
  service?: string;
  quantity?: number;
  username?: string;
  platform?: string;
  notes?: string;
  promoCode?: string;
}

export interface ReviewWizardState {
  language: LangCode;
  orderId?: string;
  rating?: number;
  text?: string;
}

// ── Referral ────────────────────────────────────────────────────────
export const REFERRAL_BONUS_PERCENT = 10; // 10% bonus for both users
export const REFERRAL_CODE_LENGTH = 8;
