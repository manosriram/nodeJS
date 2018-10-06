const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const passport = require("passport");
const ejs = require("ejs");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
// app.use(express.static(__dirname + "/views"));
//bring all routes..
<<<<<<< HEAD:09bigStack/index.js
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");
=======
// const auth = require("./routes/api/auth");
// const question = require("./routes/api/question");
// const profile = require("./routes/api/profile");
>>>>>>> 977f4da29a1ed63ab70f3673ea8eff1d8d6e34b9:pro1/index.js

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

var counted = { count: 0 };

app.get("/", (req, res) => {
  res.render("index");
});

var count = 0;

//actual routes
<<<<<<< HEAD:09bigStack/index.js
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/question", question);
app.use("/api/questions", question);
app.use("/api/profile", profile);
=======
// app.use("/api/auth", auth);
// app.use("/api/questions", question);
// app.use("/api/profile", profile);
>>>>>>> 977f4da29a1ed63ab70f3673ea8eff1d8d6e34b9:pro1/index.js

app.listen(port);
