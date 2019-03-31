var connect;

function main(c){
    connect = c;
    return insert;
}

function insert(table, data, callback){
    client = connect(); 
    
    client.query(`INSERT INTO public.${table} VALUES ('${data["name"]}', ${data["start"]}, '${data["end"]}', ${data["date"]}, (SELECT (select max(id) from goal) +1));`, (err, res) => {
        if (err) throw err;
        client.end();        
        callback(res.rowCount == 1);
    });
}

module.exports = main;