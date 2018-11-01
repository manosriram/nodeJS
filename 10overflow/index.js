const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

const app = express();

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

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
app.use(
  session({
    secret: "secrettexthere",
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
    store: new MongoStore({
      url: config.urlMongo,
      collection: "sessions"
    })
  })
);

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

app.get("/check", (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.json({ nope: "not logged in" });
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
// app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running at ${port}`));
