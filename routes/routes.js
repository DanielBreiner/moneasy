const express = require('express');
const router = express.Router();
const sql = require("../sql");

router.post("/sql", (req, res) => {
    console.log(req.body);
    
    //NOTE(DanoB) replace true with check if user is logged in
    if (true && req.body.category && req.body.amount) {
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
    sql.requestRaw("SELECT * FROM public.spending ORDER BY date DESC;", function (data) {
        res.set('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('/advice', (req, res) => {
    let keys = Object.keys(req.query);
    if (keys.length > 0) {
        if (keys.includes("advice")){
            sql.requestRaw(`SELECT quote FROM public.advice WHERE id=${req.query["advice"]};`, function(data) {
                res.set('Content-Type', 'application/json');
                res.send(data);
            })
        } else if (keys.includes("read")) {
            let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
            sql.requestRaw(`UPDATE users SET curadvice = curadvice + 1 WHERE name='${username}';`, function(data) {
                res.sendStatus(200);
            })
        }
    } else {
        let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
        sql.requestRaw(`SELECT (SELECT curadvice FROM public.users WHERE name='${username}') % (SELECT COUNT(*) FROM public.advice) + 1;`, function (data) {
            res.set('Content-Type', 'application/json');
            res.send(data);
        })
    }
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