const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");
const bcrypt = require("bcryptjs");
const app = express();

const Person = require("../../models/Person");

// @type    POST
//@route    /api/auth/register
// @desc    route for registration of user...
// @access  PUBLIC

router.post("/register", (req, res) => {
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
          name: req.body.name
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

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.pasword;

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        res
          .status(404)
          .json({ userNotFound: "User not found with this email!!" });
      }

      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (ifCorrect) {
            const payload = {
              id: req.user.id,
              email: req.user.email,
              password: req.user.password
            };

            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 3600 },
              res.json({
                success: true,
                token: "Bearer " + token
              })
            );
          } else {
            res.status(404).json({ passwordError: "Passwords dont match!!" });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
