const express = require('express');
const app = express();

// Express piggy-backs off http or https. This allows Socket.IO integration
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const port = 3000;

// pass IO to server.js module

server.listen(port, () => console.log(`Server listening on port ${port}`));