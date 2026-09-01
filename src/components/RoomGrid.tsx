import React from 'react';
import { INITIAL_ROOMS } from '../data/rooms';
import { RoomCard } from './RoomCard';
import { useChat } from '../context/ChatContext';

interface RoomGridProps {
  onSelectRoom: (roomId: string) => void;
  title?: string;
  subtitle?: string;
}

export const RoomGrid: React.FC<RoomGridProps> = ({
  onSelectRoom,
  title = 'Live Public Chat Rooms',
  subtitle = 'Select a room to enter and start chatting with active members'
}) => {
  const { roomCounts, disabledRooms } = useChat();

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INITIAL_ROOMS.map((room) => {
          const count = roomCounts[room.id] || 0;
          const isDisabled = disabledRooms.includes(room.id);
          return (
            <RoomCard
              key={room.id}
              room={room}
              onlineCount={count}
              isDisabled={isDisabled}
              onSelect={onSelectRoom}
            />
          );
        })}
      </div>
    </section>
  );
};
