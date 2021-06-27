const fs = require('fs');

//Read tours data before the route handler
tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

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
    // console.log(tour);

    //if no id or no tour, return immediately
    if (id > tours.length || !tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

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

    // adding id to the new object which is saved to our ficitonal data later
    const newId = tours[tours.length - 1].id + 1;

    // 2 ways to merge 2 objects
    //1) Object.assign() creates a new obj by merging 2 existing objs, (here it assigns id into the req body which stores the new data)
    // const newTour = Object.assign({
    //     id: newId
    // }, req.body);

    //2) use spread operator
    const newTour = {
        id: newId,
        ...req.body
    };

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
};

exports.updateTour = (req, res) => {
    if (+req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...'
        }
    })
};

exports.deleteTour = (req, res) => {
    if (+req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    //204 = no content
    res.status(204).json({
        status: 'success',
        data: null
    })
};