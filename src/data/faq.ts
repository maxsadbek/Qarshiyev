import type { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  // Umumiy
  {
    id: '1',
    question: 'Qarshiyev Ta\'lim Markazi boshqa til maktablaridan nimasi bilan farq qiladi?',
    answer: 'Qarshiyev Ta\'lim Markazi xalqaro sertifikatlangan o\'qituvchilar, premium ta\'lim muhiti va ma\'lumotlarga asoslangan o\'qitish metodologiyasini birlashtiradi. O\'qituvchilarimiz Cambridge CELTA, DELTA va boshqa xalqaro tan olingan malakaga ega. Har bir o\'quvchiga shaxsiy e\'tibor ta\'minlash uchun guruh hajmini cheklab (maksimum 12 o\'quvchi) qo\'yamiz va 96% muvaffaqiyat ko\'rsatkichimiz o\'z navbatida gapiradi. Biz shunchaki til maktabi emasmiz — biz xalqaro imkoniyatlarga poydevor yaratamiz.',
    category: 'General',
  },
  {
    id: '2',
    question: 'Men uchun to\'g\'ri kursni qanday tanlash kerak?',
    answer: 'Har bir istiqbolli o\'quvchiga bepul 30 daqiqalik maslahat va darajani aniqlash testi taklif etamiz. Bizning akademik maslahatchilarimiz sizning joriy ingliz tili darajangizni baholaydi, maqsadlaringizni (universitetga kirish, karyera yuksalishi, sayohat va h.k.) tushunadi va eng mos dasturni tavsiya etadi. Bu maslahatni veb-saytimiz orqali yoki ofisimizga qo\'ng\'iroq qilib band qilishingiz mumkin.',
    category: 'General',
  },
  {
    id: '3',
    question: 'Qaysi yosh guruhlarini qabul qilasiz?',
    answer: 'Biz 8 yoshdan boshlab o\'quvchilarni qabul qilamiz. Yosh o\'quvchilar dasturimiz 8–14 yoshdagi o\'quvchilar uchun, O\'smirlar Dasturi 14–18 yoshlilar uchun, Kattalar Dasturlari esa 18 va undan katta yoshdagilar uchun mo\'ljallangan. Har bir dastur yoshga mos materiallar va o\'qitish yondashuvlaridan foydalanadi.',
    category: 'General',
  },
  // Kurslar
  {
    id: '4',
    question: 'IELTS tayyorgarlik kursi qancha davom etadi?',
    answer: 'Bizning standart IELTS Intensiv Tayyorgarlik kursimiz haftada 6 soat sinf vaqti bilan 3 oy davom etadi. 8+ ballni maqsad qilgan o\'quvchilar uchun 2 oylik Ilg\'or IELTS dasturimizni tavsiya etamiz. Quyi darajadan boshlaydigan boshlang\'ich o\'quvchilar uchun Umumiy Ingliz Tili va ardidan IELTS tayyorgarligini o\'z ichiga olgan 6 oylik yo\'nalisharni tavsiya etamiz.',
    category: 'Courses',
  },
  {
    id: '5',
    question: 'Guruh hajmi qanday?',
    answer: 'Imtihon tayyorgarligi kurslari (IELTS, SAT, Cambridge) uchun bir guruhda maksimum 12 ta o\'quvchi bo\'lishini qat\'iy talab qilamiz. Umumiy Ingliz Tili kurslarida maksimum 15 ta o\'quvchi bo\'ladi. Bu har bir o\'quvchi har bir seansdа muhim o\'qituvchi muloqoti va shaxsiy fikr-mulohaza olishini ta\'minlaydi.',
    category: 'Courses',
  },
  {
    id: '6',
    question: 'Kurs boshlanib ketgandan so\'ng unga kirish mumkinmi?',
    answer: 'Ko\'p holatlarda, ha — Umumiy Ingliz Tili kurslariga. Imtihon tayyorgarligi kurslari uchun barcha talab qilinadigan mavzularni qamrab olganligingizni ta\'minlash maqsadida tsiklning boshidan boshlashni tavsiya etamiz. Bizga murojaat qiling va jamoamiz sizning darajangiz va kurs taraqqiyotiga asoslanib eng yaxshi kirish nuqtasi haqida maslahat beradi.',
    category: 'Courses',
  },
  // Ro'yxatdan o'tish
  {
    id: '7',
    question: 'Kursga qanday ro\'yxatdan o\'tish mumkin?',
    answer: 'Uch usulda ro\'yxatdan o\'tishingiz mumkin: (1) Markazimizga shaxsan tashrif buyuring va qabul jamoamiz bilan gaplashing, (2) Veb-saytimizda onlayn ro\'yxatdan o\'tish formasini to\'ldiring, yoki (3) Telegram yoki telefon orqali biz bilan bog\'laning. Biz darajani aniqlash testini tashkil etamiz va 24 soat ichida dars jadvalini tasdiqlaymiz.',
    category: 'Enrollment',
  },
  {
    id: '8',
    question: 'Darajani aniqlash testi bormi?',
    answer: 'Ha. Barcha yangi o\'quvchilar ro\'yxatdan o\'tishdan oldin bepul darajani aniqlash testini topshiradilar. Ushbu 45 daqiqalik test o\'qish, tinglash, grammatika va yozish ko\'nikmalarini baholaydi va sizni eng mos darajaga joylashtirish uchun mo\'ljallangan. O\'tish/yiqilish yo\'q — bu faqat aniq kurs joylashtirish uchun.',
    category: 'Enrollment',
  },
  // To'lov
  {
    id: '9',
    question: 'Qanday to\'lov usullarini qabul qilasiz?',
    answer: 'Naqd pul, bank o\'tkazma va O\'zbekistonning barcha yirik to\'lov tizimlari (Payme, Click, Uzcard) qabul qilinadi. 3 oy va undan ko\'p davom etadigan barcha kurslar uchun oylik to\'lov rejalari mavjud. To\'liq kurs to\'lovini oldindan to\'lashda 10% erta ro\'yxatdan o\'tish chegirmasi qo\'llaniladi.',
    category: 'Fees & Payment',
  },
  {
    id: '10',
    question: 'Qaytarish siyosati bormi?',
    answer: 'Ha. Kursning dastlabki 7 kunida chiqib ketgan o\'quvchilar ma\'muriy to\'lovni ayirib tashlagan holda to\'liq qaytarishga erishadilar. 7–30 kun orasida 50% qaytariladi. 30 kundan keyin kurs to\'lovlari qaytarilmaydi. Barcha qaytarish so\'rovlari yozma ravishda topshirilishi kerak.',
    category: 'Fees & Payment',
  },
  // Sertifikatlar
  {
    id: '11',
    question: 'Kursni tugatganda sertifikat olamanmi?',
    answer: 'To\'liq kursni tugatgan va minimal davomat talabini (80%) bajargan barcha o\'quvchilar Qarshiyev Ta\'lim Markazi Bitirish Sertifikatini oladilar. Bundan tashqari, biz sizni rasmiy sinovxonalarda toʻplagan rasmiy xalqaro sertifikatlarga (IELTS, Cambridge, SAT) yo\'llashimiz va tayyorlashimiz mumkin.',
    category: 'Certificates',
  },
  {
    id: '12',
    question: 'Sertifikatlaringiz xalqaro darajada tan olinadimi?',
    answer: 'Bizning ichki bitirish sertifikatlarimiz O\'zbekistondagi hamkor universitetlar va ish beruvchilar tomonidan tan olingan. Xalqaro tan olinish uchun rasmiy imtihon sertifikati (IELTS, Cambridge B2/C1, TOEFL va h.k.) talab qilinadi, biz sizni bunga to\'liq tayyorlaymiz. Tayyorlangan o\'quvchilarimiz orasida 96% topshirish darajasiga egamiz.',
    category: 'Certificates',
  },
  // Jadval
  {
    id: '13',
    question: 'Ish vaqtingiz qanday?',
    answer: 'Markazimiz dushanba-shanba kunlari 08:00–21:00 gacha ochiq. Darslar ertalab (08:00–12:00), kunduzi (13:00–17:00) va kechqurun (17:00–21:00) slotlarida rejalashtirilgan. Jadval cheklovi bo\'lgan o\'quvchilar uchun onlayn seanslari ham taklif etamiz. Markaz yakshanba va jamoat bayramlarida yopiq bo\'ladi.',
    category: 'Schedule',
  },
  {
    id: '14',
    question: 'Onlayn o\'qish mumkinmi?',
    answer: 'Ha! Barcha kurslarimiz uchun to\'liq onlayn ta\'lim imkoniyati mavjud. Onlayn o\'quvchilar jonli video seanslari, interaktiv doskalar va 30 kunlik yozib olingan dars kirish imkoniyatiga ega virtual sinf platformamizdan foydalanadilar. Onlayn tajriba shaxsiy darslarimiz kabi interaktiv va samaraldir.',
    category: 'Schedule',
  },
];

export const faqCategories: FAQItem['category'][] = [
  'General',
  'Courses',
  'Enrollment',
  'Fees & Payment',
  'Certificates',
  'Schedule',
];
