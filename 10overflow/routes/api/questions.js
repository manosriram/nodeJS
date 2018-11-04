const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: "Questions Home Page!" });
});

module.exports = router;
