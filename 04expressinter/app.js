const express = require('express');
const app = express();

var myconsole = function (req, res, next) {
    console.log('I am a Middleware!');
    next();
}

var serverTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

app.use(serverTime);

app.get('/', (req, res) => {
    res.send('Hello World!' + "and time is : " + req.requestTime);
});

app.listen(5000, () => {
    console.log('Server Running at Port http://127.0.0.1:5000/');
});