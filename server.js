// initializing server
// importing express :-
const express = require('express');

// whatever express is returning I am storing it in app. sets up our express -> allow us to create server.
const app = express();

// I am making a server that requires HTTP. So, I am importing HTTP using 'require' and linking it to our
// app, which is express server.
const server = require('http').Server(app);

// giving public folde to our express application. basically linking my frontend to backend
app.use(express.static('public'));

// importing io and linking it with server
const io = require('socket.io')(server); 

// whenever io is connected it gives us unique socket for every client
io.on('connection', (socket)=>{
    console.log('connection established', socket.id);
    // whenever my socket is getting message from user, it(socket) give that message to io.
    // And my io should emit that message to all other sockets.
    // data is combination of username and password
    socket.on('message',(data)=>{
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log("User left the chat");
    });

})

// this is port on which our server will run
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`server is run on PORT ${9000}`)
})