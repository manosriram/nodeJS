const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Person Model...
const Person = require("../../models/Person");

// Load Profile Model...
const Profile = require("../../models/Profile");

// @type  GET
// @route /api/profile/
// @desc  route for Personal userprofile..
// @access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res
            .status(404)
            .json({ profileError: "No User Profile Found..." });
        } else {
          res.json({ profile });
        }
      })
      .catch(err => console.log("Error Occured Here..." + err));
  }
);

// @type  POST
// @route /api/profile/
// @desc route for Updating and saving User Profile
// @access PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {};
    profileValues.user = req.user.id;
    if (req.body.username) profileValues.username = req.body.username;
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (req.body.date) profileValues.date = req.body.date;
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;

    //if (typeof req.body.languages !== undefined) {
    // profileValues.languages = req.body.languages.split(",");
    //}

    // Get social values..
    profileValues.social = {};

    if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
    if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
    if (req.body.instagram) profileValues.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("Problem in Updating Data...   " + err));
        } else {
          Profile.findOne({
            username: profileValues.username
          })
            .then(profile => {
              // Username Already Exists...
              if (profile) {
                res.status(400).json({
                  username: "Username Already Exists..."
                });
              }
              // Save User Profile..
              new Profile(profileValues)
                .save()
                .then(profile => res.json(profile))
                .catch(err =>
                  console.log("Not Able to Save the User Data..  " + err)
                );
            })
            .catch(err => console.log("Problem in user profile...  " + err));
        }
      })
      .catch(err => console.log("Problem in Fetching Profile " + err));
  }
);

// @type  GET
// @route /api/profile/username
// @desc route for getting userprofile based on USERNAME
// @access PUBLIC

router.get("/:username", (req, res) => {
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "profilepic"])
    .then(profile => {
      if (!profile) res.status(404).json({ userError: "User not found.." });
      // Put else here...
      res.json(profile);
    })
    .catch(err => console.log("Error in fetching username...   " + err));
});

// @type  GET
// @route /api/profile/id
// @desc route for getting userprofile based on ID
// @access PUBLIC

router.get("/get/:id", (req, res) => {
  Profile.findOne({ id: req.param.id })
    .populate("user", ["name", "profilepic"])
    .then(profile => {
      if (!profile) res.status(404).json({ userError: "User Not found.." });

      res.json(profile);
    })
    .catch(err => console.log(err));
});

// @type  GET
// @route /api/profile/everyone
// @desc route for getting Everyones user profile
// @access PUBLIC

router.get("/find/everyone", (req, res) => {
  Profile.find()
    .populate("user", ["name", "profilepic"])
    .then(profiles => {
      if (!profiles)
        res.status(404).json({ profileError: "Profile not found.." });

      res.json(profiles);
    })
    .catch(err => console.log(err));
});

module.exports = router;
