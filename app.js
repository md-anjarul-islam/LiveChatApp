const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const path = require("path");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const authRoute = require("./routes/auth");
global.SOCKET_IO = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
/* 
io.on("connection", socket => {
  global.CLIENT_SOCKET = socket;
  global.SOCKET_IO = io;
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
}); */

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Listening on port", PORT));
