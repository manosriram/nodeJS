const express = require('express');
const app = express();
const path = require('path');

var port = process.env.PORT || 3000;

// To Open views Folder at the Start of the Server
app.set('views', path.join(__dirname + '/views'));


// To set the Templating Engine to PUG
app.set('view engine', 'pug');

// Route to Start During the Start of the Server..
app.get('/', (req, res) => {
    // Renders index.pug
    res.render("index");
});

app.listen(port, () => console.log(`Server Running at Port ${port}`));