const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const app = express();

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  session({ secret: "1234manomano", resave: false, saveUninitialized: true })
);

app.set("view engine", "ejs");

app.get("/confirmAuth", (req, res) => {
  if (req.session.id) return res.send("Logged In");
  else return res.send("Not Logged In");
});

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
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/loginTest", (req, res) => {
  res.json({ u: "k" });
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);

// app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running at port ${port}`));
