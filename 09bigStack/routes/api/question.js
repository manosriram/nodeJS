const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.get('/', (req, res) => res.json({ test: 'Questions Not Yet Ready...' }));

module.exports = router;
=======
router.get("/", (req, res) => {
  res.json({
    question: "Questions Not Yet Ready.."
  });
});

module.exports = router;
>>>>>>> 09bd1ce9b570a08e53db35c4d0f8629e56a40260
