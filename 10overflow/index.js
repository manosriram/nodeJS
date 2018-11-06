// Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const key = require("./setup/myurl").secret;

// Importing all Routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

app.set("view engine", "ejs");
app.use(cookieParser());

app.use(
  session({
    secret: key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  })
);

// MongoDB config
const db = require("./setup/myurl").mongoURL;

// Attempt to connect to the database.
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected Succesfully."))
  .catch(err => console.log(err));

// Passport Middleware.
app.use(passport.initialize());

//Config for JWT Strategy.
require("./strategies/jsonwtStrategy")(passport);

// Middleware for Body-Parser.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Test home route.
app.get("/", (req, res) => {
  res.send("Hello, World!  ");
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Actual routes.
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/questions", questions);

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});

module.exports = app;
