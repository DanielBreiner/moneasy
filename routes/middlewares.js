/**
 * @file Custom express.js middlewares
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */
const sql = require("./../sql");

module.exports = {
    "authorize": (req, res, next) => {
        if (req.user)
            next()
        else
            res.redirect("/");
    },
    "adminAuthorize": (req, res, next) => {
        sql.query(`SELECT users.group FROM users WHERE id='${req.user.id}';`, (data) => {
            if (data.rows.length === 1 && data.rows[0].group == 1)
                next();
            else
                res.sendStatus(403);
        });
    },
    "sql": {
        "crossroad": (req, res, next) => {
            sql.query(`SELECT advice FROM advice WHERE id=(SELECT currentadvice FROM advice_user_data WHERE userid='${req.user.id}');\
            UPDATE advice_user_data SET currentadvice=(SELECT(SELECT(SELECT currentadvice) % (SELECT COUNT(*) FROM advice))+1) WHERE userid='${req.user.id}';`, (res2) => {
                    req.toEjs = { "adviceContent": res2[0].rows[0].advice };
                    next();
                }, (err) => {
                    console.warn("error in crossroadTips middleware:", err);
                    req.toEjs = { "adviceContent": "" };
                    next();
                })
        },
        "dashboard": (req, res, next) => {
            sql.query(`SELECT id,name,type,icon FROM category;`, function (data) {
                let categories = {};
                let expense = [];
                let income = [];
                data.rows.forEach(function (item) {
                    categories[item.id] = item.name;
                    if (item.type == 1)
                        income.push({
                            "name": item.name,
                            "icon": item.icon
                        });
                    else if (item.type == 2)
                        expense.push({
                            "name": item.name,
                            "icon": item.icon
                        });
                });
                req.toEjs = {
                    "categories": categories,
                    "expense": expense,
                    "income": income
                };
                next();
            });
        }
    }
}