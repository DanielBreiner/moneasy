const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://ihzcdzutvpzmke:cd33226578fe2baf2a26655d13f65a1fc570ab4018a1d319ab61eb8321fc445f@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d4d1ci2ao6kktu",
  ssl: true,
});

client.connect();
client.query('SELECT * FROM public.spending;', (err, res) => {
    if (err) throw err;
    console.log(res.rows)
    client.end();
  });
module.exports = router;