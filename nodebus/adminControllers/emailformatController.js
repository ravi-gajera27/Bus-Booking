const http = require('http');
var emailformatgModel = require('../model/emailformatModel.js');

module.exports.emailFormat = function(req,res){
    emailformatgModel.get_all_record().then(function(get_result){
        if(get_result === 0){
            res.json({
                status : "error",
                message : "record not found"
            });
            return;
        }else{
            res.json({
                status : "success",
                message : "record found",
                data : get_result
            });
            return;
        }
    },function(err){
        res.json({
            status : "error",
            message : "something went wrong!"
        });
        return;
    }
    );
};

module.exports.edit_emailFormat = function(req,res){
    if(!req.body.subject || !req.body.title || !req.body.email){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let _id = req.body._id;
        emailformatgModel.find({_id: _id},function(err, res){
            if(err){
                res.json({
                    status: "error",
                    message : "city not found"
                });
                return;
            }
        });
        
        condition = {
            _id : _id,
        }
        data = {
            subject : req.body.subject,
            title : req.body.title,
            email:req.body.email,
        };
        emailformatgModel.update_email(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status:"error",
                    message:"some error occured!"
                });
                return;
            }else{
                res.json({
                    status:'success',
                    message:'email update successfully',
                    data : {
                        id : update_result._id,
                        subject : update_result.subject,
                        title : update_result.title,
                        email : update_result.email
                    },
                });
                return;
            }
        });


    }
};

module.exports.get_email_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let _id = req.params._id;
        
        emailformatgModel.get_email_by_id(_id).then(function(get_result){
        if(get_result === 0){
            res.json({
                status : "error",
                message : "record not found"
            });
            return;
        }else{
            res.json({
                status : "success",
                message : "record found",
                data : get_result
            });
            return;
        }
    },function(err){
        res.json({
            status : "error",
            message : "something went wrong!"
        });
        return;
    }
    );
    }
}



