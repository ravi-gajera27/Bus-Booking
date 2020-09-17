const http = require('http');
var cityModel = require('../model/cityModel.js');

module.exports.add_city = function(req,res){
    if(!req.body.city ||!req.body.state){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
             data = {
                city : req.body.city,
                state : req.body.state    
            };
        
            let city=req.body.city;
        
            cityModel.find({city:city},function(err,city){
                if(err){
                    res.json({
                        status:"error",
                        message:"some error occured!"
                    });
                    return;
                }
                if(city.length > 0){
                    res.json({
                        status:"error",
                        message:"city already exists"
                    });
                    return;
                }else{
                    cityModel.insert_city(data).then(function(add_city){
                    if(add_city === 'success'){
                        res.json({
                            status: "success",
                            message: "city inserted"
                        });
                        return;
                        }
                    });
                }
            }); 
            
        }
};

module.exports.get_city = function(req,res){
    cityModel.get_all_record().then(function(get_result){
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

module.exports.get_only_city = function(req,res){
    cityModel.get_city().then(function(get_result){
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

module.exports.get_city_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let _id = req.params._id;
        
        cityModel.get_city_by_id(_id).then(function(get_result){
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

module.exports.delete_city = function(req,res){
    if(!req.body._id){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
    }

    let _id = req.body._id;

    condition ={
        _id : _id,
    }

    cityModel.delete_city(condition).then(function(delete_result){
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
                    city : delete_result.city,
                    state : delete_result.state,
                }
            })
        }
    })

};

module.exports.update_city = function(req,res){
    if(!req.body.city || !req.body.state){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let _id = req.body._id;
        cityModel.find({_id: _id},function(err, res){
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
            city : req.body.city,
            state : req.body.state,
        };
        cityModel.update_city(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status:"error",
                    message:"some error occured!"
                });
                return;
            }else{
                res.json({
                    status:'success',
                    message:'city update successfully',
                    data : {
                        id : update_result._id,
                        city : update_result.city,
                        state : update_result.state,
                    },
                });
                return;
            }
        });


    }
};



