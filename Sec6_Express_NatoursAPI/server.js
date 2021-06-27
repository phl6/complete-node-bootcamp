const dotenv = require('dotenv');

//ch67 Environment Variables
dotenv.config({
    path: './config.env'
});


const app = require('./app');


// console.log(app.get('env')); //get the environment
// console.log(process.env); //all the environment variables from nodeJS

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}... `);
});