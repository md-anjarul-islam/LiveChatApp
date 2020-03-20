const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const userHandler = require("./model/user");
const messageHandler = require("./model/message");
const authProvider = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/users/:userId/messages", authProvider, async (req, res) => {
  let id1 = req.headers.user._id;
  let id2 = req.params.userId;
  try{
    const messages = await messageHandler.getMessage(id1, id2);
    res.json(messages);
  }catch(err){
    res.json({message: "Error!"});
  }
});

app.post("/api/users/:userId/messages", authProvider, async (req, res) => {
  let newMessage = req.body.message;
  let id1 = req.headers.user._id;
  let id2 = req.params.userId;

  try{
    newMessage = await messageHandler.createMessage(id1, id2, newMessage);
    user2 = await userHandler.findUser({_id: id2});
    io.to(user2.socketId).emit("updateMessage", newMessage);
    res.json(newMessage);
  }catch(err){
    res.json({message: "Error!"});
  }
});

app.post("/api/register", async function(req, res) {
  let newUser = await userHandler.createUser(req.body.user, req.body.socketId);
  let allUser = await userHandler.findAllUser();
  allUser.forEach(user => {
    io.to(user.socketId).emit("updateUser", newUser);
  });

  res.json(newUser);
});

app.post("/api/login", async function(req, res) {
  let loggedUser = await userHandler.login(req.body.user, req.body.socketId);
  loggedUser = await userHandler.findUser(req.body.user);

  if (loggedUser) {
    let allUser = await userHandler.findAllUser();
    allUser.forEach(user => {
    console.log("emitting to ",user.name);    

      io.to(user.socketId).emit("updateUser", allUser);
    });
    let token = loggedUser.getAuthToken();
    res.set({"x-token":token}).json(loggedUser);
  } else {
    res.status(401).json(loggedUser);
  }
});

app.get("api/users", async function(req, res) {
  let allUser = await userHandler.findAllUser();
  res.json(allUser);
});

io.on("connection", socket => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => console.log("Listening on port 3000"));
