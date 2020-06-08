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

export {
    helloSocket
}