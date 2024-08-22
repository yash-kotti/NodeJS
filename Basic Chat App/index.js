const express = require("express");
const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected : ", socket.id);

  socket.on("chat-message", (msg) => {
    console.log("Message from Client", msg);
    io.emit("chat-message", msg);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});
server.listen(9000, () => {
  console.log(`Server running on PORT 9000`);
});
