const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Log = new Schema({
    event : { type : String},
    data : {type : String}
})
Log.set('timestamps', true)

module.exports = mongoose.model('Log', Log)