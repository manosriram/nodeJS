var express = require("express");
var session = require("express-session");
var router = express.Router();
var checker;

const Person = require("../models/Person");

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Form Validiation",
    success: false,
    errors: session.errors
  });
  req.session.error = null;
});

router.post("/submit", (req, res, next) => {
  req.check("email", "Invalid Email address!!").isEmail();
  req
    .check("password", "Invalid Password..")
    .isLength({ min: 5 })
    .equals(req.body.password);
  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  console.log(`Email : ${req.body.email}`);
  console.log(`Password : ${req.body.password}`);
  console.log(`Success : ${req.session.success}`);
  if (errors) {
    console.log(req.session.errors);
  }
  //   checker = true;
  //   console.log(`${req.session}`);
  res.render("index", { success: req.session.success });
});

router.get("/check", (req, res) => {
  if (req.session.success) console.log("Yes");
  else console.log("No");

  req.session.destroy();
});

router.get("/checkDatabase", (req, res) => {
  Person.findById("sidbifsifudf")
    .then(person => {
      if (!person) return res.json({ empty: "Empty Database..." });
      if (person) return res.json({ notEmpty: "Database not empty.." });
    })
    .catch(err => console.log(err));
});

module.exports = router;
