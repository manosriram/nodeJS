const express = require("express");
const router = require("router");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const app = express();
//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  session({ secret: "1234manomano", resave: false, saveUninitialized: true })
);

app.set("view engine", "ejs");

//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

// required for passport session

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/loginTest", (req, res) => {
  res.json({ u: "k" });
});

app.get("/check", (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.json({ nope: "not logged in" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

// app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running at port ${port}`));
