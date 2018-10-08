const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Person = require("../../models/Person");
const Profile = require("../../models/Profile");

// @type    GET
//@route    /api/profile/
// @desc    route for personnal user profile
// @access  PRIVATE

router.get("/:username", (req, res) => {
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "profilepic"])
    .then(profile => {
      if (!profile) {
        res.status(404).json({ notFoundError: "Profile not found!!" });
      }
      res.json(profile);
    })
    .catch(err => console.log("Error in fetching username " + err));
});

module.exports = router;
