"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
// importing routes 
var user_1 = require("./routes/user");
(0, dotenv_1.config)({
    path: './.env'
});
//const var = process.env.var || ''
//so it is instance of circuit
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
var port = 3000;
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.default);
app.get('/', function (req, res) {
    res.send("hello world!");
});
io.on("connection", function (socket) {
    console.log('A user connected');
    // Handle 'canvasImage' event
    socket.on('canvasImage', function (data) {
        // Broadcast the data to all other connected clients
        socket.broadcast.emit('canvasImage', data);
    });
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
server.listen(port, function () {
    console.log("server is running on port ".concat(port));
});
