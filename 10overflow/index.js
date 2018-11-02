const express = require("express");
const router = require("router");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cookieParser());
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

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

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/check", (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

passport.serializeUser(function(user_id, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user_id, done) {
  User.findById(id, function(err, user) {
    done(null, user);
  });
});
// app.use("/api/questions", questions);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running at port ${port}`));
