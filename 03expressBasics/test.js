const express = require('express');
const app = express();
const fs = require('fs');

const writeStream = fs.createWriteStream(__dirname + '/writeup.txt');
const readStream = fs.createReadStream(__dirname + '/readMe.txt');
readStream.setEncoding('utf-8');


// Writing to another File..Through Writable Stream..
readStream.on('data', (chunk) => {
    console.log("Chunk Data Received!!");
    console.log(chunk);
    writeStream.write(chunk);
    console.log("Chunk Received at the other end...");

});


// Pushing Data Chunk to the Server ..
app.get('/', (req, res) => {
    const readStream = fs.createReadStream('readMe.txt');
    readStream.pipe(res);
});

// Starting Server...
app.listen(5000, () => {
    console.log("Listening at PORT 5000");

});