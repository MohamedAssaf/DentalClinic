const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function convertSecsToMs(date) {
    if (!date || !isValidTimestamp(date)) return;

    return new Date(date * 1000);
}
  
function isValidTimestamp(date) {
    return new Date(date).getTime() > 0;
}

const violationsSchema = new Schema ({
    timestamp: {type: Date, set: date => convertSecsToMs(date), required : true },
    lane: String,
    type: {type: String, required:true},
    videoUrl: String,
    videoMimeType: String,
    imageUrl: {type: String, required: true},
    imageMimeType: {type: String, required: true},
    direction: String ,
    speed : String,
    plateNumber : String,
    vehicleClass : String,
})

module.exports = mongoose.model('violations', violationsSchema);
