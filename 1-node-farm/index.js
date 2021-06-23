// Ch.7 Using Modules 1: Core Modules
const fs = require('fs');


// Ch.8 Reading and Writing Files (Synchronous)
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `Writing text into a new txt file: ${textIn}.\nCreated on${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File Written!');
