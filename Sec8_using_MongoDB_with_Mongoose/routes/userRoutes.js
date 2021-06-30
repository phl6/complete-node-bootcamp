const express = require('express');
const userController = require('./../controllers/userController');

// Routers
const router = express.Router();

//Routes
router
    .route('/')
    .get(userController.getAllUsrs)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

//Exports
module.exports = router;