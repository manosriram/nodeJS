const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!...Again!!');
});

app.get('/about', (req, res) => {
    //res.status(200).json({ user: 'Hitesh', age: 20, id: '1234ght567' });
    res.status(500).json({ error: 'Something Went Wrong...' });
});

// Route for Contact us and services..

app.get('/contact', (req, res) => {
    res.send('<h3>Contact us at 1234567890</h3>');
});

app.get('/services*of', (req, res) => {
    res.send('Services : <ul><li>NodeJS</li><li>JavaScript</li><li>Express</li></ul>');
});

app.post('/login', (req, res) => {
    res.send('login success..');
})

app.delete('/delete', (req, res) => {
    res.send('deleted...');
})


app.get("/flights/:from-:to", (req, res) => {
    res.send(req.params);
});


app.get('/user/:id/status/:statusID', (req, res) => {
    res.send(req.params);
})

app.listen(5000, () => {
    console.log('Server Running at Port http://127.0.0.1:5000/');
});