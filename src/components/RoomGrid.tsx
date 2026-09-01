import React from 'react';
import { INITIAL_ROOMS } from '../data/rooms';
import { RoomCard } from './RoomCard';
import { useChat } from '../context/ChatContext';

interface RoomGridProps {
  onSelectRoom: (roomId: string) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ onSelectRoom }) => {
  const { roomCounts, disabledRooms } = useChat();

  return (
    <div className="w-full space-y-2">
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
  );
};
