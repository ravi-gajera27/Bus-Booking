const http = require('http');
var settingModel = require('../model/settingModel.js');

module.exports.setting = function(req,res){
    settingModel.get_all_record().then(function(get_result){
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

module.exports.edit_setting = function(req,res){
    if(!req.body.value || !req.body.title){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let _id = req.body._id;
        settingModel.find({_id: _id},function(err, res){
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
            title : req.body.title,
            value:req.body.value,
        };
        settingModel.update_field(condition,data).then(function(update_result){
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
                        title : update_result.title,
                        value : update_result.value
                    },
                });
                return;
            }
        });


    }
};

module.exports.get_field_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let _id = req.params._id;
        
        settingModel.get_field_by_id(_id).then(function(get_result){
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