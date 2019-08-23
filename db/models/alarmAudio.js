const mongoose = require('mongoose');
var multer = require('multer');


const alarmSchema = new mongoose.Schema({
    // audioStream: {
    //     type: Buffer,
    // }
    name : {
        type : String
    }
})






const Alarm = mongoose.model('Alarm', alarmSchema)


module.exports = Alarm;