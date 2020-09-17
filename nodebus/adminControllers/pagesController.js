const http = require('http');
var pagesModel = require('../model/pagesModel.js');

module.exports.pages = function(req,res){
    pagesModel.get_all_record().then(function(get_result){
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

module.exports.edit_pages = function(req,res){
    if(!req.body.title || !req.body.meta_title|| !req.body.keyword|| !req.body.meta_description|| !req.body.short_description|| !req.body.description){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let _id = req.body._id;
        pagesModel.find({_id: _id},function(err, res){
            if(err){
                res.json({
                    status: "error",
                    message : " not found"
                });
                return;
            }
        });
        
        condition = {
            _id : _id,
        }
        data = {
           
            title : req.body.title,
            meta_title : req.body.meta_title,
            keyword : req.body.keyword,
            meta_description : req.body.meta_description,
            short_description : req.body.short_description,
            description:req.body.description
        };
        pagesModel.update_field(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status:"error",
                    message:"some error occured!"
                });
                return;
            }else{
                res.json({
                    status:'success',
                    message:'update successfully',
                    data : {
                        id : update_result._id,
                        title : update_result.title,
                        meta_title : update_result.meta_title,
                        keyword : update_result.keyword,
                        meta_description : update_result.meta_description,
                        short_description : update_result.short_description,
                        description:update_result.description
                    },
                });
                return;
            }
        });


    }
};

module.exports.get_page_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let _id = req.params._id;
        
        pagesModel.get_field_by_id(_id).then(function(get_result){
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