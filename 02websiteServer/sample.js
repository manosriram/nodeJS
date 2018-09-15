const fs = require('fs');

const stream = fs.createReadStream(process.cwd() + '/sample.js');
console.log(stream);

