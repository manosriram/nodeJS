const express = require("express");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;

const port = process.env.PORT || 3000;

passport.use(
  new Strategy(
    {
      clientID: "280468995900910",
      clientSecret: "0d739bdc76f23e66917bf0854d8fdea5",
      callbackURL: "http://localhost:3000/login/facebook/return"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Create Express App...
var app = express();

// set view dir.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combine"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Mano",
    resave: true,
    saveUninitialized: true
  })
);

/* @route - Get /
   @desc - a route to homepage...
   @access - PUBLIC
*/

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

/* @route - Get /login
   @desc - a route to loginpage...
   @access - PUBLIC
*/

app.get("/login", (req, res) => {
  res.render("login");
});

/* @route - Get /login/facebook
   @desc - a route to facebook auth...
   @access - PUBLIC
*/

app.get("/login/facebook", passport.authenticate("facebook"));
/* @route - Get /login/facebook/callback
   @desc - a redirect after login...
   @access - PUBLIC
*/

app.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful Login, Redirect to Homepage..
    res.redirect("/");
  }
);

/* @route - Get /profile
       @desc -  user profile 
       @access - PRIVATE
    */

app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  (req, res) => {
    res.render("profile", { user: req.user });
  }
);

app.listen(port);
