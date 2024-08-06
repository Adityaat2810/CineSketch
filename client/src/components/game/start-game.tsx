import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';

function StartGame({
  userId,
  gameRoomId
}: {
  userId: string,
  gameRoomId: string
}) {
  const [room, setRoom] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [noOfMovies, setNoOfMovies] = useState(0);

  const handleStartGame = async () => {
    console.log('Starting game');

    if (Number(noOfMovies) <= 0) {
      alert('Please enter a valid number of movies (greater than 0).');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/movies/gameRoom/${gameRoomId}`, {
        noOfMovies: Number(noOfMovies)
      });

      if (response.data.success) {
        alert(`Game started successfully! ${response.data.data.count} movies assigned.`);
        // Additional logic for starting the game session can go here
      } else {
        alert('Failed to start game: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error starting game:', error);
     
    }

    // Additional game setup logic can go here
    // For example:
    // - Create first session
    // - Set up game state
    // - Navigate to game play screen
  };

  useEffect(() => {
    const handleGetRoom = async () => {
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

    handleGetRoom();
  }, [gameRoomId]);

  useEffect(() => {
    if (room) {
      //@ts-ignore
      const player = room.players.find((player: any) => player.userId === userId);
      setCurrentPlayer(player);
      console.log('player is ',player)
      //@ts-ignore
      setIsOwner(player?.userId === room.ownerId);
    }
  }, [room, userId]);

  return (
    <div>
      {isOwner ? (
        <div>
          {room && gameRoomId ? (
            <div>
              <Button onClick={handleStartGame}>
                Start Game
              </Button>
              <input
                type="number"
                placeholder="select no of moves"
                value={noOfMovies}
                onChange={(e) => setNoOfMovies(Number(e.target.value))}
              />
            </div>
          ) : (
            <div>Loading .....</div>
          )}
        </div>
      ) : (
        <div>Waiting for owner to start the game...</div>
      )}
    </div>
  );
}

export default StartGame;