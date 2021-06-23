const fs = require('fs'); // Ch.7 Using Modules 1: Core Modules
const http = require('http'); //Ch.11 Creating a simple webserver

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

//Creating a webserver and return response if there's request
const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from the server');
});

//keep running and listen requests from localhost port8000
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});