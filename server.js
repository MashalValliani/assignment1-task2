//Importing Express Framework
const express = require ('express');

const { request } = require('express');

//importing nodemailer
const nodemailer = require("nodemailer");

//Creating express app
const app = express();

//creating enviroment variable for self-sign certificates 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const port = 3000;

app.use(express.static(__dirname+ '/public'))

//Construct a basic
app.get('/', function (req, res){
   })

app.listen(port);
//Sending email 
//using etheral

app.get('/public/user.html', function (req, res){
 var var1=req.query.var1;
 var var2=req.query.var2;
   
var transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kenneth96@ethereal.email',
        pass: 'hRUAq8MuPu38qvmvSD'
   }
 });
 
 var mailOptions = {
   from: 'tinder@gmail.com',
   to: var1,
   subject: 'Tinder you got a match',
   text: var2
 };
 
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });
 res.send("Email sent")
})
