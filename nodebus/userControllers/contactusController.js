const http = require('http');
var contactusModel = require('../model/contactusModel.js');

module.exports.contactUs = function(req,res){
    if(!req.body.name || !req.body.subject || !req.body.email || !req.body.message){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{
            data = {
                name : req.body.name,
                subject : req.body.subject,
                email : req.body.email,
                message:req.body.message,
            };
        
        contactusModel.insert_message(data).then(function(add_contact){
                        if(add_contact === 'success'){
                        res.json({
                            status: "success",
                            message: "your message sent successfully..!"
                        });
                        return;
                    }
                });
    }
}
