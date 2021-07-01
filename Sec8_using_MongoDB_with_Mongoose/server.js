const dotenv = require('dotenv');
const mongoose = require('mongoose');

//ch67 Environment Variables
dotenv.config({
    path: './config.env'
});

const app = require('./app');

// console.log(process.env.NODE_ENV);
// console.log(app.get('env')); //get the environment from Express
// console.log(process.env); //all the environment variables from nodeJS

//ch82 CONNECT DB with the express app
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con.connections);
    console.log('DB connection successful!');
});

//ch84 creating a simple tour model
const tourSchema = new mongoose.Schema({ //defining a schema of a model
    name: {
        type: String,
        required: [true, 'A tour must have a name'], //validator
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

//STARTING THE SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}... `);
});