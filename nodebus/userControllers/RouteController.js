const http = require('http');
var routeModel = require('../model/routesModel.js');

module.exports.search_routes = function(req,res){
    if(!req.body.from_city || !req.body.to_city){
        res.json({
            status : "error",
            message : "invalid parameters"
        });
        return;
    }else{
            let from_city = req.body.from_city;
            let to_city = req.body.to_city;
            let journey_date = req.body.journey_date

        routeModel.get_route(from_city,to_city,journey_date).then(function(get_result){
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

module.exports.route_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "invalid parameters"
        });
        return;
    }else{
          let _id = req.params._id;
          // let route_name = req.params.route_name;
          // let from_city = req.params.from_city;
          // let to_city = req.params.to_city;

        routeModel.route_by_id(_id).then(function(get_result){
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
