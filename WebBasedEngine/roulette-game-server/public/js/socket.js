// public/js/socket.js
const socket = io.connect(`http://localhost:3001`);

socket.on('connect', function() {
    console.log('Connected to the server!');
});

socket.on('gameData', function(data) {
    console.log('Game update:', data);
    // Update the game interface here
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
