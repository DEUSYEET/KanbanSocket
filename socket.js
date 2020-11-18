module.exports = io => {
    let users = {};

    io.on('connect', socket => {
        socket.on('user-connect', user => {
            users[socket.id] = user;
            io.sockets.emit('user-connect', `${user} connected`)
        });

        socket.on('chat-message', message => {
            io.sockets.emit('chat-message', {
                user: users[socket.id],
                message
            });
        });
    });
}