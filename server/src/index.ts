import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { config } from 'dotenv';
import userRoutes from './routes/user.js';
import { errorMiddleware } from './middleware/error.js';
import cors from "cors"

config({ path: './.env' });

const app = express();
const server = createServer(app);
app.use(cors());

// CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const port = 3000;

app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.get('/', (req, res) => {
    res.send("hello world!");
});

// Using error middleware
app.use(errorMiddleware);

io.on("connection", (socket) => {
    console.log('A user connected');

    // Handle 'canvasImage' event
    socket.on('canvasImage', (data) => {
        // Broadcast the data to all other connected clients
        socket.broadcast.emit('canvasImage', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
