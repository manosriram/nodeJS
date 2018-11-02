var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var router = express.Router();
var bodyParser = require("body-parser");
const app = express();
var session = require("express-session");
var expressValidator = require("express-validator");
var routes = require("./routes/route");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MongoDB configuration...
const db = require("./setup/url").mongoURL;

// Connecting to the Database..
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected Successfully..."))
  .catch(err => console.log(err));

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "manomano1234", saveUninitialized: false, resave: false })
);

const port = 3000;

app.use("/", routes);

app.listen(port, (req, res) => {
  console.log(`Port running at ${port}`);
});