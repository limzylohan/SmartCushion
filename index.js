const path = require('path');
const express = require('express');
var multer  = require('multer');
const fs = require('fs');
const uuidv1 = require('uuid/v1');


require('./helper.js');


//connect to the mongodb
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/smartcushion', {
    useNewUrlParser: true,
    useCreateIndex: true
})

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to the database");
});




const Alert = require("./db/models/alert")
const Alarm = require("./db/models/alarmAudio")
const app = express();


//HBS views setup
const viewsPath = path.join(__dirname, './templates/views');

//setup static directory to serve
const publicDirectoryPath = path.join(__dirname, './public');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname ) 
    }
  })
   
  var upload = multer({ storage: storage })


app.use(express.static(publicDirectoryPath))


//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);


// parsing middleware
app.use(express.urlencoded());
app.use(express.json({limit: '50mb'}));


// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));









//routes
app.get('/', (req, res) => {
    Alarm.find({}, function(err, alarm) {
        var length = alarm.length 
        audio = alarm[length-1]

    Alert.find({}, function(err, alerts) {
        console.log(alerts)
        res.render('home',  {alarm : audio, reminders : alerts});
    })
    })
})

app.get("/getAlerts", (req,res)=> {
    Alert.find({}, function(err, alarms) {
        
        res.send(alarms)
    })
})

app.post("/create-alert", (req, res) => {
    console.log("creating alert")
    uniqueId = uuidv1();
    fileName = "public/images/" + uniqueId + ".jpg"

    console.log(fileName)
    fs.writeFile(fileName, new Buffer(req.body.image, "base64"), function(err) {});

    req.body.image = uniqueId
    const alert = new Alert(req.body)
    // console.log(alert)
    alert.save(function (err, alert) {
        if (err) return console.error(err);
        console.log("Alert Saved to collection.");
      }); 

    res.sendStatus(200)
    
})


app.post("/upload-audio", upload.single('audioStream'), (req,res) => {
    console.log(req.file)
    const alarm = new Alarm({"name": req.file.originalname});
    alarm.save(function(err,alarm){
    })
    res.redirect("/")
    })
    

// app.get("/test" , (req,res) => { 
//     res.render("test");
// })

// app.get("/testResponse" , (req,res) => {
//     res.json({"Test" : "Success"})
// })



const port = process.env.port || 3000;
app.listen(port, () => { "Server is up on port " + port });

