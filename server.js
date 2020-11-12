const express = require('express');
const app = express();

// Express piggy-backs off http or https. This allows Socket.IO integration
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})



// pass IO to server.js module

server.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`));