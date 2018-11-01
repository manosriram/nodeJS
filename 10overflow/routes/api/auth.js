const express = require("express");
const router = express.Router();
const passport = require("passport");
const key = require("../../setup/myurl");
const bcrypt = require("bcryptjs");
const app = express();
const jsonwt = require("jsonwebtoken");

const Person = require("../../models/Person");

// @type    GET
//@route    /api/auth/register
// @desc    route for register page of user registration..
// @access  PUBLIC

router.get("/register", (req, res) => {
  res.render("register");
});

// @type    GET
//@route    /api/auth/login
// @desc    route for login page of user login
// @access  PUBLIC

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/info", (req, res) => {
  res.render("info");
});

// @type    POST
//@route    /api/auth/register
// @desc    route for registration of user...
// @access  PUBLIC

router.post("/registered", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then(person => {
      if (person) {
        return res
          .status(400)
          .json({ emailError: "Email Already Registered..Please Login!!" });
      } else {
        const newPerson = new Person({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          age: req.body.age,
          occupation: req.body.occupation
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then(person => res.json(person))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @type    POST
//@route    /api/auth/login
// @desc    route for login of user...
// @access  PUBLIC

// router.post("/loggedIn", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        return res
          .status(404)
          .json({ emailerror: "User not found with this email" });
      }
      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (isCorrect) {
            // res.json({ success: "User is able to login successfully" });
            //use payload and create token for user
            const payload = {
              id: person.id,
              name: person.name,
              email: person.email
            };
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: "2 days" },
              (err, token) => {
                res.render("../privateTemplates/loggedIn1", {
                  payload: payload
                });
                // success: true,
                // token: "Bearer " + token,
                // payload: payload
                // });
              }
            );
          } else {
            res.status(400).json({ passworderror: "Password is not correct" });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

// @type    POST
//@route    /api/auth/name
// @desc    route for getting the Information of the given user - name.
// @access  PUBLIC

router.post("/getInfo", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then(person => {
      if (!person) {
        return res.json({ notFoundError: "User Not Found with this email.." });
      }
      const payload = {
        id: person.id,
        email: person.email
      };
      return res.json({ user: req.user });
    })
    .catch(err => console.log(err));
});

module.exports = router;
