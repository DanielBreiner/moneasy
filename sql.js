/**
 * @file Parent to all postgreSQL functions
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const Client = require('pg').Client;
if(!process.env.moneasy){
    var keys = require("./config/keys");
}

/**
 * Main way to access the SQL database
 * 
 * @param {string} query SQL query
 * @param {function} cb Result callback; 1 parameter: result
 * @param {function} onErr Error callback; 1 parameter: error
 * @returns {void} This is a void function
 */
function query(query, cb, onErr) {
    let client = new Client({
        connectionString: process.env.DATABASE_URL || keys.postgres.connectionString,
        ssl: true,
    });
    client.connect()
    client.query(query)
        .then((res) => { 
            if(cb) cb(res);
        })
        .catch((err) => { 
            if(onErr) onErr(err);
            else throw err;
        })
        .then(() => { client.end(); })
}

module.exports = {
    query: query
};

// const { Pool } = require('pg');

// function connect() {
//     return new Pool({
//         connectionString: process.env.DATABASE_URL || keys.postgres.connectionString,
//         ssl: true,
//     });
// }
// module.exports = {
    // /**
    //  * @deprecated
    //  */
    // connect: connect,
    // /**
    //  * @deprecated
    //  */
    // insert: require("./sql/insert.js")(connect),
    // /**
    //  * @deprecated
    //  */
    // request: require("./sql/request.js")(connect),
    // /**
    //  * @deprecated
    //  */
    // requestAll: require("./sql/requestAll.js")(connect),
    // /**
    //  * @deprecated
    //  */
    // requestRaw: require("./sql/requestRaw.js")(connect),
    // /**
    //  * @deprecated
    //  */
    // insertGoal: require("./sql/insertGoal.js")(connect)
// }