const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
res.render('index')

});
router.get('/test', (req,res) => {
    require("../request.js");
    
});
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
});
module.exports = router;