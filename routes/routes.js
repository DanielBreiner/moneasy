const express = require('express');
const router = express.Router();
const sql = require("../sql");

router.get('/', (req, res) => {
    res.render('index')
});

router.post("/sql", (req, res) => {
    console.log(req.body);
    
    //NOTE(DanoB) replace true with check if user is logged in
    // if (true && req.body.category && req.body.amount && req.body.note) {
    //     let name = 'admin' //NOTE(DanoB) Replace when login is working
    //     let category = req.body.category;
    //     let amount = req.body.amount;
    //     let note = req.body.note;
    //     let date = new Date().getTime();

    //     sql.insert(
    //         "spending",
    //         {
    //             "name": name,
    //             "category": category,
    //             "amount": amount,
    //             "note": note,
    //             "date": date
    //         },
    //         function (succ) {
    //             if (succ) {
    //                 res.send(succ)
    //             }
    //         }
    //     );
    // }
});

router.get('/sql', (req, res) => {
    sql.request("spending", function (data) {
        res.set('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});
router.get('/crossroad', (req, res) => {
    res.render('crossroad')
});
router.get('/goal', (req, res) => {
    res.render('goal')
});

module.exports = router;