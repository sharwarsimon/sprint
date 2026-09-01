import { ChatMessage, UserProfile, StoredReport, BanRecord } from '../types';

const STORAGE_KEYS = {
  USER: 'pulsechat_user_profile',
  MESSAGES: 'pulsechat_messages_v1',
  ROOM_COUNTS: 'pulsechat_room_counts_v1',
  REPORTS: 'pulsechat_reports_v1',
  BANS: 'pulsechat_bans_v1',
  SETTINGS: 'pulsechat_settings_v1',
  CUSTOM_WALLPAPER: 'pulsechat_custom_wallpaper',
  PURCHASED_ITEMS: 'pulsechat_purchased_items',
  ACTIVE_MEMBERS: 'pulsechat_active_members_v1'
};

// Initial baseline mock active members per room (Works standalone with zero database)
export const DEFAULT_ACTIVE_MEMBERS: Record<string, UserProfile[]> = {
  fun: [
    { userId: 'u_101', name: 'Simon', age: 24, gender: 'Male', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_102', name: 'Maya', age: 22, gender: 'Female', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_103', name: 'Alex', age: 26, gender: 'Other', avatarColor: '#F97316', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }
  ],
  game: [
    { userId: 'u_201', name: 'RyuGamer', age: 23, gender: 'Male', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_202', name: 'PixelQueen', age: 21, gender: 'Female', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_203', name: 'ShadowStrike', age: 28, gender: 'Male', avatarColor: '#4E342E', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_204', name: 'Nova', age: 19, gender: 'Other', avatarColor: '#F97316', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_205', name: 'Apex_Leo', age: 25, gender: 'Male', avatarColor: '#D97706', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }
  ],
  loves: [
    { userId: 'u_301', name: 'Elena', age: 25, gender: 'Female', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_302', name: 'Lucas', age: 27, gender: 'Male', avatarColor: '#4E342E', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_303', name: 'Amara', age: 22, gender: 'Female', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_304', name: 'Jordan', age: 24, gender: 'Other', avatarColor: '#F97316', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }
  ],
  friends: [
    { userId: 'u_401', name: 'Sam', age: 23, gender: 'Other', avatarColor: '#F97316', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_402', name: 'Chloe', age: 21, gender: 'Female', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_403', name: 'David', age: 29, gender: 'Male', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_404', name: 'Hannah', age: 24, gender: 'Female', avatarColor: '#4E342E', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_405', name: 'Marcus', age: 26, gender: 'Male', avatarColor: '#78350F', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_406', name: 'Zoe', age: 22, gender: 'Female', avatarColor: '#F59E0B', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_407', name: 'Liam', age: 25, gender: 'Male', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_408', name: 'Kai', age: 20, gender: 'Other', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }
  ],
  readers: [
    { userId: 'u_501', name: 'BookWorm_Leo', age: 28, gender: 'Male', avatarColor: '#4E342E', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_502', name: 'Sophia', age: 24, gender: 'Female', avatarColor: '#EA580C', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() },
    { userId: 'u_503', name: 'Julian', age: 31, gender: 'Male', avatarColor: '#3E2723', joinedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }
  ]
};

// Initial mock baseline messages per room if fresh install
export const DEFAULT_ROOM_MESSAGES: Record<string, ChatMessage[]> = {
  fun: [
    {
      id: 'msg_f1',
      roomId: 'fun',
      userId: 'u_101',
      userName: 'Simon',
      userGender: 'Male',
      userColor: '#EA580C',
      message: 'Welcome everyone to the Fun room! Drop your best jokes here 😄',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    },
    {
      id: 'msg_f2',
      roomId: 'fun',
      userId: 'u_102',
      userName: 'Maya',
      userGender: 'Female',
      userColor: '#3E2723',
      message: 'Why do programmers prefer dark chocolate? Because it has fewer bugs! 🍫',
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString()
    },
    {
      id: 'msg_f3',
      roomId: 'fun',
      userId: 'u_103',
      userName: 'Alex',
      userGender: 'Other',
      userColor: '#F97316',
      message: 'Haha classic! Love the clean mobile chat look.',
      createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString()
    }
  ],
  game: [
    {
      id: 'msg_g1',
      roomId: 'game',
      userId: 'u_201',
      userName: 'RyuGamer',
      userGender: 'Male',
      userColor: '#3E2723',
      message: 'Anyone playing co-op tonight? Looking for a squad!',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: 'msg_g2',
      roomId: 'game',
      userId: 'u_202',
      userName: 'PixelQueen',
      userGender: 'Female',
      userColor: '#EA580C',
      message: 'Count me in! Ready for some fast rounds.',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    }
  ],
  loves: [
    {
      id: 'msg_l1',
      roomId: 'loves',
      userId: 'u_301',
      userName: 'Elena',
      userGender: 'Female',
      userColor: '#EA580C',
      message: 'Spread kindness wherever you go today ❤️ Hope everyone is doing great!',
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
      id: 'msg_l2',
      roomId: 'loves',
      userId: 'u_302',
      userName: 'Lucas',
      userGender: 'Male',
      userColor: '#4E342E',
      message: 'Thanks Elena! Wishing you a peaceful day.',
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
    }
  ],
  friends: [
    {
      id: 'msg_fr1',
      roomId: 'friends',
      userId: 'u_401',
      userName: 'Sam',
      userGender: 'Other',
      userColor: '#F97316',
      message: 'Hey friends! Welcome to our chill corner.',
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
      id: 'msg_fr2',
      roomId: 'friends',
      userId: 'u_402',
      userName: 'Chloe',
      userGender: 'Female',
      userColor: '#3E2723',
      message: 'Glad to be here! Chatting from mobile.',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    }
  ],
  readers: [
    {
      id: 'msg_r1',
      roomId: 'readers',
      userId: 'u_501',
      userName: 'BookWorm_Leo',
      userGender: 'Male',
      userColor: '#4E342E',
      message: 'Currently reading Atomic Habits. What books are on your nightstand?',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    },
    {
      id: 'msg_r2',
      roomId: 'readers',
      userId: 'u_502',
      userName: 'Sophia',
      userGender: 'Female',
      userColor: '#EA580C',
      message: 'Re-reading The Alchemist! Love the discussions here in Bookshop & Readers.',
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
    }
  ]
};

// Safe LocalStorage access
export const getLocalData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
};

export const setLocalData = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
};

// Cross-tab Synchronization Channel for Serverless/GitHub/Vercel
export class UniversalChatBus {
  private static instance: UniversalChatBus;
  private channel: BroadcastChannel | null = null;
  private listeners: Array<(event: any) => void> = [];

  private constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('pulsechat_universal_bus');
        this.channel.onmessage = (e) => {
          this.listeners.forEach((listener) => listener(e.data));
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported:', err);
      }
    }
  }

  public static getInstance(): UniversalChatBus {
    if (!UniversalChatBus.instance) {
      UniversalChatBus.instance = new UniversalChatBus();
    }
    return UniversalChatBus.instance;
  }

  public broadcast(type: string, payload: any): void {
    const message = { type, payload, timestamp: Date.now() };
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {
        console.warn('Broadcast error:', e);
      }
    }
    // Also trigger in-memory listeners
    this.listeners.forEach((l) => l(message));
  }

  public subscribe(listener: (event: any) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

// Local Database Helpers
export const LocalDB = {
  getMessages: (roomId: string): ChatMessage[] => {
    const all = getLocalData<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, DEFAULT_ROOM_MESSAGES);
    return all[roomId] || [];
  },

  saveMessage: (roomId: string, message: ChatMessage): void => {
    const all = getLocalData<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, DEFAULT_ROOM_MESSAGES);
    if (!all[roomId]) all[roomId] = [];
    // prevent duplicate
    if (!all[roomId].some((m) => m.id === message.id)) {
      all[roomId].push(message);
      if (all[roomId].length > 250) {
        all[roomId] = all[roomId].slice(-200);
      }
      setLocalData(STORAGE_KEYS.MESSAGES, all);
      UniversalChatBus.getInstance().broadcast('NEW_LOCAL_MESSAGE', { roomId, message });
    }
  },

  deleteMessage: (roomId: string, messageId: string): void => {
    const all = getLocalData<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, DEFAULT_ROOM_MESSAGES);
    if (all[roomId]) {
      all[roomId] = all[roomId].filter((m) => m.id !== messageId);
      setLocalData(STORAGE_KEYS.MESSAGES, all);
      UniversalChatBus.getInstance().broadcast('MESSAGE_DELETED', { roomId, messageId });
    }
  },

  getRoomCounts: (): Record<string, number> => {
    const fallback: Record<string, number> = {
      fun: 3,
      game: 0,
      loves: 5,
      friends: 9,
      readers: 6
    };
    return getLocalData<Record<string, number>>(STORAGE_KEYS.ROOM_COUNTS, fallback);
  },

  setRoomCounts: (counts: Record<string, number>): void => {
    setLocalData(STORAGE_KEYS.ROOM_COUNTS, counts);
  },

  getReports: (): StoredReport[] => {
    return getLocalData<StoredReport[]>(STORAGE_KEYS.REPORTS, []);
  },

  addReport: (report: StoredReport): void => {
    const reports = getLocalData<StoredReport[]>(STORAGE_KEYS.REPORTS, []);
    reports.unshift(report);
    setLocalData(STORAGE_KEYS.REPORTS, reports);
    UniversalChatBus.getInstance().broadcast('NEW_REPORT', report);
  },

  getPurchasedItems: (): string[] => {
    return getLocalData<string[]>(STORAGE_KEYS.PURCHASED_ITEMS, ['starter_sticker_pack', 'theme_chocolate_orange']);
  },

  addPurchasedItem: (itemId: string): void => {
    const items = getLocalData<string[]>(STORAGE_KEYS.PURCHASED_ITEMS, ['starter_sticker_pack', 'theme_chocolate_orange']);
    if (!items.includes(itemId)) {
      items.push(itemId);
      setLocalData(STORAGE_KEYS.PURCHASED_ITEMS, items);
    }
  },

  getActiveMembers: (): Record<string, UserProfile[]> => {
    return getLocalData<Record<string, UserProfile[]>>(STORAGE_KEYS.ACTIVE_MEMBERS, DEFAULT_ACTIVE_MEMBERS);
  },

  getAllLiveMembersList: (): Array<UserProfile & { room: string; roomName: string }> => {
    const roomsMap = LocalDB.getActiveMembers();
    const result: Array<UserProfile & { room: string; roomName: string }> = [];
    
    const roomDisplayNames: Record<string, string> = {
      fun: 'Fun Room',
      game: 'Game Room',
      loves: 'Loves Room',
      friends: 'Friends Room',
      readers: 'Readers Room'
    };

    Object.entries(roomsMap).forEach(([roomId, members]) => {
      members.forEach((member) => {
        result.push({
          ...member,
          room: roomId,
          roomName: roomDisplayNames[roomId] || `${roomId} Room`
        });
      });
    });

    return result;
  },

  saveActiveMembers: (data: Record<string, UserProfile[]>): void => {
    setLocalData(STORAGE_KEYS.ACTIVE_MEMBERS, data);
    UniversalChatBus.getInstance().broadcast('ACTIVE_MEMBERS_UPDATED', data);
  },

  exportDataAsText: (): string => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      messages: getLocalData(STORAGE_KEYS.MESSAGES, DEFAULT_ROOM_MESSAGES),
      roomCounts: getLocalData(STORAGE_KEYS.ROOM_COUNTS, {}),
      activeMembers: getLocalData(STORAGE_KEYS.ACTIVE_MEMBERS, DEFAULT_ACTIVE_MEMBERS),
      reports: getLocalData(STORAGE_KEYS.REPORTS, [])
    };
    return JSON.stringify(backup, null, 2);
  },

  importDataFromText: (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.messages) setLocalData(STORAGE_KEYS.MESSAGES, parsed.messages);
      if (parsed.roomCounts) setLocalData(STORAGE_KEYS.ROOM_COUNTS, parsed.roomCounts);
      if (parsed.activeMembers) setLocalData(STORAGE_KEYS.ACTIVE_MEMBERS, parsed.activeMembers);
      return true;
    } catch {
      return false;
    }
  }
};
