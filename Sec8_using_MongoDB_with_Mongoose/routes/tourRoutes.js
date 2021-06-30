const express = require('express');
const tourController = require('./../controllers/tourController');


// Routers
const router = express.Router();

//ch64 Param
router.param('id', tourController.checkID);

//ch65 Chaining Multiple Middleware Functions
//Create a checkBody middleware9
//Check if body contains the name and price property
//If not, send back 400 (bad request)
//Add it to the post handler stack
// router.param('body', tourController.checkBody);

//Routes
router
    .route('/')
    .get(tourController.getAllTours)
    //.post(middleware, controller) //ch65
    .post(tourController.checkBody, tourController.createTour); //ch65


router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

//Export Module
module.exports = router;