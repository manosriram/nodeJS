// Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = process.env.PORT || 27017;
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const key = require("./setup/myurl").secret;
const jsonwt = require("jsonwebtoken");

// Importing all Routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const homePage = require("./routes/api/homepage");

app.set("view engine", "ejs");
app.use(cookieParser());

mongoose.connect();

app.use(
  session({
    secret: key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800000, // 1 Week
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
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    res.redirect("/home");
  });
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
app.use("/api/posts", posts);
app.use("/home", homePage);

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});

module.exports = app;
