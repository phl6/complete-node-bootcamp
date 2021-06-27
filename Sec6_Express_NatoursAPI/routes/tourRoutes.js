const express = require('express');
const tourController = require('./../controllers/tourController');


// Routers
const router = express.Router();

//Routes
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

//Export Module
module.exports = router;