const express = require("express");
const router = express();
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/myurl");

// router.get("/", (req, res) => {
//   res.render("post");
// });
router.get("/", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key.secret, (err, user) => {
    if (user) {
      console.log(user);
      res.render("post", { user: user });
    } else {
      res.render("post", { user: user });
    }
  });
});

router.get("/navbar", (req, res) => {
  res.render("navbar");
});

module.exports = router;
