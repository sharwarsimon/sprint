import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { useUser } from './UserContext';
import { sanitizeText } from '../lib/sanitizer';
import { maskProfanity } from '../lib/profanity';

interface ChatContextType {
  roomCounts: Record<string, number>;
  disabledRooms: string[];
  currentRoomId: string | null;
  messages: ChatMessage[];
  activeUsers: UserProfile[];
  typingUsers: string[];
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'banned' | 'error';
  errorMessage: string | null;
  banReason: string | null;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  sendMessage: (text: string) => Promise<{ success: boolean; error?: string }>;
  sendTyping: (isTyping: boolean) => void;
  reportMessage: (messageId: string, reason: string) => Promise<{ success: boolean; error?: string }>;
  refreshRoomCounts: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isUserBlocked } = useUser();
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({
    fun: 0,
    game: 0,
    loves: 0,
    friends: 0,
    readers: 0
  });
  const [disabledRooms, setDisabledRooms] = useState<string[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserProfile[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'banned' | 'error'>('connecting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [banReason, setBanReason] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentRoomRef = useRef<string | null>(null);
  currentRoomRef.current = currentRoomId;

  // Fetch initial room counts via REST as instant backup
  const refreshRoomCounts = useCallback(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        if (data.counts) setRoomCounts(data.counts);
        if (data.disabledRooms) setDisabledRooms(data.disabledRooms);
      })
      .catch(err => console.warn('Could not fetch room counts REST backup:', err));
  }, []);

  useEffect(() => {
    refreshRoomCounts();
  }, [refreshRoomCounts]);

  // Connect WebSocket
  const connectWebSocket = useCallback(() => {
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    setConnectionStatus('connecting');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        setErrorMessage(null);

        // Send PING heartbeat every 15s
        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'PING' }));
          }
        }, 15000);

        // If user was in a room and reconnected, rejoin seamlessly
        if (currentRoomRef.current && user) {
          ws.send(JSON.stringify({
            type: 'JOIN_ROOM',
            userId: user.userId,
            name: user.name,
            age: user.age,
            gender: user.gender,
            roomId: currentRoomRef.current,
            avatarColor: user.avatarColor
          }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'PRESENCE_UPDATE': {
              if (data.counts) setRoomCounts(data.counts);
              if (data.disabledRooms) setDisabledRooms(data.disabledRooms);
              break;
            }

            case 'ROOM_JOINED': {
              if (data.roomId === currentRoomRef.current) {
                setMessages(data.messages || []);
                if (data.activeUsers) setActiveUsers(data.activeUsers);
              }
              break;
            }

            case 'USER_JOINED': {
              if (data.roomId === currentRoomRef.current) {
                setActiveUsers(prev => {
                  if (prev.some(u => u.userId === data.userId)) return prev;
                  return [...prev, {
                    userId: data.userId,
                    name: data.name,
                    gender: data.gender,
                    age: 18,
                    avatarColor: data.avatarColor || '#3b82f6',
                    joinedAt: new Date().toISOString(),
                    lastActiveAt: new Date().toISOString()
                  }];
                });
                // Add soft system message
                setMessages(prev => [
                  ...prev,
                  {
                    id: `sys_${Date.now()}`,
                    roomId: data.roomId,
                    userId: 'system',
                    userName: 'System',
                    message: `${data.name} joined the room`,
                    createdAt: new Date().toISOString(),
                    isSystem: true
                  }
                ]);
              }
              break;
            }

            case 'USER_LEFT': {
              if (data.roomId === currentRoomRef.current) {
                setActiveUsers(prev => prev.filter(u => u.userId !== data.userId));
                setTypingUsers(prev => prev.filter(name => name !== data.name));
                setMessages(prev => [
                  ...prev,
                  {
                    id: `sys_${Date.now()}`,
                    roomId: data.roomId,
                    userId: 'system',
                    userName: 'System',
                    message: `${data.name} left the room`,
                    createdAt: new Date().toISOString(),
                    isSystem: true
                  }
                ]);
              }
              break;
            }

            case 'NEW_MESSAGE': {
              const msg: ChatMessage = data.message;
              if (msg.roomId === currentRoomRef.current) {
                setMessages(prev => {
                  // Avoid duplicate if already received
                  if (prev.some(m => m.id === msg.id)) return prev;
                  return [...prev, msg];
                });
              }
              break;
            }

            case 'MESSAGE_DELETED': {
              if (data.roomId === currentRoomRef.current) {
                setMessages(prev => prev.filter(m => m.id !== data.messageId));
              }
              break;
            }

            case 'USER_TYPING': {
              if (data.roomId === currentRoomRef.current) {
                if (data.isTyping) {
                  setTypingUsers(prev => Array.from(new Set([...prev, data.name])));
                } else {
                  setTypingUsers(prev => prev.filter(name => name !== data.name));
                }
              }
              break;
            }

            case 'ROOM_DISABLED': {
              setErrorMessage(data.message || 'This room was temporarily closed by a moderator.');
              break;
            }

            case 'ROOM_STATUS_CHANGED': {
              if (data.disabledRooms) setDisabledRooms(data.disabledRooms);
              if (data.counts) setRoomCounts(data.counts);
              break;
            }

            case 'BANNED': {
              setConnectionStatus('banned');
              setBanReason(data.reason || 'You have been banned from the chat community.');
              break;
            }

            case 'ERROR': {
              setErrorMessage(data.message);
              setTimeout(() => setErrorMessage(null), 5000);
              break;
            }
          }
        } catch (e) {
          console.error('Failed to parse incoming WebSocket message:', e);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
        // Attempt automatic reconnection after 3 seconds
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onerror = (err) => {
        console.warn('WebSocket connection error:', err);
        setConnectionStatus('error');
      };
    } catch (e) {
      console.error('Socket init error:', e);
      setConnectionStatus('error');
    }
  }, [user]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectWebSocket]);

  // Join Room
  const joinRoom = useCallback((roomId: string) => {
    if (!user) return;
    setCurrentRoomId(roomId);
    setMessages([]);
    setActiveUsers([]);
    setTypingUsers([]);
    setErrorMessage(null);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'JOIN_ROOM',
        userId: user.userId,
        name: user.name,
        age: user.age,
        gender: user.gender,
        roomId,
        avatarColor: user.avatarColor
      }));
    } else {
      // Fetch messages via REST in parallel while socket is reconnecting
      fetch(`/api/rooms/${roomId}/messages`)
        .then(res => res.json())
        .then(data => {
          if (data.messages) setMessages(data.messages);
        })
        .catch(console.error);
    }
  }, [user]);

  // Leave Room
  const leaveRoom = useCallback(() => {
    if (currentRoomId && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'LEAVE_ROOM',
        roomId: currentRoomId
      }));
    }
    setCurrentRoomId(null);
    setMessages([]);
    setActiveUsers([]);
    setTypingUsers([]);
  }, [currentRoomId]);

  // Send Message
  const sendMessage = useCallback(async (rawText: string): Promise<{ success: boolean; error?: string }> => {
    if (!currentRoomId) return { success: false, error: 'No room joined' };
    if (!user) return { success: false, error: 'No user profile found' };

    const sanitized = sanitizeText(rawText);
    const filteredText = maskProfanity(sanitized);

    if (!filteredText.trim()) {
      return { success: false, error: 'Message cannot be empty.' };
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'SEND_MESSAGE',
        roomId: currentRoomId,
        message: filteredText
      }));
      return { success: true };
    } else {
      return { success: false, error: 'Connection lost. Reconnecting to chat...' };
    }
  }, [currentRoomId, user]);

  // Send typing indicator
  const sendTyping = useCallback((isTyping: boolean) => {
    if (currentRoomId && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'TYPING',
        roomId: currentRoomId,
        isTyping
      }));
    }
  }, [currentRoomId]);

  // Report message
  const reportMessage = useCallback(async (messageId: string, reason: string) => {
    const targetMsg = messages.find(m => m.id === messageId);
    if (!targetMsg) return { success: false, error: 'Message not found' };

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          messageText: targetMsg.message,
          messageAuthorId: targetMsg.userId,
          messageAuthorName: targetMsg.userName,
          reporterId: user?.userId || 'anon',
          reporterName: user?.name || 'Anonymous',
          roomId: targetMsg.roomId,
          reason
        })
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to submit report' };
    } catch (e) {
      return { success: false, error: 'Network error submitting report' };
    }
  }, [messages, user]);

  // Filter messages from blocked users
  const visibleMessages = messages.filter(m => !isUserBlocked(m.userId));

  return (
    <ChatContext.Provider
      value={{
        roomCounts,
        disabledRooms,
        currentRoomId,
        messages: visibleMessages,
        activeUsers,
        typingUsers,
        connectionStatus,
        errorMessage,
        banReason,
        joinRoom,
        leaveRoom,
        sendMessage,
        sendTyping,
        reportMessage,
        refreshRoomCounts
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
