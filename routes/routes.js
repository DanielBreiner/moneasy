const express = require('express');
const router = express.Router();
const sql = require("../sql");


router.get('/', (req, res) => {
    res.render('index')

});
router.get('/sql', (req, res) => {
    //NOTE(DanoB) replace true with check if user is logged in
    if (true && req.query.category && req.query.amount && req.query.note) {
        let name = 'admin' //NOTE(DanoB) Replace when login is working
        let category = req.query.category;
        let amount = req.query.amount;
        let note = req.query.note;
        let date = new Date().getTime();

        sql.insert(
            "spending",
            {
                "name": name,
                "category": category,
                "amount": amount,
                "note": note,
                "date": date
            },
            function (succ) {
                if (succ) {
                    res.send("success")
                }
            }
        );
    } else {
        res.send("fail")
    }
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});
module.exports = router;