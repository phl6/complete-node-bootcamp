const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// console.log(app.get('env')); //get the environment
// console.log(process.env); //all the environment variables from nodeJS

//ch67 Environment Variables
dotenv.config({
    path: './config.env'
});

//ch82 CONNECT DB with the express app
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con.connections);
    console.log('DB connection successful!');
})

//STARTING THE SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}... `);
});