import type { Partner } from '../types';

export const partners: Partner[] = [
  { id: '1', name: 'British Council', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/British_Council_logo.svg/1200px-British_Council_logo.svg.png', website: 'https://britishcouncil.org', type: 'Government' },
  { id: '2', name: 'Cambridge Assessment English', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Cambridge_Assessment_English_logo.svg/1200px-Cambridge_Assessment_English_logo.svg.png', website: 'https://cambridgeenglish.org', type: 'Publisher' },
  { id: '3', name: 'IDP Education', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/IDP_Education_Logo.svg/1200px-IDP_Education_Logo.svg.png', website: 'https://idp.com', type: 'University' },
  { id: '4', name: 'Pearson Education', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pearson_logo_2019.svg/1200px-Pearson_logo_2019.svg.png', website: 'https://pearson.com', type: 'Publisher' },
  { id: '5', name: 'ETS TOEFL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/ETS_logo.svg/1200px-ETS_logo.svg.png', website: 'https://ets.org', type: 'Government' },
  { id: '6', name: 'Oxford University Press', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-university-press-logo.svg/1200px-Oxford-university-press-logo.svg.png', website: 'https://oup.com', type: 'Publisher' },
  { id: '7', name: 'Macmillan Education', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Macmillan_Publishers_logo.svg/1200px-Macmillan_Publishers_logo.svg.png', website: 'https://macmillaneducation.com', type: 'Publisher' },
  { id: '8', name: 'Coventry University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Coventry_University_logo.svg/1200px-Coventry_University_logo.svg.png', website: 'https://coventry.ac.uk', type: 'University' },
];

// Fallback text-based partners (rendered as stylized text if logo fails)
export const partnerNames = [
  'British Council',
  'Cambridge English',
  'IDP Education',
  'Pearson',
  'ETS TOEFL',
  'Oxford Press',
  'Macmillan',
  'Coventry University',
  'University of Leeds',
  'Purdue University',
  'TU Berlin',
  'Study Abroad Center',
];

