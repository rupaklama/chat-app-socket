"use strict";

// io() - initiate socket.io connection in the client side to the server
// This will help us to Send/Receive events from Client to Server or vice verse
const socket = io();

// Receiving particular Server Event & args in the callback here
// note: the argument name can be anything here
socket.on("countUpdated", count => {
  console.log("The count has been updated!", count);
});

// Emit an Event from the Client to send data to the server
document.querySelector("#increment").addEventListener("click", () => {
  // no need to send any data since the server knows the current count & adds one to it
  socket.emit("increment");
});
