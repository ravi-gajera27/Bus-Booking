const http = require('http');
const nodemailer = require("nodemailer");
var ucfirst = require('ucfirst');
var bookingModel = require('../model/bookingModel.js');
var emailformatModel = require('../model/emailformatModel');

module.exports.add_booking = function(req,res){
    if(!req.body.username || !req.body.from_city || !req.body.to_city  ||!req.body.journey_date || !req.body.total_user ||!req.body.price ||!req.body.mobileNo ||!req.body.email ||!req.body.journey_time){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{


             data = {
                username : req.body.username,
                from_city : req.body.from_city,
                to_city : req.body.to_city,
                journey_date:req.body.journey_date,
                 journey_time:req.body.journey_time,
                total_user : req.body.total_user,
                 price : req.body.price,
                 mobileNo : req.body.mobileNo,
                 email : req.body.email
            };

            bookingModel.insert_booking(data).then(function(add_booking){
                if(add_booking === 'success'){

                  emailformatModel.find({ email_id: 1},function(error,emailFormat){
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'arazugajera98@gmail.com',
                            pass: 'arazu@3298'
                        }
                    });
                    var mail_body = emailFormat[0].email;

                    mail_body = mail_body.replace(/%username%/g, ucfirst(req.body.username));
                    mail_body = mail_body.replace(/%from_city%/g, ucfirst(req.body.from_city));
                    mail_body = mail_body.replace(/%to_city%/g, ucfirst(req.body.to_city));
                    mail_body = mail_body.replace(/%journey_date%/g, new Date(req.body.journey_date));
                    mail_body = mail_body.replace(/%journey_time%/g, req.body.journey_time);
                    mail_body = mail_body.replace(/%total_user%/g, req.body.total_user);
                    mail_body = mail_body.replace(/%price%/g, req.body.price);

                    var mailOptions = {

                        from: 'arazugajera98@gmail.com',
                        to: req.body.email,
                        subject: emailFormat[0].subject,
                        html : mail_body

                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                  });


                    res.json({
                        status: "success",
                        message: "ticket booked..!"
                    });
                    return;
                }
            });
        }
};
