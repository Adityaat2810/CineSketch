import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { config } from 'dotenv';
import userRoutes from './routes/user.js';
import roomRoutes from './routes/room.js'
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

config({ path: './.env' });

const app = express();
const server = createServer(app);
app.use(cors());

// CORS configuration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const port = 3000;

app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/room', roomRoutes);

app.get('/', (req, res) => {
  res.send('hello world!');
});

// Using error middleware
app.use(errorMiddleware);

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

  socket.on('clearCanvas', (roomId) => {
    // Broadcast the clearCanvas event to all other clients in the same room
    socket.to(roomId).emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
