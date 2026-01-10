const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection", socket => {

  socket.on("join-room", room => {
    socket.join(room);
    socket.to(room).emit("other-joined");
  });

  socket.on("signal", data => {
    socket.to(data.room).emit("signal", data.signal);
  });

});

http.listen(3000, () => {
  console.log("Running at http://localhost:3000");
});
