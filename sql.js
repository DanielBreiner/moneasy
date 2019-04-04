const { Pool } = require('pg');
const keys = require("./config/keys")

function connect() {
    return new Pool({
        connectionString: process.env.DATABASE_URL || keys.postgres.connectionString,
        ssl: true,
    });
}

module.exports = {
    "insert": require("./sql/insert.js")(connect),
    "request": require("./sql/request.js")(connect),
    "requestAll": require("./sql/requestAll.js")(connect),
    "requestRaw": require("./sql/requestRaw.js")(connect),
    "insertGoal": require("./sql/insertGoal.js")(connect)
}