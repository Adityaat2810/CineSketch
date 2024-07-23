import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface JoinRoomProps {
  userId: string;
}

function JoinRoom({ userId }: JoinRoomProps) {
  const navigate= useNavigate()
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/player', {
        userId,
        gameRoomId: roomId,
      });

      if (response.data.success) {
        // Handle successful join (e.g., navigate to the game room or display a success message)
        console.log('Joined room successfully');
        navigate(`game-room/${roomId}`)
      }
    } catch (error) {
      console.error('Error joining room:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className='border border-zinc-500 rounded-sm p-4'>
      <p className='mb-3'>Enter room code</p>
      <Input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <Button className='w-full mt-6' onClick={handleJoinRoom}>Join Room</Button>
    </div>
  );
}

export default JoinRoom;
