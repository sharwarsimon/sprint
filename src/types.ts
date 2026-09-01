export type Gender = 'Male' | 'Female' | 'Other';

export interface UserProfile {
  userId: string;
  name: string;
  age: number;
  gender: Gender;
  currentRoom?: string | null;
  joinedAt: string;
  lastActiveAt: string;
  avatarColor?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userGender?: Gender;
  userColor?: string;
  message: string;
  createdAt: string; // ISO string
  isSystem?: boolean;
  reported?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatRoomInfo {
  id: string;
  name: string;
  description: string;
  topic: string;
  iconName: string;
  badgeColor: string;
  onlineCount: number;
  isDisabled?: boolean;
  rules?: string[];
}

export interface MessageReport {
  id: string;
  messageId: string;
  messageText?: string;
  messageContent?: string;
  messageAuthorId?: string;
  messageAuthorName?: string;
  reportedUserId?: string;
  reportedUserName?: string;
  reporterId: string;
  reporterName?: string;
  roomId: string;
  reason: string;
  createdAt: string;
  status?: 'pending' | 'reviewed' | 'dismissed' | 'actioned';
}

export type StoredReport = MessageReport;
export type ChatReport = MessageReport;

export interface AdminStats {
  totalOnline: number;
  totalMessagesSentToday: number;
  roomCounts: Record<string, number>;
  pendingReportsCount: number;
  bannedUsersCount: number;
}

export interface BannedUser {
  userId: string;
  name: string;
  reason: string;
  bannedAt: string;
  bannedBy: string;
}

export type BanRecord = BannedUser;

export interface ShopItem {
  id: string;
  name: string;
  category: 'sticker' | 'badge' | 'theme' | 'perk';
  price: string;
  icon: string;
  description: string;
  popular?: boolean;
}

export interface WallpaperItem {
  id: string;
  title: string;
  tag: string;
  previewUrl: string;
  colorScheme: string;
  downloads: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
}

