const fs = require('fs');
const superagent = require('superagent');

//41 - The Problem with Callbacks: Callback Hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             //if error, return directly here
//             if (err) return console.log(err.message);

//             //no error
//             console.log(res.body.message)
//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 console.log('Random dog image saved to file')
//             });

//         });

//42 - From Callbacks Hell to Promise
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then(res => {
//             //if error, return directly here
//             if (err) return console.log(err.message);

//             //no error
//             console.log(res.body.message)
//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 console.log('Random dog image saved to file')
//             });
//         })
//         .catch(err => console.log(err.message));
// });

//43 Building a Promise
const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find the file 😢');
            resolve(data);
        })
    })
}

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write the file 😥');
            resolve('success');
        })
    })
}

// readFilePromise(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then(res => {
//         console.log(res.body.message)
//         return writeFilePromise('dog-img.txt', res.body.message);

//         // fs.writeFile('dog-img.txt', res.body.message, err => {
//         //     //if error, return directly here
//         //     if (err) return console.log(err.message);
//         //     //no error
//         //     console.log('Random dog image saved to file')
//         // });
//     })
//     .then(() => console.log('Random dog image saved to file'))
//     .catch(err => console.log(err.message));


//44 Consuming Promises with async/await
// const getDogPic = async () => {
//     try {
//         const data = await readFilePromise(`${__dirname}/dog.txt`);
//         console.log(`Breed: ${data}`);

//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);

//         await writeFilePromise('dog-img.txt', res.body.message);
//         console.log('Random dog image saved to file');
//     } catch (error) {
//         console.log('I could not find the file 😢');
//         throw (error)
//     }
//     return '2: READY!!!';
// };

// console.log('1: Will get dog pics!');
// getDogPic().then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
// });

//Call immediately with async/  await
// (async () => {
//     try {
//         console.log('1: Will get dog pics!');
//         const x = await getDogPic();
//         console.log(x); 
//         console.log('3: Done getting dog pics!');
//     } catch (err) {
//         console.log('ERROR🎇');
//     }
// })();


//46 Waiting for Multiple Promises Simultaneously
const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Prom = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        //using Promise.all
        const all = await Promise.all([res1Prom, res2Prom, res3Prom]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePromise('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file');
    } catch (error) {
        console.log('I could not find the file 😢');
        throw (error)
    }
    return '2: READY!!!';
};

getDogPic();