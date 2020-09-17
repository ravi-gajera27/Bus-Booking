var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username : String,
    email: String,
    mobileNo: Number,
    password: String
 });
 var userModel = module.exports = mongoose.model('user', userSchema,"user");

 module.exports.update_user = function (condition, data) {
    return new Promise(function (resolve, reject) {
        userModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        userModel.find({},"_id firstname lastname username email mobileNo", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.get_user_by_id = function(user_id){
    return new Promise(function(resolve,reject){
        userModel.find({_id:user_id},"_id firstname lastname username email mobileNo", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.insert_user = function (data) {
    return new Promise(function (resolve, reject) {
        userModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};

module.exports.delete_user = function(condition){
    return new Promise(function(resolve,reject){
        userModel.findOneAndRemove(condition,function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    });
};
