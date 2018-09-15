const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page...Welcome!!</h1>');
});

// Route for Contact us and services..

app.get('/contact', (req, res) => {
    res.send('<h3>Contact us at 1234567890</h3>');
});

app.get('/services', (req, res) => {
    res.send('Services : <ul><li>NodeJS</li><li>JavaScript</li><li>Express</li></ul>');
});


app.listen(5000, () => {
    console.log('Server Running at Port http://127.0.0.1:5000/');
});