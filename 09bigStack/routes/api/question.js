const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    question: "Questions Not Yet Ready.."
  });
});

module.exports = router;
