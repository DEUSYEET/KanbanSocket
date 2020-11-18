module.exports = io => {
    let users = {};

    io.on('connect', socket => {
        // console.log('new connection');

        socket.on('user-connect', user => {
            users[socket.id] = user;
            io.sockets.emit('user-connect', `${user} connected`)
        })
    });
}