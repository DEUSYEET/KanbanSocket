// TODO update URL to be consistent with AWS
// Uses socket.io.js (index.html) to make a connection with the server
const socket = io('http://localhost:3000');
// const socket = io('http://kanbansocket.us-west-1.elasticbeanstalk.com');

const messagesDOM = document.getElementById('prev-message-container');
const inputDOM = document.getElementById("message-input");
const formDOM = document.getElementById('message-form');

formDOM.onsubmit = (e) => {
    e.preventDefault();
}

let displayMessage = (user, message, local = false) => {
    let messageDOM = document.createElement('div');

    let userDOM = document.createElement('span');
    if(local) userDOM.className = 'local';
    userDOM.innerText = user;
    messageDOM.append(userDOM);

    let contentDOM = document.createElement('p');
    contentDOM.innerText = message;
    messageDOM.append(contentDOM);

    messagesDOM.prepend(messageDOM);
}

let displayServerMessage = message => {
    let messageDOM = document.createElement('div');
    messageDOM.innerText = message;
    messagesDOM.prepend(messageDOM);
}

const user = prompt('Welcome! Please enter a username');
socket.emit('user-connect',user);
// displayMessage("Server", user + ' connected');

//Socket.IO
socket.on('chat-message', data => {
    displayMessage(data.user,data.message);
})

socket.on('user-connect',message => {
    displayServerMessage(message);
})