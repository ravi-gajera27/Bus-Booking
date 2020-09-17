var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var ticketPriceSchema = mongoose.Schema({
    route_name: String,
    from_city: String,
    to_city : String,
    price: Number,
    
 });
 var ticketPriceModel = module.exports = mongoose.model('ticket', ticketPriceSchema,"ticket");

module.exports.insert_ticketPrice = function (data) {
    return new Promise(function (resolve, reject) {
        ticketPriceModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        ticketPriceModel.find({},"_id route_name from_city to_city price", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.update_ticket = function (condition, data) {
    return new Promise(function (resolve, reject) {
        ticketPriceModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
	        resolve(result);	       
        });
    });
};

module.exports.get_ticket_by_id = function(_id){
    return new Promise(function(resolve,reject){
        ticketPriceModel.find({_id:_id},"_id route_name to_city from_city price", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.get_price = function(from_city,to_city,route_name){
    return new Promise(function(resolve,reject){
        ticketPriceModel.findOne({'from_city':from_city,'to_city':to_city,'route_name':route_name},"price", function(err,result){
            if(err){
                reject(Error(err));
            }
            resolve(result);
        });
    })
};