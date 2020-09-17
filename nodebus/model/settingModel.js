var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var settingSchema = mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    value:{
       type:String,
       required:true
    },
 });
 var settingModel = module.exports = mongoose.model('setting', settingSchema,"setting");

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        settingModel.find({},"_id title value", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.update_field = function (condition, data) {
    return new Promise(function (resolve, reject) {
        settingModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_field_by_id = function(_id){
    return new Promise(function(resolve,reject){
        settingModel.find({_id:_id},"_id title value", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};
