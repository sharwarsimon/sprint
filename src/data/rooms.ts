import { ChatRoomInfo } from '../types';

export const INITIAL_ROOMS: ChatRoomInfo[] = [
  {
    id: 'fun',
    name: 'Fun',
    description: 'Talk, laugh and have fun.',
    topic: 'Jokes, humor, memes, everyday laughs & good vibes',
    iconName: 'Smile',
    badgeColor: 'amber',
    onlineCount: 0,
    rules: [
      'Keep it lighthearted and positive',
      'No hate speech or targeted harassment',
      'Share humor that everyone can enjoy'
    ]
  },
  {
    id: 'game',
    name: 'Game',
    description: 'Discuss games and find players.',
    topic: 'PC, console, mobile, esports & co-op matchmaking',
    iconName: 'Gamepad2',
    badgeColor: 'indigo',
    onlineCount: 0,
    rules: [
      'No spoilers without warning',
      'Respect all platforms and player skill levels',
      'No selling or trading pirated game accounts'
    ]
  },
  {
    id: 'loves',
    name: 'Loves',
    description: 'Talk about love and relationships.',
    topic: 'Relationship advice, romance, crushes & heartfelt stories',
    iconName: 'Heart',
    badgeColor: 'rose',
    onlineCount: 0,
    rules: [
      'Be empathetic and kind to people seeking advice',
      'No unsolicited explicit or predatory messages',
      'Protect personal contact info'
    ]
  },
  {
    id: 'friends',
    name: 'Friends',
    description: 'Meet and chat with people.',
    topic: 'Make new connections, share hobbies & casual discussions',
    iconName: 'Users',
    badgeColor: 'emerald',
    onlineCount: 0,
    rules: [
      'Welcome newcomers with warmth',
      'Be honest and respectful',
      'No spamming promotional links'
    ]
  },
  {
    id: 'readers',
    name: 'Readers',
    description: 'Books, stories and reading.',
    topic: 'Book recommendations, authors, poetry & literature',
    iconName: 'BookOpen',
    badgeColor: 'sky',
    onlineCount: 0,
    rules: [
      'Mark plot spoilers clearly',
      'Constructive literary critique is welcomed',
      'Share your favorite quotes and book reviews'
    ]
  }
];

export const AVATAR_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#6366f1'
];

export function getAvatarColorForUser(idOrName: string): string {
  let hash = 0;
  for (let i = 0; i < idOrName.length; i++) {
    hash = idOrName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}
