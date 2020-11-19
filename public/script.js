// Uses socket.io.js (index.html) to make a connection with the server
// const socket = io('http://localhost:3000');
const socket = io('http://kanbansocket.us-west-1.elasticbeanstalk.com');

// HTML elements
const messagesDOM = document.getElementById('message-container');
const inputDOM = document.getElementById("message-input");
const formDOM = document.getElementById('message-form');
const urlString = window.location.search;
const params = new URLSearchParams(urlString);
console.log(params.get("login"))

var user;
var userColor;

if(params.get("login")){
    user = params.get("username") 
    userColor="#"+params.get("color");
    console.log(userColor)
} else {
    user = prompt('Welcome! Please enter a username');
    userColor = prompt('Enter a hexcode color for your name!');
}

let displayMessage = (user, message, local = false) => {
    let messageDOM = document.createElement('div');

    let userDOM = document.createElement('span');
    if(local) { 
        userDOM.className = 'local';
        userDOM.style.color = userColor; 
    }
    userDOM.innerText = user;
    messageDOM.append(userDOM);

    let contentDOM = document.createElement('p');
    contentDOM.innerText = message;
    messageDOM.append(contentDOM);

    // Must be prepend
    messagesDOM.prepend(messageDOM);
}

let displayServerMessage = message => {
    let messageDOM = document.createElement('div');
    messageDOM.innerText = message;
    messagesDOM.prepend(messageDOM);
}

// Get username on connect
// TODO replace with accounts?

socket.emit('user-connect', user);
formDOM.addEventListener('submit', evt => {
    evt.preventDefault();

    // Store message and empty form
    let message = inputDOM.value.trim();
    inputDOM.value = '';

    // Send message to server
    socket.emit('chat-message', message);
    displayMessage(user, message, true);
});

//Socket.IO
socket.on('chat-message', data => {
    displayMessage(data.user, data.message, data.user == user);
})

// Receive a plain message from the server
socket.on('user-connect', message => {
    displayServerMessage(message);
})
