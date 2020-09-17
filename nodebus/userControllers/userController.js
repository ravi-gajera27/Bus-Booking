const http = require('http');
var userModel = require('../model/userModel.js');

module.exports.login = function(req,res){
    if(!req.body.email || !req.body.password){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{

        userModel.findOne({email:req.body.email},function(err,user){
            if(user ===  null){
                res.json({
                    status:'error',
                    message:'invalid email'
                });
                return;
            }else if(user.email == req.body.email && user.password == req.body.password){
                res.json({
                    status : "success",
                    message : "login successfully"
                });
                return;
            } else{
                res.json({
                    status : "error",
                    message : "invalid email or password"
                });
                return;
            }
        });
    }
};

module.exports.register = function(req,res){
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.mobileNo || !req.body.password || !req.body.confirmpassword){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{
        let email = req.body.email;
        if(req.body.password != req.body.confirmpassword){
            res.json({
                status: "error",
                message: "password and confrimpassword must be same"
            });
            return;
        }else{
            data = {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                username : req.body.username,
                email : req.body.email,
                mobileNo:req.body.mobileNo,
                password : req.body.password
            };
            var myobj = {

            }
            userModel.find({email:email},function(err,user){
                if(err){
                    res.json({
                        status:"error",
                        message:"some error occured!"
                    });
                    return;
                }
                if(user.length > 0){
                    res.json({
                        status:"error",
                        message:"email is already exists"
                    });
                    return;
                }else{
                    userModel.insert_user(data).then(function(add_user){
                        if(add_user === 'success'){
                        res.json({
                            status: "success",
                            message: "registered successfully..!"
                        });
                        return;
                    }
                });
                }
            });
        }
    }
}

module.exports.changePassword = function(req,res){
    if(!req.body.email || !req.body.oldpassword || !req.body.newpassword || !req.body.confirmpassword){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{
        if(req.body.newpassword != req.body.confirmpassword){
            res.json({
                status:'error',
                message:'new pasword and confirm-password must be same'
            });
            return;
        }else{
            let email = req.body.email;
            userModel.find({email:email},function(err,res){
                if(req.body.oldpassword , res[0].password){
                }else{
                    res.json({
                        status:'error',
                        message:'invalid oldpassword'
                    });
                    return;
                }
            });

            condition = {
                email : email,
            }
            user_data ={
                password : req.body.newpassword
            }
            userModel.update_user(condition,user_data).then(function(update_result){
                if(update_result === 0){
                    res.json({
                        status:'error',
                        message:'something went wrong'
                    });
                    return;
                }else{
                    res.json({
                        status:'success',
                        message:'password change successfully',
                        data : {
                            id : update_result._id,
                            firstname : update_result.firstname,
                            lastname : update_result.lastname,
                            username : update_result.username,
                            email : update_result.email,
                            mobileNo : update_result.mobileNo
                        },
                    });
                    return;
                }
            },function (err) {
                res.json({
                    status: "error",
                    message: "Error Occurred. Try Again!"
                });
                return;
            });
        }
    }
};

module.exports.updateProfile = function(req,res){
    if(!req.body._id || !req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email ||!req.body.mobileNo){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{
        let _id = req.body._id;
        userModel.find({_id:_id},function(err,res){
            if(err){
                res.json({
                    status:"error",
                    message:"user not found"
                });
                return;
            }
        });
        condition ={
            _id : _id,
        }
        data = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            email : req.body.email,
            mobileNo : req.body.mobileNo
        }

        userModel.update_user(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status : "error",
                    message : "something went wrong!"
                });
                return;
            }else{
                res.json({
                    status : "success",
                    message : "profile update successfully",
                    data : {
                        id : update_result._id,
                        firstname : update_result.firstname,
                        lastname : update_result.lastname,
                        username : update_result.username,
                        email : update_result.email,
                        mobileNo : update_result.mobileNo
                    }
                });
                return;
            }
        });
    }
};
