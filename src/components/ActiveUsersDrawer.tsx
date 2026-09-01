import React from 'react';
import { X, Users, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types';
import { useUser } from '../context/UserContext';

interface ActiveUsersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserProfile[];
  roomName: string;
}

export const ActiveUsersDrawer: React.FC<ActiveUsersDrawerProps> = ({
  isOpen,
  onClose,
  users,
  roomName
}) => {
  const { user: currentUser, blockUser, isUserBlocked } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative z-50 w-full max-w-xs h-full bg-white border-l border-stone-200 p-4 sm:p-5 flex flex-col shadow-2xl text-[#3E2723] animate-in slide-in-from-right duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#3E2723] text-[#FF6B00] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#3E2723]">Room Members</h3>
              <p className="text-[11px] text-stone-500 font-medium">#{roomName.toLowerCase()} ({users.length})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-[#3E2723] hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {users.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400">
              No other members in this room right now.
            </div>
          ) : (
            users.map((u) => {
              const isMe = u.userId === currentUser?.userId;
              const isBlocked = isUserBlocked(u.userId);

              return (
                <div
                  key={u.userId}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:bg-orange-50/40 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: u.avatarColor || '#3E2723' }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                        <span className="truncate">{u.name}</span>
                        {isMe && (
                          <span className="text-[9px] bg-orange-100 text-[#FF6B00] px-1 py-0.2 rounded font-mono font-black">YOU</span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {u.gender}
                      </div>
                    </div>
                  </div>

                  {!isMe && (
                    <button
                      onClick={() => blockUser(u.userId)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition ${
                        isBlocked
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'bg-white text-stone-600 border-stone-200 hover:text-[#3E2723]'
                      }`}
                    >
                      {isBlocked ? 'Blocked' : 'Block'}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2.5 border-t border-stone-200 text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Realtime Live Presence</span>
        </div>

      </div>
    </div>
  );
};
