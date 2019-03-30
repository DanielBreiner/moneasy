var client;

function main(c){
    client = c;
    return requestAll;
}

function requestAll(table, callback){
    client.connect();
    client.query(`SELECT * FROM public.${table};`, (err, res) => {
        if (err) throw err;
        client.end();
        callback(res.rows)
    });
}
module.exports = main;