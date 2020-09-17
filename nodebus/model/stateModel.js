var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });

var stateSchema = mongoose.Schema({
    
    state: String,
    
 });
 var stateModel = module.exports = mongoose.model('state', stateSchema,"state");

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        stateModel.find({},"_id state", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};