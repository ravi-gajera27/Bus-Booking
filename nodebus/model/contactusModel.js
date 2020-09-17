var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var contactusSchema = mongoose.Schema({
    name: String,
    subject: String,
    message : String,
    email: String
 });
 var contactusModel = module.exports = mongoose.model('contactus', contactusSchema,"contactus");

module.exports.insert_message = function (data) {
    return new Promise(function (resolve, reject) {
       contactusModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};