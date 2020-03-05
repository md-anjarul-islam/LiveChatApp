const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const allMessage = [];

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.get('/messages', function(req, res){
    res.send(allMessage);
});

io.on("connection", (socket)=>{
    console.log('a user connected');
    
    socket.on("newMessage", function(message){      /// recieved a new message
        allMessage.push(message);
        console.log(message, allMessage);
        io.emit("updateMessage", allMessage);   // save in database and then send back all message
    })

    socket.on("disconnect", ()=>{
        console.log("a user disconnected");        
    });

});

server.listen(3000, ()=> console.log("Listening on port 3000"));