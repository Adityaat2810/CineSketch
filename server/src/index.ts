import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'
import { config } from 'dotenv';

const app = express();
const server = createServer(app)

// importing routes 
import userRoutes from './routes/user'


config({
  path: './.env'
})

//const var = process.env.var || ''

//so it is instance of circuit
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const port = 3000 

app.use(express.json())

app.use("/api/v1/user",userRoutes)
app.get('/',(req,res)=>{
    res.send("hello world!")
})

io.on("connection",(socket)=>{
    console.log('A user connected');

  // Handle 'canvasImage' event
   socket.on('canvasImage', (data: CanvasImageData) => {
    // Broadcast the data to all other connected clients
    socket.broadcast.emit('canvasImage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
