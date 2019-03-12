require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("Database successfully connected"))
  .catch(err => console.log("Database connection failed", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes);
app.use("/files", express.static(path.resolve(__dirname, "../tmp/uploads")));

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", socket => {
  console.log("new client connection", socket.id);
  socket.on("newImageReq", data => {
    io.sockets.emit("newImage", data);
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(3000, () => {
  console.log("Express running on port 3000");
});
