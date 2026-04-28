export type PortfolioCategory = 'app' | 'community' | 'hobby';

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  href?: string;
  description?: string;
};

export const portfolioFilters: { id: PortfolioCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'Web Apps' },
  { id: 'community', label: 'Community' },
  { id: 'hobby', label: 'Hobby' },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'star-eighty-six',
    title: 'Star-Eighty-Six',
    category: 'app',
    image: '/img/portfolio/star-eighty-six.png',
    description: 'Anonymous voice memo platform with transcripts and emoji reactions.',
  },
  {
    id: 'dexter',
    title: 'Project Dexter',
    category: 'app',
    image: '/img/portfolio/dexter.jpg',
    href: 'https://github.com/ruvvet/project-dexter',
    description: 'Raspberry Pi pet camera with ML dog detection.',
  },
  {
    id: 'otp',
    title: 'OTP — Friend Finder',
    category: 'app',
    image: '/img/portfolio/portfolio-otp.gif',
    href: 'https://github.com/ruvvet/otp-ui',
    description: 'Tinder-style app for connecting gamers.',
  },
  {
    id: 'untitled-game',
    title: 'Untitled Game',
    category: 'app',
    image: '/img/portfolio/portfolio-untitled-game.gif',
    href: 'https://ruvvet.github.io/untitled-game',
    description: 'Vanilla JS arcade-style canvas game.',
  },
  {
    id: 'uwumoji',
    title: 'UwuMoji',
    category: 'app',
    image: '/img/portfolio/portfolio-uwumoji.gif',
    href: 'https://github.com/ruvvet/uwumoji-app',
    description: 'Discord emoji manager with a bot integration.',
  },
  {
    id: 'wapp',
    title: 'WApp — Water Tracker',
    category: 'app',
    image: '/img/portfolio/portfolio-wapp.gif',
    href: 'https://github.com/WAPP-Water-App',
    description: 'Personalized hydration tracking app.',
  },
  {
    id: 'react-tictactoe',
    title: 'React Tic-Tac-Toe',
    category: 'app',
    image: '/img/portfolio/react-tictactoe.gif',
    href: 'https://ruvvet.github.io/react-tictactoe/',
    description: 'A React take on the classic.',
  },
  {
    id: 'ela',
    title: 'ELA',
    category: 'community',
    image: '/img/portfolio/ela-gif.gif',
    href: 'https://twitter.com/ruvvet/status/1205262302414422017',
    description: 'Rainbow Six Siege community moment.',
  },
  {
    id: 'caveira',
    title: 'Caveira Cosplay',
    category: 'hobby',
    image: '/img/portfolio/cav.jpg',
    description: 'Caveira (Rainbow Six Siege) cosplay.',
  },
  {
    id: 'dokkaebi',
    title: 'Dokkaebi Cosplay',
    category: 'hobby',
    image: '/img/portfolio/dokk.jpg',
    description: 'Dokkaebi (Rainbow Six Siege) cosplay.',
  },
  {
    id: 'bunnycups',
    title: 'Bunny Cups',
    category: 'hobby',
    image: '/img/portfolio/bunnycups.jpg',
    description: 'Hand-painted bunny mug.',
  },
  {
    id: 'panther',
    title: 'Panther',
    category: 'hobby',
    image: '/img/portfolio/panther.jpg',
    description: 'Panther artwork.',
  },
];
