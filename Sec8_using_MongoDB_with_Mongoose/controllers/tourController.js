const fs = require('fs');

//Read tours data before the route handler
tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//ch64 Param Middleware
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    if (+req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    next();
};

// ch65 chaining multiple middleware functions
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};

//Router Handlers
//Ch57 Refactoring Our Routes
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({ //Jsend JSON Formatting Standard
        status: 'success',
        requestedAt: req.requestTime, //Ch58 Creating Our Own Middleware
        results: tours.length, //better visualisation for requesters
        data: { //Enveloping the data
            tours
        }
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);

    const id = +req.params.id; //turn obj to number
    const tour = tours.find(el => el.id === id);

    //id exists
    res.status(200).json({ //Jsend JSON Formatting Standard
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // console.log(req.body); 
    const newId = tours[tours.length - 1].id + 1; // adding id to the new object
    const newTour = { //merging 2 objs
        id: newId,
        ...req.body
    };

    tours.push(newTour); //add newTour to ficitional db - tours

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({ //201 = ok
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...'
        }
    })
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
};