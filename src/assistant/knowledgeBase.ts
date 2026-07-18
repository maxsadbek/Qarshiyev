import school from './data/school.json';
import courses from './data/courses.json';
import pricing from './data/pricing.json';
import faq from './data/faq.json';
import contacts from './data/contacts.json';
import schedule from './data/schedule.json';
import branches from './data/branches.json';
import teachers from './data/teachers.json';
import news from './data/news.json';
import admission from './data/admission.json';

import type { KnowledgeBase, SearchDoc } from './types';

export const knowledgeBase: KnowledgeBase = {
  school: school as KnowledgeBase['school'],
  courses: courses as KnowledgeBase['courses'],
  pricing: pricing as KnowledgeBase['pricing'],
  faq: faq as KnowledgeBase['faq'],
  contacts: contacts as KnowledgeBase['contacts'],
  schedule: schedule as KnowledgeBase['schedule'],
  branches: branches as KnowledgeBase['branches'],
  teachers: teachers as KnowledgeBase['teachers'],
  news: news as KnowledgeBase['news'],
  admission: admission as KnowledgeBase['admission'],
};

const fmt = (n: number) => new Intl.NumberFormat('uz-UZ').format(n);

/**
 * Flatten the structured knowledge base into a single set of searchable
 * documents. Adding data only requires editing the JSON files above.
 */
