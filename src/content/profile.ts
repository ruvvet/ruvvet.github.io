export type SocialLink = {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'instagram';
};

export type InfoItem = {
  label: string;
  value: string;
  href?: string;
};

export const profile = {
  name: 'Jenny Feng',
  shortName: 'JF',
  tagline: 'Software Engineer',
  typedPhrases: [
    'Software Engineer',
    'Gamer',
    'Esports Lover',
    'Cosplayer',
  ] as const,
  avatar: '/img/pfp3.jpg',
  bio: [
    'Software Engineer with a hunger for learning. Competitive but humble. Critical thinker with an open mind. I write in code, but I know how to communicate with empathy.',
    'Life goals: be a positive force while doing awesome stuff, make an impact pioneering new things, and work together to make people happy.',
  ],
  email: 'finej01@gmail.com',
  phone: '+1-919-916-0290',
  website: 'https://www.ruvvet.com',
  resumePdf: '/resume.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/ruvvet', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jcfeng/', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/ruvvet', icon: 'twitter' },
    { label: 'Instagram', href: 'https://www.instagram.com/ruvvet/', icon: 'instagram' },
  ] satisfies SocialLink[],
  info: [
    { label: 'Email', value: 'finej01@gmail.com', href: 'mailto:finej01@gmail.com' },
    { label: 'Website', value: 'www.ruvvet.com', href: 'https://www.ruvvet.com' },
    { label: 'Phone', value: '+1-919-916-0290' },
    { label: 'Current Role', value: 'Software Engineer @ Jewelers Mutual Insurance Group' },
    { label: 'Education', value: 'M.S. Information Science @ UNC-CH · B.A. Biology/Economics @ Duke' },
  ] satisfies InfoItem[],
};
