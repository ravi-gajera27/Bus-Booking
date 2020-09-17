var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var pagesSchema = mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    meta_title:{
       type:String,
       required:true
    },
    keyword:{
       type:String,
       required:true
    },
    meta_description:{
       type:String,
       required:true
    },
    short_description:{
       type:String,
       required:true
    },
    description:{
       type:String,
       required:true
    },
 });
 var pagesModel = module.exports = mongoose.model('pages', pagesSchema,"pages");

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        pagesModel.find({},"_id title ", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.update_field = function (condition, data) {
    return new Promise(function (resolve, reject) {
        pagesModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_field_by_id = function(_id){
    return new Promise(function(resolve,reject){
        pagesModel.find({_id:_id},"_id title meta_title keyword meta_description short_description description", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};
