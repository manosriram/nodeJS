const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.json({
    test: 'Profile Not Yet Ready...'
}));

module.exports = router;