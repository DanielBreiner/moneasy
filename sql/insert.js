var client;

function main(c){
    client = c;
    return insert;
}

async function insert(table, data, callback){

    await client.connect();    
    client.query(`INSERT INTO public.${table} VALUES ('${data["name"]}', ${data["amount"]}, '${data["note"]}', ${data["date"]}, '${data["category"]}');`, (err, res) => {
        if (err) throw err;
        callback(res.rowCount == 1);
        client.end();
    });

    console.log(table, data);
    callback()
}

module.exports = main;