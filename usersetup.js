/**
 * @file Async functions for user manipulation.
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const sql = require("./sql");

module.exports = {
    /**
     * @param {number} id Profile id of user
     */
    setup: (id) => {
        sql.query(`INSERT INTO useradvicedata VALUES ('${id}', 1);`);
    },
    /**
     * @param {number} id Profile id of user
     */
    remove: (id) => {
        sql.query(`DELETE FROM useradvicedata WHERE userid='${id}';`);
        sql.query(`DELETE FROM groupusers WHERE userid='${id}';`);
    }
}