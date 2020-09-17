const http = require('http');
var ticketPriceModel = require('../model/ticketPriceModel.js');

module.exports.add_ticketPrice = function(req,res){
    if(!req.body.route_name || !req.body.from_city || !req.body.to_city || !req.body.price){
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
                price: req.body.price,
                
            };
     
            ticketPriceModel.insert_ticketPrice(data).then(function(add_price){
                if(add_price === 'success'){
                    res.json({
                        status: "success",
                        message: "price inserted"
                    });
                    return;
                }
            });
        }
};

module.exports.get_ticketPrice = function(req,res){
    ticketPriceModel.get_all_record().then(function(get_result){
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

module.exports.update_ticketPrice = function(req,res){
    if(!req.body.route_name || !req.body.from_city || !req.body.to_city || !req.body.price){
        res.json({
            status: "error",
            message : "invalid parameter"
        });
        return;
    }else{
        
        let _id = req.body._id;
        ticketPriceModel.find({_id: _id},function(err, res){
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
                price: req.body.price,
                
            };
        ticketPriceModel.update_ticket(condition,data).then(function(update_result){
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
                        price : update_result.price,
                    },
                });
                return;
            }
        });


    }
};

module.exports.get_ticket_by_id = function(req,res){
    if(!req.params._id){
        res.json({
            status : "error",
            message : "record not found"
        });
        return;
    }else{
        
           let _id = req.params._id;
        
        ticketPriceModel.get_ticket_by_id(_id).then(function(get_result){
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

module.exports.get_price = function(req,res){
    if(!req.body.from_city || !req.body.to_city || !req.body.route_name){
        res.json({
            status : "error",
            message : "invalid parameters"
        });
        return;
    }else{
        
           
              let from_city = req.body.from_city;
              let to_city = req.body.to_city;
              let route_name = req.body.route_name;
           
        
        ticketPriceModel.get_price(from_city,to_city,route_name).then(function(get_result){
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
