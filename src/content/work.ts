export type WorkItem = {
  id: string;
  title: string;
  image?: string;
  tags: string[];
  description: string;
  href?: string;
};

export const workItems: WorkItem[] = [
  {
    id: 'star-eighty-six',
    title: 'Star-Eighty-Six',
    image: '/img/portfolio/star-eighty-six.png',
    tags: ['React Remix', 'TypeScript', 'Prisma', 'ShadCN', 'Google Cloud'],
    description:
      'Inspired by r/unsentletters: record anonymous voicemails for anyone. Voice memos auto-expire. Includes Google speech-to-text transcripts, emoji reactions, and tags.',
  },
  {
    id: 'dexter',
    title: 'Project Dexter — Raspberry Pi Pet Camera',
    image: '/img/portfolio/dexter.jpg',
    tags: ['Raspberry Pi', 'Python', 'ML'],
    description:
      'A Pi camera + sound sensor that triggers when the doggy bell is rung, runs an ML model to confirm a dog is in frame, and posts to Slack via a bot.',
    href: 'https://github.com/ruvvet/project-dexter',
  },
  {
    id: 'otp',
    title: 'OTP — Friend Finder',
    image: '/img/portfolio/portfolio-otp.gif',
    tags: ['React', 'Express', 'TypeScript', 'TypeORM', 'Socket.io'],
    description: 'Tinder-style app that connects gamers with other gamers based on shared interests.',
    href: 'https://github.com/ruvvet/otp-ui',
  },
  {
    id: 'wapp',
    title: 'WApp — Water Tracking',
    image: '/img/portfolio/portfolio-wapp.gif',
    tags: ['React', 'Express', 'MongoDB', 'Mongoose'],
    description: 'Hydration tracking app personalized to each user profile.',
    href: 'https://github.com/WAPP-Water-App',
  },
  {
    id: 'uwumoji',
    title: 'UwuMoji — Discord Emoji Manager',
    image: '/img/portfolio/portfolio-uwumoji.gif',
    tags: ['Node', 'Express', 'Postgres', 'Sequelize'],
    description: 'Upload, edit, and add emojis to a Discord server via the Discord API + a bot.',
    href: 'https://github.com/ruvvet/uwumoji-app',
  },
  {
    id: 'react-tictactoe',
    title: 'React Tic-Tac-Toe',
    image: '/img/portfolio/react-tictactoe.gif',
    tags: ['React'],
    description: 'A React take on the classic.',
    href: 'https://ruvvet.github.io/react-tictactoe/',
  },
  {
    id: 'untitled-game',
    title: 'Untitled Game',
    image: '/img/portfolio/portfolio-untitled-game.gif',
    tags: ['JavaScript', 'HTML5 Canvas'],
    description: 'Arcade-style canvas game in vanilla JavaScript.',
    href: 'https://ruvvet.github.io/untitled-game',
  },
  {
    id: 'vodsweeper',
    title: 'VODSWEEPER',
    tags: ['React', 'Express', 'TypeScript', 'TypeORM', 'Chakra UI'],
    description:
      'Algorithmically matches and syncs Twitch VODs with the games actually played — timestamps, API-delivered game details, and unique data give a fuller VOD experience.',
  },
  {
    id: 'masters-thesis',
    title: "Master's Thesis — Real-Time Tweet Summarization",
    tags: ['Python', 'SQLite', 'Twitter API', 'ML'],
    description:
      'Real-time summarization of tweets during esports streams to detect events and generate a live timeline.',
    href: 'https://cdr.lib.unc.edu/concern/masters_papers/j3860b75j',
  },
  {
    id: 'ela',
    title: 'ELA — Community Moment',
    image: '/img/portfolio/ela-gif.gif',
    tags: ['Community', 'Rainbow Six Siege', 'Ubisoft'],
    description: 'A favorite community moment from my Rainbow Six Siege Community Manager years.',
    href: 'https://twitter.com/ruvvet/status/1205262302414422017',
  },
  {
    id: 'caveira',
    title: 'Caveira Cosplay',
    image: '/img/portfolio/cav.jpg',
    tags: ['Cosplay', 'Rainbow Six Siege'],
    description: 'Caveira (Rainbow Six Siege) cosplay build.',
  },
  {
    id: 'dokkaebi',
    title: 'Dokkaebi Cosplay',
    image: '/img/portfolio/dokk.jpg',
    tags: ['Cosplay', 'Rainbow Six Siege'],
    description: 'Dokkaebi (Rainbow Six Siege) cosplay build.',
  },
  {
    id: 'bunnycups',
    title: 'Bunny Cups',
    image: '/img/portfolio/bunnycups.jpg',
    tags: ['Hand-painted', 'Ceramics'],
    description: 'Hand-painted bunny mug — a side hobby.',
  },
  {
    id: 'panther',
    title: 'Panther',
    image: '/img/portfolio/panther.jpg',
    tags: ['Artwork'],
    description: 'Panther artwork.',
  },
];
