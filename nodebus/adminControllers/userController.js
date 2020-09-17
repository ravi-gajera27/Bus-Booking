const http = require('http');
var userModel = require('../model/userModel.js');

module.exports.get_all_users = function(req,res){
    userModel.get_all_record().then(function(get_result){
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

module.exports.get_user_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let user_id = req.params._id;
        
        userModel.get_user_by_id(user_id).then(function(get_result){
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

module.exports.add_user = function(req,res){
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email ||!req.body.mobileNo || !req.body.password || !req.body.confirmpassword){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        let username = req.body.username;
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
            userModel.find({username:username},function(err,user){
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
                        message:"username or email is already exists"
                    });
                    return;
                }
            }); 
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
                        message:"username or email is already exists"
                    });
                    return;
                }
            }); 
            userModel.insert_user(data).then(function(add_user){
                if(add_user === 'success'){
                    res.json({
                        status: "success",
                        message: "data inserted"
                    });
                    return;
                }
            });
        }
    }
};

module.exports.update_user = function(req,res){
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email ||!req.body.mobileNo){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let user_id = req.body._id;
        userModel.find({_id: user_id},function(err, res){
            if(err){
                res.json({
                    status: "error",
                    message : "user not found"
                });
                return;
            }
        });
        
        condition = {
            _id : user_id,
        }
        data = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            email : req.body.email,
            mobileNo:req.body.mobileNo
        };
        userModel.update_user(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status:"error",
                    message:"some error occured!"
                });
                return;
            }else{
                res.json({
                    status:'success',
                    message:'user update successfully',
                    data : {
                        id : update_result._id,
                        firstname : update_result.firstname,
                        lastname : update_result.lastname,
                        username : update_result.username,
                        email : update_result.email,
                         mobileNo:update_result.mobileNo
                    },
                });
                return;
            }
        });


    }
};

module.exports.count_user = function(req,res){
    userModel.find().exec(function (err, results) {
    var count = results.length;
        res.json({
            data:count,
        })

});
}

module.exports.delete_user = function(req,res){
    if(!req.body.user_id){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
    }

    let user_id = req.body.user_id;

    condition ={
        _id : user_id,
    }

    userModel.delete_user(condition).then(function(delete_result){
        if(delete_result === 0){
            res.json({
                status:"error",
                message : "user not deleted"  
            });
            return;
        }else{
            res.json({
                status:"success",
                message: "user deleted",
                data : {
                    id : delete_result._id,
                    firstname : delete_result.firstname,
                    lastname : delete_result.lastname,
                    username : delete_result.username,
                    email : delete_result.email,
                    mobileNo:delete_result.mobileNo
                }
            })
        }
    })

};

