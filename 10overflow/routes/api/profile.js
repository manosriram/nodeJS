const express = require("express");
const router = express.Router();
const Person = require("../../models/Person");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");
const Post = require("../../models/Post");

router.get("/", (req, res) => {
  res.json({ success: "Profile Home Page!" });
});

router.get("/post", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      res.render("post", { data: false });
    } else {
      res.status(403).json({ noAccess: "Forbidden!" });
    }
  });
});

// @type -- GET
// @route -- /api/auth/profile
// @desc -- Route for Getting Profile Information of the Logged in User.
// @access -- Private

// router.get("/info", (req, res) => {
//   jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
//     if (user) {
// res.render("profile", { data: user });
//     } else {
//       res
//         .status(400)
//         .json({ sessionOut: "Session Timeout!!Please Login Again" });
//     }
//   });
// });

// @type -- GET
// @route -- /api/auth/profile/info
// @desc -- Route for Getting Profile Information of the Logged in User.
// @access -- Private

router.get("/info", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      Post.find({ id: user.id })
        .then(post => res.render("profile", { data: user, post: post }))
        .catch(err => console.log(err));
    } else {
      res.status(403).redirect("/home");
    }
  });
});

module.exports = router;
