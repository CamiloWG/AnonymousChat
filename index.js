const path = require('path')
const express = require('express');
const app = express();


//Set port
app.set('port', process.env.PORT || 3000);




//Cargar UI
app.use(express.static(path.join(__dirname, 'public')));


//Starting server
const server = app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto:', app.get('port'));
});




const SocketIO = require('socket.io');
const io = SocketIO(server);

//Sockets
io.on('connection', (socket) => {
    console.log(`Nueva conexion: ${socket.id}`)
    socket.on('chat:message', (user) => {
        io.sockets.emit('chat:message', user);
    });

    socket.on('chat:typing', (name) => {
        socket.broadcast.emit('chat:typing', name);
    });
});





