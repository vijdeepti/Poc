
function init(app) {
  app.io.origins('*:*');
  app.io.on('connection', function (socket) {
    socket.on('authenticate', function (data) {
      verifyUser(data, socket).then(() => {
        joinRoom(data, socket)
        socket.emit('authenticated')
      }).catch(() => {
        socket.emit('unAuthorised')
        // socket.disconnect();
      })
    });
    socket.on('disconnect', function () {
    });

    // all event listeners will come here

    socket.on('getmessage', function (userId) {
      sendEvent(app,userId,'message','message is for user ' + userId + ' ' + Date.now())
    })
    socket.on('event1', function (userId) {

    })
    socket.on('event2', function (userId) {

    })
  });

}

function sendEvent(app,userId, eventName, data) {
  app.io.to(userId).emit(eventName, data);
}


const joinRoom = (userId, socket) => {
  socket.join(userId);
}
/**default namespace connection- can be used */
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

module.exports = {
  init,
}