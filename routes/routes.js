const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
res.render('index')

})
router.get('/test', (req,res) => {
    var test = require('../request.js');
    console.log(test);
    })
module.exports = router;