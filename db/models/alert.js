const mongoose = require('mongoose');
var multer = require('multer');


const alertSchema = new mongoose.Schema({
    reminderText: {
        type: String,
    },

    image: {
        type: String
    },

    day : { 
        type : String 
    },

    time : {
        type : String
    }

})




const Alert = mongoose.model('Alert', alertSchema)


module.exports = Alert;