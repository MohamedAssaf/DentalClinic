
exports.newCount = function ( counter ) {
    global.io.emit('newCounter' , counter)
}

exports.deleteCounter = function (counter) {
    global.io.emit("deleteCounter", counter ? counter : "All")
}

exports.resetCounter = function (counter) {
    global.io.emit("resetCounter", counter ? counter : "All")
}

exports.updateCounter = function (counter) {
    global.io.emit("updateCounter", counter )
}