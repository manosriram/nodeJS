const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyparser = require("body-parser");
const passport = require("passport");

//bring all routes
const auth = require("./routes/api/auth");
// const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

const app = express();
const port = 5000;

app.listen(5000, () => console.log(`Server Running at port ${port}`));

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
require("./strategies/jsonwtStrategy")(passport);

//just for testing  -> route
app.get("/", (req, res) => {
  res.render("index");
});



//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
// app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running at ${port}`));
