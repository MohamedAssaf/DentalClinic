const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema ({
    in: {type: Number, default: 0},
    out: {type: Number, default: 0},
    inGateName: String,
    outGateName: String,
    count: {type: Number, default: 0},
    name: {type: String, required:true},
    type: {type: String, required:true}
})

module.exports = mongoose.model('counters', counterSchema);
