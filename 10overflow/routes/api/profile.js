const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

const Person = require("../../models/Person");
const Profile = require("../../models/Profile");

router.get("/delete", (req, res) => {
  res.render("delete");
});

// @type    GET
//@route    /api/profile/myInfo
// @desc    route for Knowing details of an account..
// @access  PRIVATE

router.get(
  "/myInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(res.redirect("info", { user: user }))
      .catch(err => console.log(err));
  }
);

// @type    DELETE
//@route    /api/profile/deleteUser
// @desc    route for delete an user account
// @access  PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id });
    Profile.findByIdAndRemove({ user: req.user.id })
      .then(() => {
        Profile.findByIdAndRemove({ _id: req.user.id })
          .then(
            res.json({ deleteSuccess: "Successfully Removed Your Account!" })
          )
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);


module.exports = router;
