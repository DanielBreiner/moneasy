var connect;

function main(c){
    connect = c;
    return insert;
}

function insert(table, data, callback){
    client = connect(); 
    client.query(`INSERT INTO public.${table} VALUES ('${data["name"]}', ${data["amount"]}, '${data["note"]}', ${data["date"]}, '${data["category"]}');`, (err, res) => {
        if (err) throw err;
        client.end();        
        callback(res.rowCount == 1);
    });
}

module.exports = main;