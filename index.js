// Prepare the Server
const server = require("http").createServer();
const socketio = require('./socketService')

socketio.init(server)
// Start it up!
const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
server.listen(port, host, logger);
