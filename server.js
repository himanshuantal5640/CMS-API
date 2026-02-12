require("dotenv").config();

const app = require("./app.js");
const http = require("http");
const connectDB = require("./config/db.js");

const { Server } = require("socket.io");
const { registerSocketHandlers } = require("./sockets/socket.js");

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});


registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
