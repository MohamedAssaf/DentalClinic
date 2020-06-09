exports.newViolation = function ( violation ) {
    global.io.emit('newViolation' , violation)
}