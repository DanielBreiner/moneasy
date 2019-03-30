const { Pool } = require('pg');

function connect() {
    return new Pool({
        connectionString: process.env.DATABASE_URL || "postgres://ihzcdzutvpzmke:cd33226578fe2baf2a26655d13f65a1fc570ab4018a1d319ab61eb8321fc445f@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d4d1ci2ao6kktu",
        ssl: true,
    });
}

module.exports = {
    "insert": require("./sql/insert.js")(connect),
    "request": require("./sql/request.js")(connect)
}