/**
 * @file REST API and its routing
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

var router = require('express').Router();
const middlewares = require("./middlewares");
const sql = require("../sql");

router.post("/spending", middlewares.authorize, (req, res) => {
    if (req.body.amount && req.body.category)
        sql.query(`\
            INSERT INTO spending (userid, amount, note, category)\
            SELECT '${req.user.id}', '${req.body.amount}', '${req.body.note}', id\
            FROM category\
            WHERE name='${req.body.category}';`,
            () => res.send(true)
        );
    else
        res.sendStatus(400);
});

router.delete('/spending', middlewares.authorize, (req, res) => {
    if (req.body.id)
        sql.query(`DELETE FROM spending WHERE userid='${req.user.id}' AND id=${req.body.id};`, () => res.send(true));
    else
        res.sendStatus(400);
});

router.get('/spending', middlewares.authorize, (req, res) => {
    sql.query(`SELECT amount,note,category,date,id FROM spending WHERE userid='${req.user.id}' ORDER BY date DESC;`, (data) => {
        res.set('Content-Type', 'application/json');
        res.send(data.rows);
    })
});

router.get("/balance", middlewares.authorize, (req, res) => {
    sql.query(`SELECT SUM(amount) FROM spending WHERE userid='${req.user.id}';`, (data) => {
        res.set('Content-Type', 'text/plain');
        res.send(data.rows[0].sum.toString());
    });
});

router.post("/goal", middlewares.authorize, (req, res) => {
    if (req.body.name && req.body.goal)
        sql.query(`INSERT INTO goal (userid, goal, name) VALUES ('${req.user.id}', '${req.body.goal}', '${req.body.name}')`, () => res.send(true));
    else
        res.sendStatus(400);
});

router.delete('/goal', middlewares.authorize, (req, res) => {
    if (req.body.id)
        sql.query(`DELETE FROM goal WHERE userid='${req.user.id}' AND id=${req.body.id};`, () => res.send(true));
    else
        res.sendStatus(400);
});

router.get('/goal', middlewares.authorize, (req, res) => {
    sql.query(`SELECT id, goal, name FROM goal WHERE userid='${req.user.id}' ORDER BY date DESC;`, (data) => {
        res.set('Content-Type', 'application/json');
        res.send(data.rows);
    });
});


// router.get('/smartadvice', (req, res) => {
//     let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
//     sql.requestRaw(`SELECT text FROM public.smartadvice WHERE id=(SELECT (SELECT curgoaladvice FROM public.user WHERE name='${username}') % (SELECT COUNT(*) FROM public.smartadvice) + 1);`, function (data) {
//         if (data[0]["text"].match(/\$.*?\$/)){
//             if (data[0]["text"].includes("$today$")){
//                 sql.requestRaw("select (select sum(spent) from spending WHERE datenew > CURRENT_DATE - interval '1 day') as a from spending limit 1;", function(data2){
//                     final = {"data": data[0]["text"].replace("$today$", Object.values(data2[0])[0])};
//                     res.set('Content-Type', 'application/json');
//                     res.send(final);
//                     sql.requestRaw(`UPDATE user SET curgoaladvice = curgoaladvice + 1 WHERE name='${username}';`, function(r) {console.log(r)});
//                 });
//             }
//         } else {
//             res.set('Content-Type', 'application/json');
//             res.send(data[0]);
//             sql.requestRaw(`UPDATE user SET curgoaladvice = curgoaladvice + 1 WHERE name='${username}';`, function(r) {console.log(r)});
//         }

//     });

// });

// router.get('/advice', (req, res) => {
//     let keys = Object.keys(req.query);
//     if (keys.length > 0) {
//         if (keys.includes("read")) {
//             let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
//             sql.requestRaw(`UPDATE user SET curadvice = curadvice + 1 WHERE name='${username}';`, function (data) {
//                 res.sendStatus(200);
//             })
//         } else if (keys.includes("timediff")) {
//             let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
//             sql.requestRaw(`select ((select ((round(date_part('epoch', now() ) ) * 1000 ) ) ) - (select lastadvicetime FROM public.user WHERE name='${username}') )/ 1000`,
//                 function (data) {
//                     res.set('Content-Type', 'application/json');
//                     res.send(data);
//                 });
//         } else if (keys.includes("date")) {

//             let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
//             sql.requestRaw(`UPDATE user SET lastadvicetime=${new Date().getTime()} WHERE name='${username}';`, function (data) {
//                 res.sendStatus(200);
//             })
//         }
//     } else {
//         let username = "admin"; //NOTE(DanoB) Ked bude login fixnut
//         sql.requestRaw(`SELECT quote FROM public.advice WHERE id=(SELECT (SELECT curadvice FROM public.user WHERE name='${username}') % (SELECT COUNT(*) FROM public.advice) + 1);`, function (data) {
//             res.set('Content-Type', 'application/json');
//             res.send(data);
//         })
//     }
// });

module.exports = router