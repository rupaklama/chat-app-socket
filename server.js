const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

process.on("uncaughtException", err => {
  console.log("uncaught exception...shutting down");
  console.log(err.name, ":", err.message);
  process.exit(1);
});

const app = express();

// sock.io setup
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.port || 2000;

app.use(express.static(path.join(__dirname, "public")));

// let count = 0;
const message = "welcome to Chatty!";

// socket param is an object that contains information about the current connection
io.on("connection", socket => {
  console.log("New WebSocket connection!");

  // socket.emit() is to send Event from our server with some data to the Client
  // note: need to setup our own 'custom' events to feed the need of our application
  // socket.emit("countUpdated", count);
  // note: the second arg value in the event above is accessible in the client on the callback function

  // note: listening an event in the client
  // socket.on("increment", () => {
  //   count++;

  // notify only particular connection in the client with updated data
  // socket.emit("countUpdated", count);

  // note: notify many connected connections at once
  //   io.emit("countUpdated", count);
  // });

  // note: Emit ONLY to the PARTICULAR CONNECTION
  socket.emit("message", message);

  // note: Emit to EVERYONE but not to the current particular connection
  socket.broadcast.emit("message", "A new user has joined!");

  // note: on callback arg, server has access to data sent by client
  socket.on("clientMessage", msg => {
    //  note: io.emit to send/emit to EVERYONE
    io.emit("message", msg);
  });

  // built in event
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

server.listen(port, () => {
  console.log(`Server is listening @ port ${port}!`);
});

process.on("unhandledRejection", err => {
  console.log("unhandled rejection...shutting down");
  console.log(err.name, ":", err.message);

  server.close(() => {
    process.exit(1);
  });
});
