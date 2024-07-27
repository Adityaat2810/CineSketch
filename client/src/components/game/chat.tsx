import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';

const socket = io("http://localhost:3000");

interface ChatInterface {
  roomId: string;
  userId: string;
  userName: string;
}

interface Message {
  content: string;
  userId: string;
  userName?: string;
}

interface Player {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string | null;
  joinedAt: string;
}

const Chat = ({ roomId, userId, userName }: ChatInterface) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.emit("join-room", roomId);

    const fetchMessagesAndPlayers = async () => {
      try {
        const [messagesResponse, playersResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/v1/guess/${roomId}`),
          axios.get(`http://localhost:3000/api/v1/room/players/${roomId}`)
        ]);
        setMessages(messagesResponse.data.data);
        setPlayers(playersResponse.data.data);
        console.log('messages from db call', messagesResponse.data.data);
        console.log('players in room', playersResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessagesAndPlayers();

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { roomId, message, userId, userName });
      setMessage("");
    }
  };

  const getPlayerName = (userId: string) => {
    const player = players.find(p => p.userId === userId);
    console.log('player is ', player);
    return player?.username || 'Unknown User';
  };

  return (
    <div className='pl-5'>
      <div className="chat-messages text-zinc-500">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{getPlayerName(msg.userId)}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default Chat;