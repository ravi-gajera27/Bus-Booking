var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/busbooking', { useFindAndModify: false });
var ticketPriceModel = require('./ticketPriceModel.js');

var routeSchema = mongoose.Schema({
    route_name: String,
    from_city: String,
    to_city: String,
    stoppage_point: String,
    arrival_time: String,
    distance: Number,
    journey_date: Date,
    approx_time: Number,
    status: {
        type: Boolean,
        default: true,
    },
});
var routeModel = module.exports = mongoose.model('routes', routeSchema, "routes");

module.exports.insert_route = function (data) {
    return new Promise(function (resolve, reject) {
        routeModel.create(data, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve("success");
        });
    })
};

module.exports.get_route_by_id = function (_id) {
    return new Promise(function (resolve, reject) {
        routeModel.find({ _id: _id }, "_id route_name journey_date from_city to_city stoppage_point distance approx_time status arrival_time", function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    })
};

module.exports.get_all_record = function () {
    return new Promise(function (resolve, reject) {
        routeModel.find({}, "_id route_name from_city to_city stoppage_point distance approx_time arrival_time status journey_date",
            function (err, result) {
                if (err) {
                    reject(Error(err));
                }
                resolve(result);
            });
    })
};

module.exports.delete_route = function (condition) {
    return new Promise(function (resolve, reject) {
        routeModel.findOneAndRemove(condition, function (err, result) {
            if (err) {
                reject(Error(err));
            }
            resolve(result);
        });
    });
};

module.exports.update_route = function (condition, data) {
    return new Promise(function (resolve, reject) {
        routeModel.findOneAndUpdate(condition, data, function (err, result) {
            if (err)
                reject(Error(err));
            resolve(result);
        });
    });
};

module.exports.update_status = function (condition, data) {
    return new Promise(function (resolve, reject) {
        routeModel.findOneAndUpdate(condition, data, { upsert: true }, function (err, result) {
            if (err)
                reject(Error(err));
            resolve(result);
        });
    })
};

module.exports.route_by_id = function(_id){
    return new Promise(function(resolve,reject){
        routeModel.find({'_id':_id},function(err,result){
            var ids = result.map(function(doc){return doc.route_name});
            var from = result.map(function(doc){return doc.from_city});
            var to = result.map(function(doc){return doc.to_city});
            ticketPriceModel.find({'route_name':{$in:ids},'from_city':{$in:from},'to_city':{$in:to}},"price",function(err,result){
                if(err){
                reject(Error(err));
                }
                resolve(result);
            });

        });
    })
};

module.exports.get_route = function (from_city, to_city, journey_date) {
    //console.log(from_city, to_city, journey_date)
    let aQuery = [

      {
        $lookup: {
            from: 'ticket',
            localField: 'route_name',
            foreignField: 'route_name',
            as: 'data'
        },
    },

    {
       $unwind: "$data"
    },
    {
        $match: {
            "data.from_city": { $eq: from_city.toString() },
            "data.to_city": { $eq: to_city.toString() },
            "journey_date": { $eq: new Date(journey_date)},
            "status": { $eq: true }
        }
    },
    {
        $project: {
            _id:"$_id",
            route_name:"$route_name",
            from_city:"$from_city",
            to_city:"$to_city",
            stoppage_point:"$stoppage_point",
            distance:"$distance",
            approx_time:"$approx_time",
            arrival_time:"$arrival_time",
            journey_date:"$journey_date",
            price:"$data.price"
        }
    }
    ]

    return new Promise(function (resolve, reject) {
        routeModel.aggregate(aQuery, (error, result) => {
            if (error)reject(Error(error));
            //console.log(result)
            resolve(result);
        })
    })
};
