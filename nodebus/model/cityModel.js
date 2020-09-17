var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var citySchema = mongoose.Schema({
    city: String,
    state: String,
    
 });
 var cityModel = module.exports = mongoose.model('city', citySchema,"city");

module.exports.insert_city = function (data) {
    return new Promise(function (resolve, reject) {
        cityModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        cityModel.find({},"_id state city", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.get_city = function () {
    return new Promise(function (resolve, reject) {
        cityModel.find({},"city", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.get_city_by_id = function(_id){
    return new Promise(function(resolve,reject){
        cityModel.find({_id:_id},"_id state city", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.delete_city = function(condition){
    return new Promise(function(resolve,reject){
        cityModel.findOneAndRemove(condition,function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    });
};

module.exports.update_city = function (condition, data) {
    return new Promise(function (resolve, reject) {
        cityModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};
