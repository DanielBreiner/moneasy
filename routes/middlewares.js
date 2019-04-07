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
        if (req.user.permissions && req.user.permissions.includes("admin")){
            next()
        } else {
            errorResponses(403, req, res);
        }
    },
    sql: {
        crossroadTips: (req, res, next) => {
            sql.query(`SELECT advice FROM advice WHERE id=(SELECT currentadvice FROM useradvicedata WHERE userid='${req.user.id}');\
            UPDATE useradvicedata SET currentadvice=(SELECT(SELECT(SELECT currentadvice) % (SELECT COUNT(*) FROM advice))+1) WHERE userid='${req.user.id}';`, (res2) => {                    
                res.toEjs = { adviceContent: res2[0].rows[0].advice };
                next();
            }, (err) => {
                console.log(err);
                req.toEjs = { adviceContent: "" };
                next();
            })
        }
    }
}