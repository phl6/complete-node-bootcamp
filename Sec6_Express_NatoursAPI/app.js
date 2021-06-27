// const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

//improt routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json()); //ch53, express.json() is a middleware that handles incoming request data

//---------------
//1) Middlewares
//---------------

//Ch59 Using Third Party Middleware
app.use(morgan('dev'));

//Ch58 Creating Our Own Middleware
//every request will go through this middleware function (order matters)
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//Middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//----------------
//4) Start Server
//----------------
// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port ${port}... `);
// });

//Export the app to server.js
module.exports = app;

//-----------------------------------
//2) Route Handlers & Top-Level Code
//-----------------------------------
// //Read tours data before the route handler
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// //Ch57 Refactoring Our Routes
// const getAllTours = (req, res) => {
//     console.log(req.requestTime);

//     res.status(200).json({ //Jsend JSON Formatting Standard
//         status: 'success',
//         requestedAt: req.requestTime, //Ch58 Creating Our Own Middleware
//         results: tours.length, //better visualisation for requesters
//         data: { //Enveloping the data
//             tours
//         }
//     });
// };

// const getTour = (req, res) => {
//     console.log(req.params);

//     const id = +req.params.id; //turn obj to number
//     const tour = tours.find(el => el.id === id);
//     // console.log(tour);

//     //if no id or no tour, return immediately
//     if (id > tours.length || !tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         })
//     }

//     //id exists
//     res.status(200).json({ //Jsend JSON Formatting Standard
//         status: 'success',
//         data: {
//             tour
//         }
//     });
// };

// const createTour = (req, res) => {
//     // console.log(req.body); 

//     // adding id to the new object which is saved to our ficitonal data later
//     const newId = tours[tours.length - 1].id + 1;

//     // 2 ways to merge 2 objects
//     //1) Object.assign() creates a new obj by merging 2 existing objs, (here it assigns id into the req body which stores the new data)
//     // const newTour = Object.assign({
//     //     id: newId
//     // }, req.body);

//     //2) use spread operator
//     const newTour = {
//         id: newId,
//         ...req.body
//     };

//     //add newTour to ficitional db - tours
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//         //201 = ok, it is sent to complete request/response cycle
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         })
//     })
//     // res.send('Done'); //always need to send back response to complete req/res cycle
// };

// const updateTour = (req, res) => {
//     if (+req.params.id > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         })
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...'
//         }
//     })
// };

// const deleteTour = (req, res) => {
//     if (+req.params.id > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         })
//     }
//     //204 = no content
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// };

// const getAllUsrs = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

// const getUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

// const createUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

// const updateUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

// const deleteUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

//---------------
//3) Routes  
//---------------
//Refactored
// app.get('/api/v1/tours', getAllTours); //Ch52 Handling GET Requests
// app.get('/api/v1/tours/:id', getTour); //Ch54 Responding to URL Parameters
// app.post('/api/v1/tours', createTour); //Ch53 Handling POST Requests
// app.patch('/api/v1/tours/:id', updateTour); //Ch55 Handling PATCH Request
// app.delete('/api/v1/tours/:id', deleteTour); //Ch56 Handling DELETE Request

//Further Refactor
//Ch62 Creating and Mounting Multiple Routers
//New Routers
// const tourRouter = express.Router();
// const userRouter = express.Router();

//Routes
// tourRouter
//     .route('/')
//     .get(getAllTours)
//     .post(createTour);

// tourRouter
//     .route('/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour);

//Ch61 Implementing the "Users" Routes
// userRouter
//     .route('/')
//     .get(getAllUsrs)
//     .post(createUser);

// userRouter
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);

// // Middleware
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

// //----------------
// //4) Start Server
// //----------------
// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port ${port}... `);
// });










//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTRODUCTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch50 - Setting up Express and Basic Routing
//demo of using express to handle get requests
// app.get('/', (req, res) => {
//     // res.status(200).send('Hello from the server side!');
//     res.status(200).json({
//         message: 'Hello from the server side!',
//         app: 'Natours'
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).send('You can post to this endpoint...');
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Real Parts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////