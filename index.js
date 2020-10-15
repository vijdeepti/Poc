// Prepare the Server
const server = require("http").createServer();
const io = require("socket.io")(server);
const notification = io.of('/notification');
// Authenticate!
io.origins('*:*');


/**default namespace connection- can be used */
const checkAuthToken = (token, socket) => {
    if(token){
    socket.auth = true;
    return true
    }
    return false
}
io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket)
  socket.on('authenticate', function(data){
    console.log('default')
    checkAuthToken(data.token, socket)
  });
  socket.on('disconnect', function(data){
    console.log('default')
    socket.auth = false;
  });
});

/**namespace level connection */
notification.on('connection', socket => {
  console.log('someone connected', socket.id, socket.sessionId);
  socket.on('authenticates', function(data){
    console.log(data.token)
    checkAuthToken(data.token, socket)
  });

  socket.on('disconnect', function(data){
    console.log('default')
    socket.auth = false;
  });
});
// Start it up!
const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
server.listen(port, host, logger);
