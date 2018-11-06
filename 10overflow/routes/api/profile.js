const express = require("express");
const router = express.Router();
const Person = require("../../models/Person");

router.get("/", (req, res) => {
  res.json({ success: "Profile Home Page!" });
});

// @type -- GET
// @route -- /api/auth/profile
// @desc -- Route for Getting Profile Information of the Logged in User.
// @access -- Private

router.get("/info", (req, res, next) => {
  var _sec = req.cookies.__id;
  Person.findById(_sec)
    .then(person => {
      if (!person) {
        return res
          .status(403)
          .json({ noAccess: "Please Login to see the user profile.." });
      } else {
        if (person.token == req.cookies.auth_t) {
          data = {
            email: person.email,
            name: person.name,
            username: person.username,
            token: person.token
          };
          res.render("profile", { data: data });
        } else {
          res
            .status(400)
            .json({ sessionOut: "Session Timeout!!Please Login Again" });
        }
      }
    })
    .catch(err => console.log(err));
  //  else {
  //   res.json({ noAccess: "Access forbidden!" });
});

module.exports = router;
