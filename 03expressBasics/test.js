const express = require('express');
const app = express();
const fs = require('fs');


app.get('/', (req, res) => {
    var readStream = fs.createReadStream(__dirname + '/readMe.txt');
    readStream.pipe(res);
});

app.listen(5000, () => {
    console.log('Server Running!!');
});