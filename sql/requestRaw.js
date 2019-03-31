var connect;

function main(c) {
    connect = c;
    return requestRaw;
}

function requestRaw(query, callback) {
    client = connect();

    client.query(query, (err, res) => {
        if (err) throw err;
        client.end();
        callback(res.rows);
    });
}
module.exports = main;