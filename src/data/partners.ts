import type { Partner } from '../types';

export const partners: Partner[] = [
  { id: '1', name: 'ETS TOEFL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/ETS_logo.svg/1200px-ETS_logo.svg.png', website: 'https://ets.org', type: 'Government' },
  { id: '2', name: 'Macmillan Education', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Macmillan_Publishers_logo.svg/1200px-Macmillan_Publishers_logo.svg.png', website: 'https://macmillaneducation.com', type: 'Publisher' },
  { id: '3', name: 'Pearson Education', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pearson_logo_2019.svg/1200px-Pearson_logo_2019.svg.png', website: 'https://pearson.com', type: 'Publisher' },
];

// Fallback text-based partners (rendered as stylized text if logo fails)
export const partnerNames = [
  'ETS TOEFL',
  'Macmillan Education',
  'Pearson Education',
];

