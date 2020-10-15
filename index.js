// Prepare the Server
const server = require("http").createServer();
const io = require("socket.io")(server);
const notification = io.of('/notification');
// Authenticate!
io.origins('*:*');

const joinRoom = (userId, socket) =>{
  socket.join(userId);
  console.log(socket.rooms)
  socket.to(userId).emit('some event');
}
/**default namespace connection- can be used */
const checkAuthToken = (token, socket) => {
    if(token){
      //descryptToken and getUserID
    socket.auth = true;
    joinRoom(userId=1, socket)
    return true
    }
    return false
}

io.on('connection', function(socket){
  socket.on('authenticate', function(data){
    checkAuthToken(data.token,socket)
  });
  socket.on('disconnect', function(data){
    socket.auth = false;
  });
});

/**namespace level connection */
notification.on('connection', socket => {
  console.log(notification)
  socket.on('authenticates', function(data){
    checkAuthToken(data.token, socket)
  });

  socket.on('disconnect', function(data){
    socket.auth = false;
  });
});
// Start it up!
const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
server.listen(port, host, logger);
