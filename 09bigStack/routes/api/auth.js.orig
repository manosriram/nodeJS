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
<<<<<<< HEAD
=======
            //if (err) throw err;
>>>>>>> 8586ef33e30645f8048767f1ac8e7f5ea1aa9606
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
<<<<<<< HEAD
=======
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
>>>>>>> 43280785b0174a7291b66da87d1a707f3543f420
    .catch(err => console.log(err));
});

module.exports = router;
