const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('./public'));


// Creating a Destination and Filename
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// .single() means that atmost one file can be uploaded...
var upload = multer({ storage: storage }).single("profilepic");


// If submitted with errors, show the errors...else, show "Successfully Uploaded...."
app.post("/upload", (req, res) => {
    upload(req, res, error => {
        if (error) {
            res.render("index", {
                message: error,
            });
        } else {
            res.render("index", {
                message: `Successfully Uploaded....`,
                filename: `myupload/${req.file.filename}`,
            });
        }
    });
});

// Setup for ejs
app.set('view engine', "ejs");

// Base Page..
app.get('/', (req, res) => {
    res.render("index");
});

// Server to be Listened...
app.listen(port, () => {
    console.log(`Server Running at ${port}...`);
});