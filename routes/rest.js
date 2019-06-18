/**
 * @file REST API and its routing
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const router = require('express').Router();
const middlewares = require("./middlewares");
const sql = require("../sql");

router.post("/spending", middlewares.authorize, (req, res) => {
    if (req.body.amount && req.body.category) {
        sql.query(`\
            INSERT INTO spending (userid, amount, note, category)\
            SELECT '${req.user.id}', '${req.body.amount}', '${req.body.note}', id\
            FROM category\
            WHERE name='${req.body.category}';`,
            (data) => {
                res.send(true);
            }
        );
    }

    //     } else if(req.body.end && req.body.currentMoney){
    //         let name = 'admin' //NOTE(DanoB) Replace when login is working
    //         let date = new Date().getTime();
    //         let end = req.body.end;
    //         let start = req.body.currentMoney;
    //         let note = req.body.name;
    //         sql.insertGoal(
    //             "goal",
    //             {
    //                 "user": "admin",
    //                 "start": start,
    //                 "end": end,
    //                 "date": date,
    //                 "note": note,
    //             },
    //             function (succ) {
    //                 if (succ) {
    //                     res.send(succ)
    //                 }
    //             }
    //         );

    //     }
    else {
        res.sendStatus(500);
    }
});

router.delete('/spending', middlewares.authorize, (req, res) => {
    if (req.body.id) {
        sql.query(`DELETE FROM spending WHERE userid='${req.user.id}' AND id=${req.body.id};`, function () {
            res.send(true);
        });
    }

});

router.get('/spending', middlewares.authorize, (req, res) => {
    // if (req.query.goal){
    //     sql.requestRaw("SELECT * FROM public.goal ORDER BY date DESC;", function (data) {
    //         res.set('Content-Type', 'application/json');
    //         res.send(data);
    //     })
    // }
    //     // sql.requestRaw("select (((round(date_part('epoch', now() ) ) )::bigint - ((round(date_part('epoch', now() ) ) )::bigint % 84000) ) / 84000) = ((1554020793558/1000 - (1554020793558/1000 % 84000))/ 84000)", function(data)) //NOTE(Is today)

    // else {
    sql.query(`SELECT amount,note,category,date,id FROM spending WHERE userid='${req.user.id}' ORDER BY date DESC;`, function (data) {
        res.set('Content-Type', 'application/json');
        res.send(data.rows);
    })
    // }
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