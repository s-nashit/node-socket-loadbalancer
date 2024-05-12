express = require('express');
port = 3000;
app = express();
path = require('node:path');


app.use(express.static(path.join(__dirname, 'public')));

server = app.listen(port, () => {
    console.log(`server.... is running on port ${port}`)
})

io = require('socket.io')(server);

socketsConnected = new Set()

function onConnected(socket){
    // console.log('user connected')
    // console.log(socket.id)
    socketsConnected.add(socket.id)
    console.log(socketsConnected.size)
    io.emit('total users', socketsConnected.size)

    socket.on('disconnect', () =>{
        // console.log('user disconnected');
        socketsConnected.delete(socket.id)
        console.log(socketsConnected.size)
        io.emit("total users :", socketsConnected.size)
    })
    // console.log("total user connected: ",socketsConnected.size)
    socket.on('message', (data) =>{
        console.log(data)
        socket.broadcast.emit('message', data)
    })


}



io.on('connection', onConnected)

