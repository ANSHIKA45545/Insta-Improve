require("dotenv").config();
const express =require("express");
const cors = require("cors");
const authRoute=require("./routers/auth-router");
const postRoute = require("./routers/post-router");
const messageRoute = require("./routers/message-router");
const connectDb = require("./utils/db");
const errorMiddleware=require("./middleware/error-middleware")
const userRoutes = require("./routers/userList");
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());             //this is middleware
app.use(express.urlencoded({ extended: true }));

//cors
const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api/auth",authRoute);
app.use("/api/post", postRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

const server = http.createServer(app);

// Create server & Socket.IO
const io = new Server(server, {
  cors: { origin: "*" },
});

// 2️⃣ Track online users
const onlineUsers = {}; // { username: socketId }

// 3️⃣ Socket.IO events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // When a user comes online
  socket.on("user:online", (username) => {
    onlineUsers[username] = socket.id;
    io.emit("users:online", Object.keys(onlineUsers)); // broadcast online users
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    for (let user in onlineUsers) {
      if (onlineUsers[user] === socket.id) {
        delete onlineUsers[user];
      }
    }
    io.emit("users:online", Object.keys(onlineUsers)); // broadcast updated list
  });
});

const PORT =5000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);  // Exit to prevent silent failure
});
