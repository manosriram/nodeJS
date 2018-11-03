const express = require("express");
const router = express.Router();
const jsonwt = require("jsonwebtoken");
const Person = require("../../models/Person");
const key = require("../../setup/url");
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("Welcome to Authenticate!");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/check", (req, res) => {
  res.render("checkStatus");
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
        // Hashing the Password..
        var bcrypt = require("bcryptjs");
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then(person =>
                res.json({ person: person, registeredOn: person.date })
              )
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch();
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var bcrypt = require("bcryptjs");

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        return res
          .status(404)
          .json({ notFound: "User not Found with this email" });
      }

      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (isCorrect) {
            // res.json({ success: "User is able to login.." });
            // create payload to create token for user.
            const payload = {
              id: person.id,
              email: person.email,
              name: person.email,
              description: person.description,
              age: person.age,
              username: person.username
            };
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 3600 },
              (err, token) => {
                header = { authorization: token };
                console.log(header);
                // res.json({ success: true, token: token });
              }
            );
          } else {
            res.status(404).json({ passwordError: "Password Incorrect." });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post(
  "/checkStatus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    console.log(id);
    Person.findOne({ id })
      .then(person => {
        if (!person) {
          res.json({ fail: "No user logged in" });
        }
        res.json({ success: "user is currently logged in.." });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
