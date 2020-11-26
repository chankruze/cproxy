/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Nov 15 2020 00:07:09 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const initSocketIO = (server) => {
  // socket IO
  const io = require("socket.io")(server);
  // socket connection event
  io.on("connection", (socket) => {
    console.log(`socket connected: ${socket.id}`);

    // chat message event
    socket.on("join_room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit("user_connected", userId);
      console.log(`${userId} has joined ${roomId}`);
      // io.emit("join_room", { user: userId, room: roomId });

      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user_disconnected", userId);
      });
    });

    // disconnect event
    socket.on("disconnect", () => {
      console.log(`socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocketIO;
