const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Corrected line

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data }); //receive-location send to frontend
  });
  console.log("connected");

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});



app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
