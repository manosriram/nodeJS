const fs = require('fs');
const stream = fs.createReadStream(__dirname + '/readMe.txt');
stream.setEncoding('utf-8');

const writeStream = fs.createWriteStream(__dirname + '/writeMe.txt');

stream.pipe(writeStream);
console.log('Data Received and Piped..');

