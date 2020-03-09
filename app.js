const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

const messages = [];
const users = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  messages.forEach(message => {
    if (message.socketId != newMessage.socketId)
      io.to(message.socketId).emit("updateMessage", messages);
  });
  res.json(messages);
});

app.post("/api/login", function(req, res) {
  let user = req.body;
  users.push(user);
  delete user.password;
  messages.push({
    from: user.name,
    message: "Hi, I am a new uesr.",
    socketId: user.socketId
  });

  messages.forEach(message => {
      io.to(message.socketId).emit("updateMessage", messages);
  });

  res.json(user);
});

io.on("connection", socket => {
  console.log("a user connected", socket.id);

  socket.on("newMessage", function(message) {
    /// recieved a new message
    messages.push(message);
    console.log(messages);
    socket.emit("updateMessage", messages); // save in database and then send back all message
  });
  socket.on("sentMessage", function(data) {});

  socket.on("disconnect", () => {
    // users.filter( (user) => user.socketId !== socket.id )
    console.log("a user disconnected");
  });
});

server.listen(3000, () => console.log("Listening on port 3000"));