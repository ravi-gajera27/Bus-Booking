let router = require('express').Router();
var userController = require('./userControllers/userController');
var contactusController = require('./userControllers/contactusController');
var routesController = require('./userControllers/routeController');
var ticketPriceController = require('./userControllers/ticketPriceController');
var bookingController = require('./userControllers/bookingController');

router.route('/login').post(userController.login);
router.route('/register').post(userController.register);
router.route('/changePassword').post(userController.changePassword);
router.route('/updateProfile').post(userController.updateProfile);

router.route('/contactUs').post(contactusController.contactUs);

router.route('/search_routes').post(routesController.search_routes);
router.route('/route_by_id/:_id').get(routesController.route_by_id);
//router.route('/search_routes_price').post(routesController.search_routes_price);

router.route('/get_price').post(ticketPriceController.get_price);


router.route('/add_booking').post(bookingController.add_booking);


module.exports=router;
