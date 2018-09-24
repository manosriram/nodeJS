const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");

router.get("/", (req, res) => res.json({ test: "Auth Succesfull.." }));

//Import Schema for Person To Register...
const Person = require("../../models/Person");

// @type  POST
// @route /api/auth/register
// @desc route for registration of user
// @access PUBLIC

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then(person => {
      if (person) {
        return res.status(400).json({
          emailerror: "Email is Already Registered in our Database..."
        });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        });
        // Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            newPerson.password = hash;
            newPerson
              .save()
              .then(person => res.json(person))
              .catch(err => console.log(err));
            // Store hash in your password DB.
          });
        });
      }
    })
    .catch(error => console.log(error));
});

module.exports = router;
