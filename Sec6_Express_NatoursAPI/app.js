const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); //ch53, express.json() is a middleware that handles incoming request data

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

//---------------
//Top-Level Code
//---------------

//Read tours data before the route handler
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//---------------
// Routing      
//---------------
//Ch52 Handling GET Requests
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({ //Jsend JSON Formatting Standard
        status: 'success',
        results: tours.length, //better visualisation for requesters
        data: { //Enveloping the data
            tours
        }
    });
});

//Ch53 Handling POST Requests
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body); 

    // adding id to the new object which is saved to our ficitonal data later
    const newId = tours[tours.length - 1].id + 1;
    //Object.assign() creates a new obj by merging 2 existing objs, (here it assigns id into the req body which stores the new data)
    const newTour = Object.assign({
        id: newId
    }, req.body);
    //add newTour to ficitional db - tours
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        //201 = ok, it is sent to complete request/response cycle
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    })


    // res.send('Done'); //always need to send back response to complete req/res cycle
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}... `);
});