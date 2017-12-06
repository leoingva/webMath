'use strict';
var express = require('express');
var app = express();
var io = require('socket.io');
var http = require('http');
var server = http.createServer(app);
var Config = {
    HTTP_PORT: 8090
  };
app.use(express.static(__dirname + '/'));
server.listen(Config.HTTP_PORT);

console.log('Listening on port', Config.HTTP_PORT);

io = io.listen(server, { log: false });

  io.sockets.on('connection', function (socket) {
    console.info('Client connected');
    
    socket.emit('connected');

    socket.on('disconnect', function () {
      console.info('Client disconnected');
    });

  });