const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: "Profile Home Page!" });
});

// @type -- GET
// @route -- /api/auth/profile
// @desc -- Route for Getting Profile Information of the Logged in User.
// @access -- Private

router.get("/info", (req, res, next) => {
  if (req.cookies.auth_t !== undefined) {
    var _sec = req.cookies.__id;
    Person.findById(_sec)
      .then(person => {
        if (!person) {
          return res
            .status(400)
            .json({ notFound: "Please login to see the profile of the user!" });
        } else {
          data = {
            email: person.email,
            name: person.name,
            username: person.username,
            token: person.token
          };
          res.render("profile", { data: data });
        }
      })
      .catch(err => console.log(err));
  } else {
    res.json({ noAccess: "Access forbidden!" });
  }
});

module.exports = router;
