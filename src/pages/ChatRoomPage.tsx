import React, { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useUser } from '../context/UserContext';
import { INITIAL_ROOMS } from '../data/rooms';
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { ReportModal } from '../components/ReportModal';
import { ActiveUsersDrawer } from '../components/ActiveUsersDrawer';
import { AlertCircle, Lock, ShieldAlert } from 'lucide-react';

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
  const onlineCount = roomCounts[roomId] || 0;
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

  const handleBlockUser = (targetUserId: string, targetUserName: string) => {
    blockUser(targetUserId);
    setNotification(`Blocked ${targetUserName}. Their messages are now hidden.`);
    setTimeout(() => setNotification(null), 4000);
  };

  if (connectionStatus === 'banned') {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-950">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-rose-500/40 text-center shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
          <p className="text-sm text-slate-300">
            {banReason || 'You have been restricted from participating in the chat community.'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs transition"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">
      
      {/* 1. Chat Header */}
      <ChatHeader
        currentRoom={roomInfo}
        onlineCount={onlineCount}
        onBack={onBack}
        onSwitchRoom={onSwitchRoom}
        onToggleUsersDrawer={() => setIsUsersDrawerOpen(!isUsersDrawerOpen)}
        isUsersDrawerOpen={isUsersDrawerOpen}
      />

      {/* Floating Notification / Error Bar */}
      {(notification || errorMessage) && (
        <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between z-30 transition-all ${
          errorMessage ? 'bg-rose-600/90 text-white' : 'bg-indigo-600/90 text-white'
        }`}>
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage || notification}</span>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-white hover:opacity-80 font-bold text-sm"
          >
            ×
          </button>
        </div>
      )}

      {/* Disabled room overlay */}
      {isRoomDisabled ? (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Room Temporarily Closed</h3>
            <p className="text-xs text-slate-400">
              The #{roomInfo.name.toLowerCase()} room has been paused by an administrator. Please switch to another room.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {INITIAL_ROOMS.filter(r => r.id !== roomId && !disabledRooms.includes(r.id)).map(r => (
                <button
                  key={r.id}
                  onClick={() => onSwitchRoom(r.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                >
                  Join #{r.name}
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

          {/* 3. Fixed Bottom Message Input */}
          <MessageInput
            onSendMessage={sendMessage}
            onTyping={sendTyping}
            disabled={connectionStatus !== 'connected'}
          />
        </>
      )}

      {/* 4. Active Users Slide-Out Drawer */}
      <ActiveUsersDrawer
        isOpen={isUsersDrawerOpen}
        onClose={() => setIsUsersDrawerOpen(false)}
        users={activeUsers}
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
