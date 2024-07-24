import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const socket = io("http://localhost:3000");

interface ChatInterface {
  roomId: string;
  userId: string;
}

interface Message {
  userId: string;
  message: string;
}

const Chat = ({ roomId, userId }: ChatInterface) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("chatMessage", (data: Message) => {
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
            <strong>{msg.userId}:</strong> {msg.message}
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
