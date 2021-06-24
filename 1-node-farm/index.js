const fs = require('fs'); // Ch.7 Using Modules 1: Core Modules
const http = require('http'); //Ch.11 Creating a simple webserver
const url = require('url');

///////////////////////////
//      FILES
///////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ch.8 Reading and Writing Files (Synchronous)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Blocking, Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `Writing text into a new txt file: ${textIn}.\nCreated on${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch.9 Reading and Writing Files Asynchronously
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Non-blocking, Asynchrnous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR!!!');

//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2); //data2 depends on data1
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3); 

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been written!');
//             })
//         });
//     });
// });

// console.log('Will read file');

///////////////////////////
//      SERVER
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ch.11 Creating a Simple Webserver
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//***top-level code will only be executed once when program starts, so using synchronous readfile here is not a problam
//*** __dirname = current directory ***
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Creating a webserver and return response if there's request
const server = http.createServer((req, res) => {
    // Ch.12 Routing
    console.log(req.url);

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }
    else if(pathName === '/product'){
        res.end('This is the PRODUCT');
    }
    else if(pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    else{
        res.writeHead(404, {
            //putting header here
            'Content-type': 'text/html',
            'my-own-header': 'Self-defined header',
        });
        res.end(`<h1>Page not found!</h1>`);
    }
    

    res.end('Hello from the server');
});

//keep running and listen requests from localhost port8000
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Ch.13 Building a very simple API
//--------------------------------------------------------------------------------------------------------------------------------------------------------



