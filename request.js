const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();
client.query('SELECT * FROM spending;', (err, res) => {
    if (err) throw err;
    console.log(res.rows)
    client.end();
  });
module.exports = 'prezil som';