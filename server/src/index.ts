import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'

const app = express();
const server = createServer(app)

//so it is instance of circuit
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const port = 3000 

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
