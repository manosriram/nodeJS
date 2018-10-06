const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const passport = require("passport");
const ejs = require("ejs");

const port = process.env.PORT || 8000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
// app.set("scripts", path.join(__dirname + "/scripts"));
// app.use(express.static(__dirname + "/views"));
//bring all routes..
// const auth = require("./routes/api/auth");
// const question = require("./routes/api/question");
// const profile = require("./routes/api/profile");

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

// Passport  middleware
app.use(passport.initialize());

// Config for jwt Strategy..
// require("./strategies/jsonwtStrategy")(passport);

app.get("/", (req, res) => {
  res.render("plain.html");
});

var count = 0;

//actual routes
// app.use("/api/auth", auth);
// app.use("/api/questions", question);
// app.use("/api/profile", profile);

app.listen(port);
