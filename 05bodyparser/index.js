const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

app.use('/login', express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send('Hello, App!!');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    // Do some Databse Processing...
    res.redirect('/');
});

app.listen(5000, () => {
    console.log('Server Running at Port 5000');
})