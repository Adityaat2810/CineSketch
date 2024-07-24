import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { config } from 'dotenv';
import userRoutes from './routes/user.js';
import roomRoutes from './routes/room.js';
import playerRoutes from './routes/player.js';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

config({ path: './.env' });

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/room', roomRoutes);
app.use('/api/v1/player', playerRoutes);

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

  socket.on('chatMessage', (data) => {
    const { roomId, message, userId } = data;
    io.to(roomId).emit('chatMessage', { message, userId });
  });

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
