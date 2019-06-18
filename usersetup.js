/**
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const sql = require("./sql");

module.exports = {
    /**
     * Like-constructor for all user data in the database
     * @param {number} id Profile id of user
     */
    setup: (id) => {
        sql.query(`INSERT INTO advice_user_data VALUES ('${id}', 1);`);
    },
    /**
     * Like-deconstructor for all user data in the database
     * @param {number} id Profile id of user
     */
    remove: (id) => {
        sql.query(`DELETE FROM advice_user_data WHERE userid='${id}';`);
        sql.query(`DELETE FROM groupusers WHERE userid='${id}';`);
    }
}