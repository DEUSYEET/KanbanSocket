module.exports = io => {
    users = {}

    io.on('connect', socket => {
        socket.on('user-connect', user => {
            users[socket.id] = user
        });

        socket.on('chat-message', message => {
            io.sockets.emit('chat-message', {
                user: users[socket.id],
                message
            });
        });
    });
}