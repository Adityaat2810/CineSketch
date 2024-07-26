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

}

const Chat = ({ roomId, userId, userName }: ChatInterface) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.emit("join-room", roomId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/guess/${roomId}`);
        setMessages(response.data.data);
        console.log('messages from db call', response.data.data)
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { roomId, message, userId });
      setMessage("");
    }
  };

  return (
    <div className='pl-5'>
      <div className="chat-messages text-zinc-500">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.userId}:</strong> {msg.content}
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
