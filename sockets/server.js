const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Receive data emitted by client
  socket.on('user_data', (data) => {
    console.log('Username: ' + data.user);
    console.log('Email: ' + data.email);

    socket.emit('new_user', {
      response: 'This is a response from the server'
    });
  });

});

server.listen(3000);
