const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();

//bring all routes..
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");

//Middleware for Express...
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch(error => console.log(error));

app.get("/", (req, res) => {
  res.send("Server Up and Running!!!");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/question", question);

app.listen(port);
