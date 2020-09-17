let router = require('express').Router();

var userController = require('../adminControllers/userController');
var adminController = require('../admincontrollers/adminController');
var routesController = require('../admincontrollers/routesController');
var cityController = require('../admincontrollers/cityController');
var bookingController = require('../admincontrollers/bookingController');
var ticketPriceController = require('../admincontrollers/ticketPriceController');
var stateController= require('../admincontrollers/stateController');
var settingController=require('../admincontrollers/settingController');
var pagesController=require('../admincontrollers/pagesController');
var emailformatController=require('../admincontrollers/emailformatController');

router.route('/login').post(adminController.login);
router.route('/updateProfile').post(adminController.updateProfile);
router.route('/changePassword').post(adminController.changePassword);
router.route('/get_admin_by_id').post(adminController.get_admin_by_id);


router.route('/get_all_users').get(userController.get_all_users);
router.route('/add_user').post(userController.add_user);
router.route('/update_user').post(userController.update_user);
router.route('/delete_user').post(userController.delete_user);
router.route('/get_user_by_id/:_id').get(userController.get_user_by_id);
router.route('/count_user').get(userController.count_user);

router.route('/add_city').post(cityController.add_city);
router.route('/delete_city').post(cityController.delete_city);
router.route('/update_city').post(cityController.update_city);
router.route('/get_city').get(cityController.get_city);
router.route('/get_city_by_id/:_id').get(cityController.get_city_by_id);
router.route('/get_only_city').get(cityController.get_only_city);


router.route('/add_route').post(routesController.add_route);
router.route('/delete_route').post(routesController.delete_route);
router.route('/get_route_by_id/:_id').get(routesController.get_route_by_id);
router.route('/get_all_routes').get(routesController.get_all_routes);
router.route('/update_route').post(routesController.update_route);
router.route('/update_status').post(routesController.update_status);
router.route('/count_routes').get(routesController.count_routes);


router.route('/add_booking').post(bookingController.add_booking);
router.route('/get_all_booking').get(bookingController.get_all_booking);
router.route('/count_booking').get(bookingController.count_booking);

router.route('/add_ticketPrice').post(ticketPriceController.add_ticketPrice);
router.route('/get_ticketPrice').get(ticketPriceController.get_ticketPrice);
router.route('/update_ticketPrice').post(ticketPriceController.update_ticketPrice);
router.route('/get_ticket_by_id/:_id').get(ticketPriceController.get_ticket_by_id);
router.route('/get_price').post(ticketPriceController.get_price);

router.route('/get_all_state').get(stateController.get_all_state);

router.route('/emailFormat').get(emailformatController.emailFormat);
router.route('/edit_emailFormat').post(emailformatController.edit_emailFormat);
router.route('/get_email_by_id/:_id').get(emailformatController.get_email_by_id);

router.route('/setting').get(settingController.setting);
router.route('/edit_setting').post(settingController.edit_setting);
router.route('/get_field_by_id/:_id').get(settingController.get_field_by_id);

router.route('/pages').get(pagesController.pages);
router.route('/edit_pages').post(pagesController.edit_pages);
router.route('/get_page_by_id/:_id').get(pagesController.get_page_by_id);


module.exports=router;
