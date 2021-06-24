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

// ch17 using Modules 2: Our Own Modules
const replaceTemplate = require('./modules/replaceTemplate');

//ch13
//***top-level code will only be executed once when program starts, so using synchronous readfile here is not a problam

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); //*** __dirname = current directory ***
const dataObj = JSON.parse(data); //returns an array of all the objects in data.json

//ch14-15 HTML TEMPLATING: Building and Filling the Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//ch.17 (moved to ./modules/replaceTemplate.js)
// const replaceTemplate = (template, product) => {
//     let output = template.replace(/{%PRODUCTNAME%}/g,  product.productName); //  /_ _ _ /g <= regular expression global is used, all of these placeholders will get replaced
//     output = output.replace(/{%ID%}/g,  product.id);
//     output = output.replace(/{%IMAGE%}/g,  product.image);
//     output = output.replace(/{%PRICE%}/g,  product.price);
//     output = output.replace(/{%FROM%}/g,  product.from);
//     output = output.replace(/{%NUTRIENTS%}/g,  product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g,  product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g,  product.description);

//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,  'not-organic'); //replace the placeholder of html class tag

//     return output;
// };


//Creating a webserver and return response if there's request
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(req.url, true)); //IMPORTANT, retrieve the request url, true = query mode
    const {query, pathname} = url.parse(req.url, true); //get the query(includes id here) and pathname
    
    // Ch.12 Routing
    //Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(''); //.join('') joins all the array elements into an empty string, then return a markup with new cards
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        
        res.end(output);
    }
    //Product Page
    else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});

        console.log(query);
        const product = dataObj[query.id]; //get the object that matches the id retrieves from query(url)
        console.log(product);
        const output = replaceTemplate(tempProduct, product); //render the product template

        res.end(output);
    }
    //ch.13 building a very simple api
    //Api 
    else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'}); //specify it returns a JSON object
        res.end(data);
    }
    //Not Found
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




