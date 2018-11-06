const express = require("express");
const router = express.Router();
const Person = require("../../models/Person");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");

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

router.get("/info", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      data = {
        email: user.email,
        name: user.name,
        username: user.username,
        token: user.token
      };
      res.render("profile", { data: data });
    } else {
      res
        .status(400)
        .json({ sessionOut: "Session Timeout!!Please Login Again" });
    }
  });
});

// @type -- POST
// @route -- /api/profile/post
// @desc -- Route for Posting a Feed Item
// @access -- Private

router.post("/post", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      post = req.body.postArea;

      res.status(200).render("post", { data: post });
    }
  });
});

module.exports = router;
