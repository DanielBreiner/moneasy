const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
res.render('index')

});
router.get('/test', (req,res) => {
    var name = 'ivan'
    var category = req.query.category;
    var amount = req.query.amount;
    var note = req.query.note;
    var dateCount= new Date;
    var date = dateCount.getTime();
    sql.insert(name, category, amount, note, date);
    
});
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
});
module.exports = router;