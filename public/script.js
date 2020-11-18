// Uses socket.io.js (index.html) to make a connection with the server
const socket = io('http://localhost:3000');
// const socket = io('http://kanbansocket.us-west-1.elasticbeanstalk.com');

const user = prompt('Please enter a username');
socket.emit('user-connect', user);

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');

form.addEventListener('submit', evt => {
    evt.preventDefault();

    let message = input.value;
    input.value = '';

    socket.emit('chat-message', message);
});

socket.on('chat-message', body => {
    console.log(`${body.user}: ${body.message}`);
});