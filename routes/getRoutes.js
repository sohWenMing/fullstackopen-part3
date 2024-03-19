const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Ok, i'm getting something from you");
})

module.exports = router;

