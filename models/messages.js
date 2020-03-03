const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pastmessages = new Schema({
    message : {type : String},
    username : {type : String},
    color : {type : String},
    room : {type : String}
})
Pastmessages.set('timestamps', true)

module.exports = mongoose.model('Pastmessages', Pastmessages)