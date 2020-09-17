var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var bookingSchema = mongoose.Schema({
    username:String,
    from_city: String,
    to_city : String,
    booking_date: { type: Date, default: Date.now },
    journey_date:Date,
    journey_time:String,
    total_user:Number,
    price:Number,
    mobileNo: Number,
    email: String,

 });
 var bookingModel = module.exports = mongoose.model('booking', bookingSchema,"booking");

module.exports.insert_booking = function (data) {
    return new Promise(function (resolve, reject) {
        bookingModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        bookingModel.find({},"_id username from_city to_city booking_date journey_date journey_time total_user price mobileNo email", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};
