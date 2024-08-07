import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// importing routs
import userRoutes from './routes/user.js';
import roomRoutes from './routes/room.js';
import playerRoutes from './routes/player.js';
import guesRoutes from './routes/guess.js'
import moviesRoutes from './routes/movies.js'
import sessionRoute from './routes/session.js'

import { db } from './lib/db.js';

config({ path: './.env' });

const prisma = db
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/player', playerRoutes);
app.use('/api/v1/guess', guesRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/session',sessionRoute)

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Using error middleware
app.use(errorMiddleware);


// CORS configuration for socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('canvasImage', ({ roomId, canvasData }) => {
    // Broadcast the data to all other clients in the same room
    socket.to(roomId).emit('canvasImage', canvasData);
  });

  socket.on('chatMessage', async (data) => {
    const { roomId, message, userId } = data;

    try {
      // Validate userId
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        console.error('Invalid userId');
        return;
      }

      // Validate gameRoomId
      const gameRoom = await prisma.gameRoom.findUnique({
        where: { id: roomId },
      });

      if (!gameRoom) {
        console.error('Invalid gameRoomId');
        return;
      }

      // Save the message to the database
      const savedGuess = await prisma.guess.create({
        data: {
          content: message,
          userId,
          gameRoomId: roomId,
        },
      });


      // Emit the message to all clients in the room
      // Change this line to emit the saved guess object
      io.to(roomId).emit('chatMessage', savedGuess);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('gameStarted',(gameRoomId)=>{
    console.log('game started on room ',gameRoomId)
    socket.to(gameRoomId).emit('startGameForUser')
  })

  socket.on('clearCanvas', (roomId) => {
    // Broadcast the clearCanvas event to all other clients in the same room
    socket.to(roomId).emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
