import React, { useState, useEffect, useMemo } from 'react';
import { useChat } from '../context/ChatContext';
import { useUser } from '../context/UserContext';
import { INITIAL_ROOMS } from '../data/rooms';
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { ReportModal } from '../components/ReportModal';
import { ActiveUsersDrawer } from '../components/ActiveUsersDrawer';
import { AlertCircle, Lock, ShieldAlert } from 'lucide-react';
import { LocalDB } from '../lib/storage';

interface ChatRoomPageProps {
  roomId: string;
  onBack: () => void;
  onSwitchRoom: (newRoomId: string) => void;
  onOpenProfileModal: () => void;
}

export const ChatRoomPage: React.FC<ChatRoomPageProps> = ({
  roomId,
  onBack,
  onSwitchRoom,
  onOpenProfileModal
}) => {
  const { 
    roomCounts, 
    disabledRooms, 
    messages, 
    activeUsers, 
    typingUsers, 
    connectionStatus, 
    errorMessage, 
    banReason, 
    joinRoom, 
    leaveRoom, 
    sendMessage, 
    sendTyping, 
    reportMessage 
  } = useChat();

  const { user, blockUser } = useUser();

  const [isUsersDrawerOpen, setIsUsersDrawerOpen] = useState(false);
  const [reportModalMessageId, setReportModalMessageId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const roomInfo = INITIAL_ROOMS.find(r => r.id === roomId) || INITIAL_ROOMS[0];
  const isRoomDisabled = disabledRooms.includes(roomId);

  // Automatically join the room when component mounts or roomId changes
  useEffect(() => {
    if (!user) {
      onOpenProfileModal();
      return;
    }
    joinRoom(roomId);

    return () => {
      leaveRoom();
    };
  }, [roomId, user, joinRoom, leaveRoom, onOpenProfileModal]);

  // Combine live active users with baseline members for this room so members are always visible
  const roomMembersList = useMemo(() => {
    const defaultMembers = LocalDB.getActiveMembers()[roomId] || [];
    const combined = [...activeUsers];
    
    // Add default members if not already in combined
    defaultMembers.forEach((dm) => {
      if (!combined.some((u) => u.userId === dm.userId)) {
        combined.push(dm);
      }
    });

    // Ensure current user is in list if not already
    if (user && !combined.some((u) => u.userId === user.userId)) {
      combined.unshift(user);
    }

    return combined;
  }, [activeUsers, roomId, user]);

  const onlineCount = roomMembersList.length || roomCounts[roomId] || 1;

  const handleBlockUser = (targetUserId: string, targetUserName: string) => {
    blockUser(targetUserId);
    setNotification(`Blocked ${targetUserName}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  if (connectionStatus === 'banned') {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 text-center shadow-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-[#3E2723]">Access Restricted</h2>
          <p className="text-xs text-stone-600">
            {banReason || 'You have been restricted from participating.'}
          </p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-[#3E2723] text-white hover:bg-[#2D1C19] font-bold text-xs transition shadow-xs"
          >
            Return to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] w-full overflow-hidden bg-white">
      
      {/* 1. Messenger / WhatsApp Chat Header */}
      <ChatHeader
        currentRoom={roomInfo}
        onlineCount={onlineCount}
        onBack={onBack}
        onSwitchRoom={onSwitchRoom}
        onToggleUsersDrawer={() => setIsUsersDrawerOpen(!isUsersDrawerOpen)}
        isUsersDrawerOpen={isUsersDrawerOpen}
      />

      {/* Notification Banner */}
      {(notification || errorMessage) && (
        <div className={`px-4 py-1.5 text-xs font-bold flex items-center justify-between z-30 transition-all ${
          errorMessage ? 'bg-rose-500 text-white' : 'bg-[#3E2723] text-white'
        }`}>
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#FF6B00]" />
            <span>{errorMessage || notification}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-white hover:opacity-80 font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Disabled room overlay */}
      {isRoomDisabled ? (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#3E2723]">Room Temporarily Closed</h3>
            <p className="text-xs text-stone-500">
              The #{roomInfo.name.toLowerCase()} room is closed right now.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {INITIAL_ROOMS.filter(r => r.id !== roomId && !disabledRooms.includes(r.id)).map(r => (
                <button
                  key={r.id}
                  onClick={() => onSwitchRoom(r.id)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-xs font-bold text-[#3E2723] border border-stone-200 transition shadow-xs"
                >
                  Join {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 2. Message History & Stream */}
          <MessageList
            messages={messages}
            typingUsers={typingUsers}
            connectionStatus={connectionStatus}
            onReport={(id) => setReportModalMessageId(id)}
            onBlockUser={handleBlockUser}
            roomName={roomInfo.name}
          />

          {/* 3. Bottom WhatsApp / Messenger Input */}
          <MessageInput
            onSendMessage={sendMessage}
            onTyping={sendTyping}
            disabled={connectionStatus === 'banned'}
          />
        </>
      )}

      {/* 4. Active Room Members Drawer (Linked directly from Header!) */}
      <ActiveUsersDrawer
        isOpen={isUsersDrawerOpen}
        onClose={() => setIsUsersDrawerOpen(false)}
        users={roomMembersList}
        roomName={roomInfo.name}
      />

      {/* 5. Message Moderation Report Modal */}
      <ReportModal
        isOpen={!!reportModalMessageId}
        onClose={() => setReportModalMessageId(null)}
        messageId={reportModalMessageId}
        onSubmitReport={reportMessage}
      />

    </div>
  );
};
