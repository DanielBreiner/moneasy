/**
 * @file Custom express.js middlewares
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */
const sql = require("./../sql");
const errorResponses = require("./errorresponses");

module.exports = {
    authorize: (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect("/");
        }
    },
    adminAuthorize: (req, res, next) => {
        sql.query(`SELECT groupid FROM groupusers WHERE userid='${req.user.id}';`, (res2) => {
            let admin = false;
            for (let row of res2.rows) {
                if (row.groupid === 1) {
                    admin = true;
                    break;
                }
            }
            if (admin) {
                next()
            } else {
                errorResponses(403, req, res);
            }
        })
    },
    sql: {
        crossroad: (req, res, next) => {
            sql.query(`SELECT advice FROM advice WHERE id=(SELECT currentadvice FROM advice_user_data WHERE userid='${req.user.id}');\
            UPDATE advice_user_data SET currentadvice=(SELECT(SELECT(SELECT currentadvice) % (SELECT COUNT(*) FROM advice))+1) WHERE userid='${req.user.id}';`, (res2) => {
                    req.toEjs = { adviceContent: res2[0].rows[0].advice };
                    next();
                }, (err) => {
                    console.log("error in crossroadTips middleware:", err);
                    req.toEjs = { adviceContent: "" };
                    next();
                })
        },
        dashboard: (req, res, next) => {
            sql.query(`SELECT id,name,type,icon FROM category;`, function (data) {
                let categories = {};
                let expense = [];
                let income = [];
                console.log(data.rows);
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
                req.toEjs = {};
                req.toEjs.categories = categories;
                req.toEjs.expense = expense;
                req.toEjs.income = income;
                next();
            });
        }
    }
}