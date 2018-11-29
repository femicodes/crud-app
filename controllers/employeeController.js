const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.json('ayye bitch');
})

module.exports = router;