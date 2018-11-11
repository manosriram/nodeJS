const express = require("express");
const router = express();
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");
const Person = require("../../models/Person");
const Post = require("../../models/Post");

// router.get("/", (req, res) => {
//   res.render("post");
// });

router.get("/", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      res.render("post", { user: user });
    } else {
      res.render("post", { user: user });
    }
  });
});

router.get("/postTest", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      Person.findById(user.id).then(person => {
        // console.log(person.follows);
        Post.find({ id: person.follows }).then(post => {
          res.render("status", { post: post, user: user, person: person });
        });
      });
    } else {
      res
        .status(403)
        .json({ noAccess: "Please Login to Get regular Status Updates!" });
    }
  });
});

module.exports = router;
