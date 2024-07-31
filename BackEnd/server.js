//we create server here 
const http = require('http');
const app=require('./app');
const port = process.env.port ||3000;
const server = http.createServer(app);

server.listen(port);//to start the server