function buildSearchDocs(kb: KnowledgeBase): SearchDoc[] {
  const docs: SearchDoc[] = [];

  // School
  docs.push({
    id: 'school',
    category: 'school',
    title: kb.school.name,
    content: `${kb.school.name}. ${kb.school.tagline}. ${kb.school.description} Missiyamiz: ${kb.school.mission}. Qadriyatlar: ${kb.school.values.join(', ')}. Muvaffaqiyat: ${kb.school.successRate}%. Filiallar: ${kb.school.branches}. O'qituvchilar: ${kb.school.teachersCount}. O'quvchilar: ${kb.school.studentsCount}. Yosh guruhlari: ${kb.school.ageGroups.map((a) => `${a.group} (${a.range})`).join(', ')}.`,
    keywords: ['maktab', 'school', 'haqida', 'about', 'qadriyat', 'missiya', 'tarix'],
    source: 'school.json',
  });

  // Courses
  for (const c of kb.courses) {
    docs.push({
      id: `course-${c.id}`,
      category: 'courses',
      title: c.title,
      content: `${c.title}. Kategoriya: ${c.category}. Daraja: ${c.level}. Davomiyligi: ${c.duration}. Darslar: ${c.lessons}. Jadval: ${c.schedule}. Til: ${c.language}. Sertifikat: ${c.certificate ? 'Ha' : 'Yo\'q'}. ${c.description} ${c.shortDescription} Narxi: ${fmt(c.price)} UZS${c.discountPrice ? `, chegirma: ${fmt(c.discountPrice)} UZS` : ''}.`,
      keywords: [c.category, ...c.tags, 'kurs', 'course'],
      source: 'courses.json',
      raw: c,
    });
  }

  // Pricing
  for (const p of kb.pricing) {
    docs.push({
      id: `price-${p.id}`,
      category: 'pricing',
      title: `Narx: ${p.courseTitle}`,
      content: `${p.courseTitle} kursi narxi: ${fmt(p.price)} ${p.currency} (${p.period}).${p.discountPrice ? ` Chegirma narxi: ${fmt(p.discountPrice)} ${p.currency}.` : ''} Bo'lib to'lash: ${p.installments ? 'Mavjud' : 'Yo\'q'}. Erta to'lov chegirmasi: ${p.earlyBirdDiscount}%. To'lov usullari: ${p.paymentMethods.join(', ')}. Qaytarish: ${p.refundPolicy} ${p.notes}`,
      keywords: ['narx', 'price', 'pul', 'tolov', 'tuit', 'tuition', 'chegirma', p.category],
      source: 'pricing.json',
      raw: p,
    });
  }

  // FAQ
  for (const f of kb.faq) {
    docs.push({
      id: `faq-${f.id}`,
      category: 'faq',
      title: f.question,
      content: `Savol: ${f.question} Javob: ${f.answer}`,
      keywords: [f.category, ...f.keywords],
      source: 'faq.json',
      raw: f,
    });
  }

  // Contacts
  docs.push({
    id: 'contacts',
    category: 'contacts',
    title: 'Kontakt ma\'lumotlari',
    content: `Telefon: ${kb.contacts.phone}, qo'shimcha: ${kb.contacts.phone2}. Email: ${kb.contacts.email}. Qabul: ${kb.contacts.admissionEmail}. Telegram: ${kb.contacts.telegram}. Instagram: ${kb.contacts.instagram}. Manzil: ${kb.contacts.address}. Ish vaqti: ${kb.contacts.workingHours.map((w) => `${w.day} ${w.hours}`).join(', ')}.`,
    keywords: ['kontakt', 'contact', 'telefon', 'phone', 'email', 'manzil', 'address', 'telegram'],
    source: 'contacts.json',
  });

  // Schedule
  const todayLessons = kb.schedule.today.lessons
    .map((l) => `${l.course} — ${l.time} (${l.room})`)
    .join('; ');
  docs.push({
    id: 'schedule',
    category: 'schedule',
    title: 'Dars jadvali va ish vaqti',
    content: `Ish vaqti (${kb.schedule.timezone}): ${kb.schedule.weekdays.map((w) => `${w.day} ${w.hours}`).join(', ')}. Slotlar: ${kb.schedule.slots.map((s) => `${s.period} ${s.time}`).join(', ')}. Onlayn o'qish: ${kb.schedule.onlineAvailable ? 'Mavjud' : 'Yo\'q'}. Bugungi darslar: ${todayLessons}.`,
    keywords: ['jadval', 'schedule', 'vaqt', 'time', 'dars', 'online', 'onlayn', 'bugun'],
    source: 'schedule.json',
  });

  // Branches
  for (const b of kb.branches) {
    docs.push({
      id: `branch-${b.id}`,
      category: 'branches',
      title: b.name,
      content: `${b.name}. Shahar: ${b.city}, ${b.region}. Manzil: ${b.address}. Telefon: ${b.phone}. Asosiy filial: ${b.isMain ? 'Ha' : 'Yo\'q'}. Imkoniyatlar: ${b.facilities.join(', ')}. Ish vaqti: ${b.hours}.`,
      keywords: ['filial', 'branch', 'manzil', 'address', 'joy', b.city, b.region],
      source: 'branches.json',
      raw: b,
    });
  }

  // Teachers
  for (const t of kb.teachers) {
    docs.push({
      id: `teacher-${t.id}`,
      category: 'teachers',
      title: t.name,
      content: `${t.name} — ${t.title}. Mutaxassislik: ${t.specialization.join(', ')}. Tajriba: ${t.experience} yil. Reyting: ${t.rating}. Tillar: ${t.languages.join(', ')}. ${t.bio}`,
      keywords: ['oqituvchi', 'teacher', 'ustoz', ...t.specialization, t.name],
      source: 'teachers.json',
      raw: t,
    });
  }

  // News / Events
  for (const n of kb.news) {
    docs.push({
      id: `news-${n.id}`,
      category: 'news',
      title: n.title,
      content: `${n.type === 'event' ? 'Tadbir' : 'Yangilik'}: ${n.title}. Sana: ${n.date}. ${n.summary}`,
      keywords: ['yangilik', 'news', 'tadbir', 'event', n.category, n.date],
      source: 'news.json',
      raw: n,
    });
  }

  // Admission
  docs.push({
    id: 'admission',
    category: 'admission',
    title: 'Qabul jarayoni',
    content: `Qabul bosqichlari: ${kb.admission.steps.map((s) => `${s.step}. ${s.title} — ${s.description}`).join(' ')} Talablar: ${kb.admission.requirements.join(', ')}. Bepul maslahat: ${kb.admission.freeConsultation ? 'Ha' : 'Yo\'q'} (${kb.admission.consultationDuration}). ${kb.admission.startAnytime}. Aloqa: ${kb.admission.contact.admissionsEmail}, ${kb.admission.contact.phone}, ${kb.admission.contact.telegram}.`,
    keywords: ['qabul', 'admission', 'royxat', 'register', 'registratsiya', 'boshlash', 'ariza'],
    source: 'admission.json',
  });

  return docs;
}

export const searchDocs: SearchDoc[] = buildSearchDocs(knowledgeBase);

