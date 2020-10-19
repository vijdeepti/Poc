const _ = require('lodash');
const redis = require("redis");
const IO = require("socket.io")


function init(server) {
  const io = IO(server)
  io.origins('*:*');
  io.on('connection', function (socket) {
    socket.on('authenticate', function (data) {
      console.log('authenticate event')
      verifyUser(data, socket).then(() => {
        _.each(io.nsps, function (nsp) {
          restoreConnection(nsp, socket);
        });
        joinRoom(data, socket)
        socket.emit('authenticated', '')
      }).catch(() => {
        socket.emit('unAuthorised', '')
        // socket.disconnect();
      })
    });
    socket.on('disconnect', function () {
    });

    socket.on('getmessage', function (userId) {
      // io.to(userId).emit('message', );
      sendEvent(userId,'message','message is for user ' + userId + ' ' + Date.now())
    })
    // all event listeners will come here

  });

}

function sendEvent(userId, eventName, data) {
  io.to(userId).emit(eventName, data);
}


const joinRoom = (userId = 1, socket) => {
  socket.join(userId);
}
/**default namespace connection- can be used */
//_.each(io.nsps, forbidConnections);
async function verifyUser(userId) {
  return new Promise((resolve, reject) => {
    // setTimeout to mock a cache or database call
    setTimeout(() => {
      // this information should come from your cache or database
      const users = [
        {
          id: 1,
          name: '100',
          token: 'token',
        },
        {
          id: 2,
          name: '101',
          token: 'token2',
        },
      ];

      const user = users.find(user => user.name === userId)
      console.log(userId, user)
      if (!user) {
        return reject('USER_NOT_FOUND');
      }

      return resolve(user);
    }, 200);
  });
}


/**
 * If the socket attempted a connection before authentication, restore it.
 */
function restoreConnection(nsp, socket) {
  if (_.find(nsp.sockets, { id: socket.id })) {
    nsp.connected[socket.id] = socket;
  }
}

module.exports = {
  init,
  sendEvent,
  
}