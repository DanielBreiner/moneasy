/**
 * @file Async functions for user manipulation.
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const sql = require("./sql");

module.exports = { 
    setup: (profile) => {
        sql.query(`INSERT INTO useradvicedata VALUES ('${profile.id}', 1);`);
    },
    remove: (profile) => {
        sql.query(`DELETE FROM useradvicedata WHERE userid='${profile.id}';`);
    }
}