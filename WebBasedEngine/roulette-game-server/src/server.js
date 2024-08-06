// src/server.js
const http = require('http');
const app = require('./app');
const { port } = require('./config/index');
const connectDB = require('./config/db');
const socketIo = require('socket.io');

// Connect to the database
connectDB();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
