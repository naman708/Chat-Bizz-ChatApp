const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require('http'); // Require http module
const socketIo = require('socket.io'); // Require socket.io module

const app = express();
const server = http.createServer(app); // Create an HTTP server instance
const io = socketIo(server); // Attach socket.io to the HTTP server


const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});


const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const GroupUser = require('./models/groupUser');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRoutes = require('./routes/group');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
app.use(adminRoutes);

app.use((req, res) => {
  console.log('url', req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

User.hasMany(Chat);
Chat.belongsTo(User);
Group.hasMany(Chat);
Chat.belongsTo(Group);
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Listen for 'message' events from clients
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Example: Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
