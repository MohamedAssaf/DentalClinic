import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function helloSocket () {
    socket.on("hello", hello => {
        console.log(hello);
        console.log("Connected!");
        fetch("http://localhost:3000/hello")
        .then( res => console.log(res))
        .catch( err => console.log(err))
    })
}

function newCounter (cb) {
    socket.on('newCounter', counter =>{
        cb(counter);
    })
}

function deleteCounter (cb) {
    socket.on('deleteCounter', counter=> cb(counter))
}

function updateCounter (cb) {
    socket.on('updateCounter', counter => cb(counter))
}

function resetCounter (cb) {
    socket.on('resetCounter', counter => cb(counter))
}

function newViolation (cb) {
    socket.on('newViolation', violation => cb(violation))
}

export {
    helloSocket,
    newCounter,
    deleteCounter,
    updateCounter,
    resetCounter,
    newViolation
}