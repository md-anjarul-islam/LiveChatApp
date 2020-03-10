const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const userHandler = require('./model/user');
const messageHandler = require('./model/message');

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

app.post("/api/register", async function(req, res) {
  let  user = await userHandler.createUser(req.body.user, req.body.socketId);
  let allUser = await userHandler.findAllUser();  
  allUser.forEach(user => {
      io.to(user.socketId).emit("updateUser", user);
  });

  res.json(user);
});

app.post("/api/login", async function(req, res) {
  let  loggedUser = await userHandler.login(req.body.user, req.body.socketId);
  let allUser = await userHandler.findAllUser();
  allUser.forEach(user => {
      io.to(user.socketId).emit("updateActiveUser", loggedUser);
  });

  res.json(loggedUser);
});

app.get("api/users", async function(req, res) {
  let allUser = await userHandler.findAllUser();
  res.json(allUser);
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