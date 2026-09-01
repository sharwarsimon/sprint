import React from 'react';
import { X, Users, UserCheck, Shield, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative z-50 w-full max-w-xs h-full bg-slate-900 border-l border-slate-800 p-5 flex flex-col shadow-2xl text-slate-100 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-cyan-300 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Active Members</h3>
              <p className="text-[11px] text-slate-400">#{roomName.toLowerCase()} room ({users.length})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2">
          {users.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No other members in this room right now.
            </div>
          ) : (
            users.map((u) => {
              const isMe = u.userId === currentUser?.userId;
              const isBlocked = isUserBlocked(u.userId);

              return (
                <div
                  key={u.userId}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                        style={{ backgroundColor: u.avatarColor || '#6366f1' }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        <span className="truncate">{u.name}</span>
                        {isMe && (
                          <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-1 rounded font-mono">YOU</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {u.gender}
                      </div>
                    </div>
                  </div>

                  {!isMe && (
                    <button
                      onClick={() => {
                        if (isBlocked) {
                          // Handled via context if needed
                        } else {
                          blockUser(u.userId);
                        }
                      }}
                      className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition ${
                        isBlocked
                          ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                          : 'bg-slate-700 text-slate-300 border-slate-600 hover:text-white'
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
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Realtime Presence Active
        </div>

      </div>
    </div>
  );
};
