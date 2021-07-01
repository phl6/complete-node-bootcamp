const express = require('express');
const morgan = require('morgan');
const app = express();

//Middlewares
console.log(process.env.NODE_ENV); //ch67 Environment Variables, once defined in upper layer, e.g. server.js, process.env can be retrieved here too
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); //Ch59 Using Third Party Middleware, ***Morgan is a logger (middleware)***
}

app.use(express.json()); //ch53, express.json() is a middleware that handles incoming request data
app.use(express.static(`${__dirname}/public`)); //ch66 serving static files

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //show date middleware (self-defined)
    next();
});

//Middleware
const tourRouter = require('./routes/tourRoutes'); //improt routers
const userRouter = require('./routes/userRoutes');
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app; //Export the app to server.js