import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';

function StartGame({
  userId,
  gameRoomId
}: {
  userId: string,
  gameRoomId: string
}) {
  const [room, setRoom] = useState<any>(null);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const handleJoinRoom = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/v1/room/getRoom/`, {
          roomId: gameRoomId
        });
        console.log('response of room ', response.data.data);
        setRoom(response.data.data);
      } catch (error) {
        console.error('Error joining room:', error);
      }
    };

    handleJoinRoom();
  }, [gameRoomId]);

  useEffect(() => {
    if (room) {
      const player = room.players.find((player: any) => player.userId === userId);
      setCurrentPlayer(player);
      setIsOwner(currentPlayer?.userId === room.ownerId);
    }
  }, [room, userId]);

  return (
    <div>
      {isOwner ? (
        <div>
          {room && gameRoomId ? (
            <Button>
              Start Game
            </Button>
          ) : (
            <div>
              Loading .....
            </div>
          )}
        </div>
      ) : (
        <div>
          Not owner
        </div>
      )}
    </div>
  );
}

export default StartGame;
