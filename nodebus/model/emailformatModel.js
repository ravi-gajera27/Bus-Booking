var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var emailformatSchema = mongoose.Schema({
    subject:{
       type:String,
       required:true
    },
    title:{
       type:String,
       required:true
    },
    email:{
       type:String,
       required:true
    },
    
 });
 var emailformatgModel = module.exports = mongoose.model('emailformat', emailformatSchema,"emailformat");


module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        emailformatgModel.find({},"_id subject title", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.update_email = function (condition, data) {
    return new Promise(function (resolve, reject) {
        emailformatgModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_email_by_id = function(_id){
    return new Promise(function(resolve,reject){
        emailformatgModel.find({_id:_id},"_id title subject email", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};
