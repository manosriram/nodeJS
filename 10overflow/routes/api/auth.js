const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");

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
          password: req.body.password
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
            // res.json({ success: "User is Logged-In successfully.." });
            // Use Payload and create a token for the user..
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

                // res.json({
                //   success: true,
                //   token: "Bearer " + token
                // });
                res.render("loggedin", { payload });
              }
            );
          } else {
            res.status(400).json({ noAccess: "Password Incorrect." });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @type -- GET
// @route -- /api/auth/profile
// @desc -- Route for Getting Profile Information of the Logged in User.
// @access -- Private

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.json({ success: "Private Route Accessed.!!" });
  }
);

module.exports = router;
