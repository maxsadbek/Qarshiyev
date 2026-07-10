import type { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  // General
  {
    id: '1',
    question: 'What makes Qarshiyev Education Center different from other language schools?',
    answer: 'Qarshiyev Education Center combines internationally certified instructors, a premium learning environment, and a data-driven teaching methodology. Our instructors hold Cambridge CELTA, DELTA, and other internationally recognized qualifications. We maintain small class sizes (max 12 students) to ensure individual attention, and our 96% success rate speaks for itself. We are not just a language school — we are a launchpad to international opportunities.',
    category: 'General',
  },
  {
    id: '2',
    question: 'How do I choose the right course for me?',
    answer: 'We offer a free 30-minute consultation and placement test to every prospective student. Our academic advisors will assess your current English level, understand your goals (university admission, career advancement, travel, etc.), and recommend the most suitable program. You can book this consultation directly through our website or by calling our office.',
    category: 'General',
  },
  {
    id: '3',
    question: 'What age groups do you accept?',
    answer: 'We welcome students from age 8 upwards. Our Young Learners program is designed for students aged 8–14, our Teen Program for 14–18, and our Adult Programs for 18 and above. Each program uses age-appropriate materials and teaching approaches.',
    category: 'General',
  },
  // Courses
  {
    id: '4',
    question: 'How long does an IELTS preparation course take?',
    answer: 'Our standard IELTS Intensive Preparation course is 3 months long with 6 hours of class time per week. For students targeting Band 8+, we recommend our 2-month Advanced IELTS program. For beginners starting from a lower level, we recommend a 6-month track that includes General English followed by IELTS preparation.',
    category: 'Courses',
  },
  {
    id: '5',
    question: 'What is the class size?',
    answer: 'We maintain a strict maximum of 12 students per class for exam preparation courses (IELTS, SAT, Cambridge). General English classes have a maximum of 15 students. This ensures every student receives meaningful teacher interaction and personalized feedback in every session.',
    category: 'Courses',
  },
  {
    id: '6',
    question: 'Can I join a course after it has started?',
    answer: 'In most cases, yes — for General English courses. For exam preparation courses, we recommend starting from the beginning of a cycle to ensure you cover all required content. Contact us and our team will advise you on the best entry point based on your level and the course progress.',
    category: 'Courses',
  },
  // Enrollment
  {
    id: '7',
    question: 'How do I enroll in a course?',
    answer: 'You can enroll in three ways: (1) Visit our center in person and speak with our admissions team, (2) Fill out our online enrollment form on the website, or (3) Contact us via Telegram or phone. We will arrange a placement test and confirm your class schedule within 24 hours.',
    category: 'Enrollment',
  },
  {
    id: '8',
    question: 'Is there a placement test?',
    answer: 'Yes. All new students take a free placement test before enrollment. This 45-minute test assesses reading, listening, grammar, and writing skills to place you in the most appropriate level. There is no pass/fail — it is purely for accurate course placement.',
    category: 'Enrollment',
  },
  // Fees & Payment
  {
    id: '9',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, bank transfer, and all major Uzbek payment systems (Payme, Click, Uzcard). Monthly payment plans are available for all courses lasting 3 months or more. A 10% early enrollment discount applies when you pay the full course fee upfront.',
    category: 'Fees & Payment',
  },
  {
    id: '10',
    question: 'Is there a refund policy?',
    answer: 'Yes. Students who withdraw within the first 7 days of a course receive a full refund minus an administrative fee. Between days 7–30, a 50% refund applies. After 30 days, course fees are non-refundable. All refund requests must be submitted in writing.',
    category: 'Fees & Payment',
  },
  // Certificates
  {
    id: '11',
    question: 'Will I receive a certificate upon completion?',
    answer: 'All students who complete a full course and meet the minimum attendance requirement (80%) receive a Qarshiyev Education Center Completion Certificate. Additionally, we guide and prepare you for official international certifications (IELTS, Cambridge, SAT) which you take at official testing centers.',
    category: 'Certificates',
  },
  {
    id: '12',
    question: 'Are your certificates recognized internationally?',
    answer: 'Our internal completion certificates are recognized by partner universities and employers in Uzbekistan. For international recognition, you will need an official examination certificate (IELTS, Cambridge B2/C1, TOEFL, etc.) which we fully prepare you for. We have a 96% pass rate for our prepared students.',
    category: 'Certificates',
  },
  // Schedule
  {
    id: '13',
    question: 'What are your operating hours?',
    answer: 'Our center is open Monday to Saturday, 08:00–21:00. Classes are scheduled in morning (08:00–12:00), afternoon (13:00–17:00), and evening (17:00–21:00) slots. We also offer online sessions for students with scheduling constraints. The center is closed on Sundays and public holidays.',
    category: 'Schedule',
  },
  {
    id: '14',
    question: 'Can I study online?',
    answer: 'Yes! We offer a fully online learning option for all our courses. Online students use our virtual classroom platform with live video sessions, interactive whiteboards, and recorded lesson access for 30 days. The online experience is as interactive and effective as our in-person classes.',
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
