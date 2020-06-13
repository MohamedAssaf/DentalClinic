const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io')();
const cors = require('cors');
const routes = require('./Routes');

const app = express();

let port = 3000;
let socketClient ;
let socketPort = 3001;

//                                                              INITIALIZERS

//Cors

//TODO Match cors to anything coming from react app 
var whitelist = ['http://*:4200']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());
//SocketIO
io.listen(socketPort);
io.on('connection', (client) => {
    socketClient=client;
    global.io = client;
    callHello();
});

function callHello() {
    socketClient.emit("hello", "hello")
}


//MongoDB
let mongoDB = "mongodb://mongo:27017/clinic_db"
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes


app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

app.get('/hello' , (req,res) => {
    res.sendStatus(200);
})