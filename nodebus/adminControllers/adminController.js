const http = require('http');
var adminModel = require('../model/adminModel.js');

module.exports.login = function(req,res){
    if(!req.body.username || !req.body.password){
        res.json({
            status:'error',
            message:'invalid parameter'
        });
        return;
    }else{
        
        adminModel.findOne({username:req.body.username},function(err,admin){
            if(admin ===  null){
                res.json({
                    status:'error',
                    message:'user not found'
                });
                return;
                //console.log("user not found");
            }else if(admin.username == req.body.username && admin.password == req.body.password){
                //console.log("login successfully");
                res.json({
                    status : "success",
                    message : "login successfully"
                });
                return;
            } else{
                //console.log("invalid");
                console.log(admin.password)
                res.json({
                    status : "error",
                    message : "invalid username or password"
                });
                return;
            }    
        });    
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
        adminModel.find({_id:_id},function(err,res){
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

        adminModel.update_admin(condition,data).then(function(update_result){
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

module.exports.changePassword = function(req,res){
    if(!req.body.username || !req.body.oldpassword || !req.body.newpassword || !req.body.confirmpassword){
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
            let username = req.body.username;
            adminModel.find({username:username},function(err, res){
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
                username : username,
            }
            user_data ={
                password : req.body.newpassword
            }
            adminModel.update_admin(condition,user_data).then(function(update_result){
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

module.exports.get_admin_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let user_id = req.params._id;
        
        adminModel.get_admin_by_id(user_id).then(function(get_result){
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