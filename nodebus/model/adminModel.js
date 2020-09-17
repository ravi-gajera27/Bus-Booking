var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username : String,
    email: String,
    mobileNo: Number,
    password: String
 });
 var adminModel = module.exports = mongoose.model('admin', adminSchema,"admin");

module.exports.update_admin = function (condition, data) {
    return new Promise(function (resolve, reject) {
        adminModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_admin_by_id = function(user_id){
    return new Promise(function(resolve,reject){
        adminModel.find({_id:user_id},"_id firstname lastname username email mobileNo", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};