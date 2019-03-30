const express = require('express');
const router = express.Router();
const sql = require("../sql");

router.post("/sql", (req, res) => {
    console.log(req.body);
    
    //NOTE(DanoB) replace true with check if user is logged in
    if (true && req.body.category && req.body.amount && req.body.note) {
        let name = 'admin' //NOTE(DanoB) Replace when login is working
        let category = req.body.category;
        let amount = req.body.amount * ((req.body.credit === "false") ? -1 : 1);
        let note = req.body.note;
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
                    res.send(succ)
                }
            }
        );
    }
});

router.get('/sql', (req, res) => {
    sql.request("spending", function (data) {
        res.set('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('*', (req, res) => {
    switch (req.originalUrl) {
        case "/":
            res.render('index');
            break;
        case "/dashboard":
            res.render('dashboard');
            break;
        case "/crossroad":
            res.render('crossroad');
            break;
        case "/goal":
            res.render('goal');
            break;
        default:
            res.sendStatus(404);
            break;
    }
});

module.exports = router;