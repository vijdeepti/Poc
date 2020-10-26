const http = require("http");
const Koa = require('koa');
const cors = require('@koa/cors');
const IO = require("socket.io")
const socketio = require('./socketService')

const app = new Koa();
app.use(cors({credentials:{'Access-Control-Allow-Credentials':true}}));

app.server = http.createServer(app.callback())
app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};
app.io = IO(app.server)

socketio.init(app)

const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
app.listen(port,host,logger)

app.use((ctx,next)=>{
  console.log(ctx.app.io)
})