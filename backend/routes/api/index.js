// backend/routes/api/index.js
const router = require('express').Router();

// test route
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

// Phase 1 fetch request test
/*
fetch ('/api/test', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": "f17Wxcpg-bHHLyPy_y0H9riCBDU8IK2Z25b0"
    },
    body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/

module.exports = router;