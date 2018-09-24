const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    profile: "Profile Not Ready Yet..."
  });
});

module.exports = router;
