// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

// test route
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;