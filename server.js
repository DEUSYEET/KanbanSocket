const express = require('express');
const app = express();
const accounts = require('./accounts');
const bodyParser = require('body-parser');

// Express piggy-backs off http or https. This allows Socket.IO integration
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get('/login', (req, res) => {
  res.sendFile('login.html',{root:"public"});
});

app.route('/createAccount').post(accounts.createAccount);
app.route('/getAccount').post(accounts.getAccount);
app.route('/loginAccount').post(accounts.login);

// pass IO to socket.js module
const socket = require('./socket');
socket(io);

server.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`));