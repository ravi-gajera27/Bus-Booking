const http = require('http');
var routeModel = require('../model/routesModel.js');

module.exports.add_route = function(req,res){
    if(!req.body.route_name || !req.body.from_city || !req.body.to_city || !req.body.stoppage_point ||!req.body.distance || !req.body.approx_time ||!req.body.arrival_time||!req.body.journey_date){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
             data = {
                route_name : req.body.route_name,
                from_city : req.body.from_city,
                to_city : req.body.to_city,
                stoppage_point :req.body.stoppage_point,
                arrival_time:req.body.arrival_time,
                distance:req.body.distance,
                approx_time : req.body.approx_time,
                 journey_date:req.body.journey_date
            };

            routeModel.insert_route(data).then(function(add_route){
                if(add_route === 'success'){
                    res.json({
                        status: "success",
                        message: "route inserted"
                    });
                    return;
                }
            });
        }
};

module.exports.delete_route = function(req,res){
    if(!req.body._id){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
    }

    let route_id = req.body._id;

    condition ={
        _id : route_id,
    }

    routeModel.delete_route(condition).then(function(delete_result){
        if(delete_result === 0){
            res.json({
                status:"error",
                message : "route not deleted"
            });
            return;
        }else{
            res.json({
                status:"success",
                message: "route deleted",
                data : {
                    id : delete_result._id,
                    route_name : delete_result.route_name,
                    from_city : delete_result.from_city,
                    to_city : delete_result.to_city,
                    stoppage_point : delete_result.stoppage_point,
                     distance:delete_result.distance,
                    approx_time : delete_result.approx_time,
                    journey_date : delete_result.journey_date
                }
            })
        }
    })

};

module.exports.get_route_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "invalid parameter"
        });
        return;
    }else{

           let _id = req.params._id;

        routeModel.get_route_by_id(_id).then(function(get_result){
        if(get_result === 0){
            res.json({
                status : "error",
                message : "record not found"
            });
            return;
        }else{
            res.json({
                status : "success",
                message : "record found",
                data : get_result
            });
            return;
        }
    },function(err){
        res.json({
            status : "error",
            message : "something went wrong!"
        });
        return;
    }
    );
    }
}

module.exports.get_all_routes = function(req,res){
    routeModel.get_all_record().then(function(get_result){
        if(get_result === 0){
            res.json({
                status : "error",
                message : "record not found"
            });
            return;
        }else{
            res.json({
                status : "success",
                message : "record found",
                data : get_result
            });
            return;
        }
    },function(err){
        res.json({
            status : "error",
            message : "something went wrong!"
        });
        return;
    }
    );
};

module.exports.update_route = function(req,res){
    if(!req.body.route_name || !req.body.from_city || !req.body.to_city || !req.body.stoppage_point ||!req.body.distance || !req.body.approx_time ||!req.body.arrival_time||!req.body.journey_date){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{

        let _id = req.body._id;
        routeModel.find({_id: _id},function(err, res){
            if(err){
                res.json({
                    status: "error",
                    message : " not found"
                });
                return;
            }
        });

        condition = {
            _id : _id,
        }
        data = {
                route_name : req.body.route_name,
                from_city : req.body.from_city,
                to_city : req.body.to_city,
                stoppage_point : req.body.stoppage_point,
                arrival_time:req.body.arrival_time,
                distance:req.body.distance,
                approx_time : req.body.approx_time,
                journey_date:req.body.journey_date
            };
        routeModel.update_route(condition,data).then(function(update_result){
            if(update_result === 0){
                res.json({
                    status:"error",
                    message:"some error occured!"
                });
                return;
            }else{
                res.json({
                    status:'success',
                    message:'update successfully',
                    data : {
                        id : update_result._id,
                        route_name : update_result.route_name,
                        from_city : update_result.from_city,
                        to_city : update_result.to_city,
                        stoppage_point : update_result.stoppage_point,
                        arrival_time:update_result.arrival_time,
                        distance:update_result.distance,
                        approx_time : update_result.approx_time,
                        journey_date:update_result.journey_date
                    },
                });
                return;
            }
        });


    }
};

module.exports.update_status = function(req,res){
    if (!req.body._id || !req.body.table) {

            res.json({
                status: "error",
                message: "Invalid Parameters"
            });
            return;
        }

        let id = req.body._id;
        let status = req.body.status;
        let model_name = req.body.table;
        let update_data = {status: status};
        let condition = {
            _id: id
        }
        if (model_name === "routes") {
            routeModel.update_status(condition, update_data).then(function (update_result) {
                if (update_result.length === 0) {
                    res.json({
                        status: "error",
                        message: "Record not found",
                    });
                    return;
                } else {
                    // console.log(update_result);
                    res.json({
                        status: "success",
                        message: "Status updated successfully",
                        data: {update_result}
                    });
                    return;
                }
            }, function (err) {
                res.json({
                    status: "error",
                    message: "Error Occurred. Try Again!"
                });
                return;
            });
        }
}

module.exports.count_routes = function(req,res){
    routeModel.find().exec(function (err, results) {
    var count = results.length;
        res.json({
            data:count,
        })

});
}
