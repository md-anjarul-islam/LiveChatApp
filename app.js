const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const allMessage = [];

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

let user=0;

io.on("connection", (socket)=>{
    console.log('a user connected', socket.id);
    user++;
    socket.emit(`user1`, "user"+user);
    
    socket.on("newMessage", function(message){      /// recieved a new message
        allMessage.push(message);
        console.log(allMessage);
        io.emit("updateMessage", allMessage);   // save in database and then send back all message
    })

    socket.on("disconnect", ()=>{
        console.log("a user disconnected");        
    });

});

server.listen(3000, ()=> console.log("Listening on port 3000"));