const express = require('express');
const router = express.Router();
const sql = require("../sql");

router.get('/', (req, res) => {
    res.render('index')
});

router.put("/sql", (req, res) => {
    
})

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
        sql.request("spending", function (data) {
            console.log("success");

            res.set('Content-Type', 'application/json');
            res.send(data);
        })

    }
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