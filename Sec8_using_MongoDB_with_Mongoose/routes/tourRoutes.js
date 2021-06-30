const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router(); // use express' router

router.param('id', tourController.checkID); //ch64 Param

//Routes
//without param
router
    .route('/')
    .get(tourController.getAllTours)
    //.post(middleware, controller) //ch65
    .post(tourController.checkBody, tourController.createTour); //ch65

//with param
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;