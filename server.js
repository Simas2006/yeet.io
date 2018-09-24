var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var PORT = process.argv[2] || 8000;

app.use("/public",express.static(__dirname + "/public"));

io.on("connection",function(socket) {
  socket.on("log",function(msg) {
    console.log(`[LOG] ${msg}`);
  });
});

http.listen(PORT,function() {
  console.log("Listening on port " + PORT);
});
