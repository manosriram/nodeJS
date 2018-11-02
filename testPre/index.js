const port = 3000;
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
var expressValidator = require("express-validator");
const app = express();
var routes = require("./routes/route");
var auth = require("./routes/auth/authenticate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const Person = require("./models/Person");

// MongoDB configuration...
const db = require("./setup/url").mongoURL;

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

// Connecting to the Database..
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected Successfully..."))
  .catch(err => console.log(err));

// using tools..
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "mano1234", saveUninitialized: false, resave: false })
);

app.use(passport.initialize());
app.use(passport.session());

// Home Page..
app.use("/", routes);
app.use("/auth", auth);
app.listen(port, (req, res) => {
  console.log(`Port running at ${port}`);
});
