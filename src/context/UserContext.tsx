import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Gender } from '../types';
import { getAvatarColorForUser } from '../data/rooms';

interface UserContextType {
  user: UserProfile | null;
  setUserProfile: (name: string, age: number, gender: Gender) => UserProfile;
  clearUserProfile: () => void;
  blockedUsers: string[];
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  agreedToRules: boolean;
  setAgreedToRules: (agreed: boolean) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = 'pulsechat_user_session';
const BLOCKED_KEY = 'pulsechat_blocked_users';
const RULES_KEY = 'pulsechat_rules_agreed';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BLOCKED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [agreedToRules, setAgreedToRulesState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(RULES_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const setAgreedToRules = (agreed: boolean) => {
    setAgreedToRulesState(agreed);
    try {
      localStorage.setItem(RULES_KEY, agreed ? 'true' : 'false');
    } catch (_) {}
  };

  const setUserProfile = (name: string, age: number, gender: Gender): UserProfile => {
    const existingId = user?.userId || `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const avatarColor = user?.avatarColor || getAvatarColorForUser(name);
    const newProfile: UserProfile = {
      userId: existingId,
      name: name.trim(),
      age,
      gender,
      joinedAt: user?.joinedAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      avatarColor
    };
    setUser(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch (_) {}
    return newProfile;
  };

  const clearUserProfile = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  };

  const blockUser = (userId: string) => {
    if (!blockedUsers.includes(userId)) {
      const updated = [...blockedUsers, userId];
      setBlockedUsers(updated);
      try {
        localStorage.setItem(BLOCKED_KEY, JSON.stringify(updated));
      } catch (_) {}
    }
  };

  const unblockUser = (userId: string) => {
    const updated = blockedUsers.filter(id => id !== userId);
    setBlockedUsers(updated);
    try {
      localStorage.setItem(BLOCKED_KEY, JSON.stringify(updated));
    } catch (_) {}
  };

  const isUserBlocked = (userId: string) => {
    return blockedUsers.includes(userId);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserProfile,
        clearUserProfile,
        blockedUsers,
        blockUser,
        unblockUser,
        isUserBlocked,
        agreedToRules,
        setAgreedToRules
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
