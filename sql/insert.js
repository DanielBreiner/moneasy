var connect;

function main(c){
    connect = c;
    return insert;
}

function insert(table, data, callback){
    client = connect(); 
    client.query(`INSERT INTO public.${table} VALUES ('${data["name"]}', ${data["amount"]}, '${data["note"]}', ${data["date"]}, '${data["category"]}', ((SELECT (select max(id) from public.${table}) +1)) , '${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`, (err, res) => {
        if (err) throw err;
        client.end();        
        callback(res.rowCount == 1);
    });
}

module.exports = main;