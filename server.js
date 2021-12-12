const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a client connected');
    socket.on('disconnect', () => {
        console.log('client disconnected');
      });
  });

  // API ENDPOINTS
  app.get('/play', (req, res) => {
    io.emit('play'); // Send the play event to the client
    res.send({result: "ok", event: "play"})
  });
  app.get('/pause', (req, res) => {
    io.emit('pause'); // Send the play event to the client
    res.send({result: "ok", event: "pause"})
  });
  app.get('/skip', (req, res) => {
    io.emit('skip'); // Send the play event to the client
    res.send({result: "ok", event: "skip"})
  });     
  app.get('/load', (req, res) => {
    var src = req.query.src
    io.emit('load', {src}); // Send the load new clip event, and play the video
    res.send({result: "ok", event: "load"})
});  

server.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);
});