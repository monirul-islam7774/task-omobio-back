'use strict'
/*Import all the necessary modules to make the API*/
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/index');
var multer  = require('multer')
const helper = require('./controller/helper');

// image save 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      console.log(file)
      let fileName = file.originalname.split('.')
      let ext = helper.getExtension(file.originalname)
      cb(null, fileName[0] + '-' + Date.now()+'.'+ext)
    }
})

var upload = multer({ storage: storage }).array('file',10);

const userController = require('./controller/user/userController');
const dashboardController = require('./controller/dashboard/dashboardController');
/**
 * Create Express server.
 */
const corsOptions = {
  origin: 'http://localhost:8080'
}
const app = express();
app.use(cors(corsOptions));
app.use(express.static('uploads'))
mongoose.connect(dbConfig.url, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//user routes

//registration, login, update user and update password
app.post('/user/create', userController.createUser);
app.post('/user/login', userController.getUser);
app.get('/user/getall', userController.getAllUser);
app.use('/images', express.static('uploads'))
// dashboard routes
app.post('/dashboard/notification', upload, dashboardController.sendNotification);

let port = 1234;
app.listen(port, ()=>{
    console.log('Server is up and running on ' + port)
})
