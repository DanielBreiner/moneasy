/**
 * @file Routing and processing for the admin interface
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const router = require('express').Router();
const middlewares = require("./middlewares");
const sql = require("./../sql");

router.get("/", middlewares.adminAuthorize, (req, res) => {
    sql.query("SELECT * FROM users;", (res2) => {
        res.end(`\
    <!DOCTYPE html>\
    <html>\
    <head>\
        <meta charset='utf-8'>\
    </head>\
    <body>\
        <p>You are an administrator.</p>\
        <p>Your user profile: ${JSON.stringify(req.user)}</p>\
        <p>All user profiles:</p>\
        ${JSON.stringify(res2.rows).replace("},{","}<br>{")}
    </body>\
    </html>`)
    });
});

module.exports = router;