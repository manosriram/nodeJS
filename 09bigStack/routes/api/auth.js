const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => res.json({ test: "Auth success..." }));

const Person = require("../../models/Person");

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then(person => {
      if (person) {
        return res.status(400).json({
          emailError: "User is Already Registered in the Database..."
        });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          password: req.body.password,
          username: req.body.username,
          email: req.body.email
        });
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
    .catch(err => console.log(err));
});

module.exports = router;
