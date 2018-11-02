const express = require("express");
const passport = require("passport");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const Person = require("../../models/Person");
const key = require("../../setup/url");
var check = false;
router.get("/", (req, res) => {
  res.send("Welcome to Authenticate!");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  const email = req.body.email;

  Person.findOne({ email })
    .then(person => {
      if (person) {
        return res.status(400).json({
          alreadyRegistered: "Email Already Registered in the Database..."
        });
      } else {
        const newPerson = new Person({
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          age: req.body.age,
          description: req.body.description,
          date: req.body.date
        });
        newPerson
          .save()
          .then(
            res.status(200).json({
              success: "User successfully Registered...",
              registeredOn: newPerson.date
            })
          )
          .catch(err => console.log(err));
      }
    })
    .catch();
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        return res
          .status(400)
          .json({ notFoundError: "User with entered email not found.." });
      }
      if (password == person.password) {
        // Create a payload for the user..
        const payload = {
          email: person.email,
          password: person.password
        };
        jsonwt.sign(payload, key.secret, { expiresIn: "1h" }, (err, token) => {
          check = true;
          res.render("loggedIn");
        });
      } else {
        res
          .status(400)
          .json({ notCorrect: "Password not Correct..Please Try Again.." });
      }
    })
    .catch(err => console.log(err));
});

router.get("/checker", (req, res) => {
  if (check) return res.json({ success: "user is authenticated.!" });
  else return res.json({ failure: "user is not authenticated.." });
});

router.get("/logout", function(req, res) {
  check = false;
  req.logout();
  res.redirect("login");
});

module.exports = router;
