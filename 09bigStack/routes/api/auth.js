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
          username: req.body.username,
          gender: req.body.gender,
          profilepic: req.body.profilepic
        });

        if (newPerson.gender == "Female")
          newPerson.profilepic =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Female_icon.svg/2000px-Female_icon.svg.png";

        // Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            //if (err) throw err;
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

// @type  POST
// @route /api/auth/login
// @desc route for login of user
// @access PUBLIC

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then(person => {
      if (!person) {
        return res
          .status(404)
          .json({ emailerror: "User Not Found with this Email..." });
      }
      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (isCorrect) {
            // res.json({ success: "User is Authenticated..." });
            // use payload and create token for the user...
            const payload = {
              id: person.id,
              name: person.name,
              email: person.email
            };
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            res.status(400).json({
              passworderror:
                "Password is not correct...Please Check your password.."
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @type  POST
// @route /api/auth/profile
// @desc route for user profile
// @access PRIVATE

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      profilepic: req.user.profilepic,
      gender: req.user.gender
    });
  }
);

module.exports = router;
