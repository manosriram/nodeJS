const express = require("express");
<<<<<<< HEAD
const app = express();
const port = 5000;

app.get("/api", (req, res) => {
  const laps = [
    { apple: "MacOS Mojave" },
    { windows: "Windows 10" },
    { ubuntu: "UbuntuOS" }
  ];

  res.json(laps);
});

app.listen(5000, () => console.log(`Server Running at port ${port}`));
=======
const mongoose = require("mongoose");
const router = express.Router();
const bodyparser = require("body-parser");
const passport = require("passport");

//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
// const profile = require("./routes/api/profile");

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

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
// require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//actual routes
app.use("/api/auth", auth);
// app.use("/api/questions", questions);
// app.use("/api/profile", profile);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running at ${port}`));
>>>>>>> a97d7edd3a37b0edf366100c72bd1a3f5364b199
