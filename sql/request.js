var client;

function main(c){
    client = c;
    return request;
}

async function request(table, columns = null, callback){
    await client.connect();
    client.query(`SELECT ${(columns) ? columns.join(",") : "*"} FROM public.${table};`, (err, res) => {
        if (err) throw err;
        client.end();
        callback(res.rows)
    });
}
module.exports = main;