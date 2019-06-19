/**
 * @file Routing and processing for the admin interface
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const router = require('express').Router();
const middlewares = require("./middlewares");
const sql = require("./../sql");
const userSetup = require("./../usersetup");

router.get("/", middlewares.adminAuthorize, (req, res) => {
    sql.query("SELECT * FROM users;", (data) => {
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
        ${JSON.stringify(data.rows).replace("},{", "}<br>{")}\
        <form action="" method="POST">
            <input name="removeUser" placeholder="remove user by id">
            <button action="submit">Submit</button>
        </form>
    </body>\
    </html>`);
    });
});

router.post("/", middlewares.adminAuthorize, (req, res) => {
    if (req.body.removeUser) {
        sql.query(`DELETE FROM users WHERE id='${req.body.removeUser}'`);
        userSetup.remove(req.body.removeUser);
        res.redirect("/admin");
    }
});

module.exports = router;