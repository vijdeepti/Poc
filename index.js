// Prepare the Server
const server = require("http").createServer();
const io = require("socket.io")(server);
var _ = require('lodash');
const notification = io.of('/notification');
const redis = require("redis");
// Authenticate!
io.origins('*:*');

const joinRoom = (userId=1, socket) =>{
  socket.join(userId);
}
/**default namespace connection- can be used */
//_.each(io.nsps, forbidConnections);
async function verifyUser (token) {
  return new Promise((resolve, reject) => {
    // setTimeout to mock a cache or database call
    setTimeout(() => {
      // this information should come from your cache or database
      const users = [
        {
          id: 1,
          name: 'mariotacke',
          token: 'secret token',
        },
      ];

      const user ='user'

      if (!user) {
        return reject('USER_NOT_FOUND');
      }

      return resolve(user);
    }, 200);
  });
}

io.on('connection', function(socket){
  socket.auth = false;

  socket.on('authenticate', function(data){
    verifyUser(data.token,socket).then(()=>{
      socket.auth = true;
     _.each(io.nsps, function(nsp) {
        restoreConnection(nsp, socket);
      });
      joinRoom('room1',socket)
     socket.emit('authenticated','')
    }).catch(()=>{
      socket.emit('unAuthorised','')
      socket.disconnect();
    })
  });
  socket.on('disconnect', function(data){
    socket.auth = false;
  });
  socket.on('getmessage',function(){
    console.log('[jjfjfj')
  io.to('room1').emit('message');
  })
});

function forbidConnections(nsp) {
  nsp.on('connect', function(socket) {
    if (!socket.auth) {
      delete nsp.connected[socket.id];
    }
  });
}

/**
 * If the socket attempted a connection before authentication, restore it.
 */
function restoreConnection(nsp, socket) {
  if (_.find(nsp.sockets, {id: socket.id})) {
    nsp.connected[socket.id] = socket;
  }
}
/**namespace level connection 
notification.on('connection', socket => {
  console.log(notification)
  socket.on('authenticate', function(data){
    verifyUser(data.token, socket)
  });

  socket.on('disconnect', function(data){
    socket.auth = false;
  });
});
*/
// Start it up!
const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
server.listen(port, host, logger);
