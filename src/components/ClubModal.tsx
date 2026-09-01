import React from 'react';
import { X, Users, Crown, Shield, Sparkles, Award, ArrowRight, MessageCircle } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const ClubModal: React.FC<ClubModalProps> = ({ isOpen, onClose, onSelectRoom }) => {
  const { roomCounts } = useChat();
  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  if (!isOpen) return null;

  const clubPerks = [
    {
      icon: Crown,
      title: 'VIP Lounge Access',
      desc: 'Exclusive discussion circles and featured spotlight status in public channels.'
    },
    {
      icon: Shield,
      title: 'Trusted Community Badges',
      desc: 'Recognized member status with zero rate limits and priority reports.'
    },
    {
      icon: Award,
      title: 'Daily Chat Contests',
      desc: 'Win special custom avatar colors and custom room nicknames.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">PulseChat Club</h2>
              <p className="text-xs text-stone-500">Community lounge & member benefits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Club Banner */}
        <div className="p-5 bg-gradient-to-r from-[#3E2723] to-[#4E342E] text-white space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Active Community Club</span>
          </div>
          <h3 className="text-base font-bold">Connect with {totalOnline || 23} Active Members</h3>
          <p className="text-xs text-stone-300">
            Join public chat rooms freely without passwords or subscriptions.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1 block mb-1">
            Club Benefits & Activities
          </span>

          {clubPerks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-[#FF6B00]/40 transition flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 border border-orange-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#3E2723]">{perk.title}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{perk.desc}</p>
                </div>
              </div>
            );
          })}

          {/* Quick Room Jumps */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1 block mb-2">
              Popular Club Rooms
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onSelectRoom('friends');
                }}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-[#FF6B00] text-left transition bg-stone-50"
              >
                <div className="text-xs font-bold text-[#3E2723]">#friends</div>
                <div className="text-[10px] text-stone-500">{roomCounts.friends || 0} active now</div>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectRoom('fun');
                }}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-[#FF6B00] text-left transition bg-stone-50"
              >
                <div className="text-xs font-bold text-[#3E2723]">#fun</div>
                <div className="text-[10px] text-stone-500">{roomCounts.fun || 0} active now</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Free open community club.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
