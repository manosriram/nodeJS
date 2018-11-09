const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");
const cors = require("cors");
const app = express();
const db = require("../../setup/myurl").mongoURL;

// @type -- GET
// @route -- /api/auth/
// @desc -- Just a default auth route.
// @access -- Public

router.get("/", (req, res) => {
  res.json({ success: "Auth Home Page!" });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// Import Schema for the User to register
const Person = require("../../models/Person");

// @type -- POST
// @route -- /api/auth/register
// @desc -- Route for Registration of Users.
// @access -- Public

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then(person => {
      if (person) {
        return res
          .status(400)
          .json({ emailError: "Email already registered in the Database.." });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        });
        // Encrypt Password using BCryptJS
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;

            // Storing hash in your password DB.
            newPerson.password = hash;
            newPerson
              .save()
              .then(person => res.json({ person }))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @type -- POST
// @route -- /api/auth/login
// @desc -- Route for Logging In of Users.
// @access -- Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!req.cookies.auth_t) {
    Person.findOne({ email })
      .then(person => {
        if (!person) {
          return res
            .status(404)
            .json({ emailError: "User not found with this Email.." });
        }
        bcrypt
          .compare(password, person.password)
          .then(isCorrect => {
            if (isCorrect) {
              // Use Payload and create a token for the user..
              var payload = {
                id: person.id,
                name: person.name,
                email: person.email,
                username: person.username
              };

              jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: "12h" },
                (err, token) => {
                  res.render("login");
                  res.cookie("auth_t", token, { maxAge: "12h" });
                }
              );
            } else {
              res.status(400).json({ noAccess: "Password Incorrect." });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    res.json({
      logoutException:
        "User Already Logged in..Please Logout and then Continue.."
    });
  }
});

router.get("/logout", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      res.clearCookie("auth_t");
      req.logout();
      res.status(200).redirect("/api/auth/login");
    } else {
      res.status(403).json({ noUser: "Access Forbidden" });
    }
  });
});
module.exports = router;
