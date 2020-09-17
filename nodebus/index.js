var http = require('http');
var mongoose = require('mongoose');
let express = require('express');
var nodemailer = require('nodemailer');
var ucfirst = require('ucfirst');

let app = express();

let bodyParser = require('body-parser');
let amdinRoutes = require('./admin/admin-routes');
let apiRoutes = require('./api-route');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/admin',amdinRoutes);
app.use('/api',apiRoutes);

app.listen(3000,function(){
    console.log("api is running on port"+3000);
});
