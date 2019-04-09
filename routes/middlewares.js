/**
 * @file Custom express.js middlewares
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */
const sql = require("./../sql");
const errorResponses = require("./errorresponses");

module.exports = {
    authorize: (req, res, next) => {
        if (req.user){
            next()
        } else {
            res.redirect("/");
        }
    },
    adminAuthorize: (req, res, next) => {
        sql.query(`SELECT groupid FROM groupusers WHERE userid='${req.user.id}';`, (res2) => {
            let admin = false;
            for (let row of res2.rows) {
                if (row.groupid === 1){
                    admin = true;
                    break;
                }
            }
            if (admin){
                next()
            } else {
                errorResponses(403, req, res);
            }
        })
    },
    sql: {
        crossroadTips: (req, res, next) => {
            sql.query(`SELECT advice FROM advice WHERE id=(SELECT currentadvice FROM useradvicedata WHERE userid='${req.user.id}');\
            UPDATE useradvicedata SET currentadvice=(SELECT(SELECT(SELECT currentadvice) % (SELECT COUNT(*) FROM advice))+1) WHERE userid='${req.user.id}';`, (res2) => {
                req.toEjs = { adviceContent: res2[0].rows[0].advice };
                next();
            }, (err) => {
                console.log("error in crossroadTips middleware:",err);
                req.toEjs = { adviceContent: "" };
                next();
            })
        }
    }
}