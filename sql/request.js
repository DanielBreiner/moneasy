var connect;

function main(c){
    connect = c;
    return requestAll;
}

function requestAll(table, callback){
    client = connect();
    console.log(client);
    
    client.query(`SELECT * FROM public.${table};`, (err, res) => {
        console.log("query");
        
        if (err) throw err;
        client.end();
        callback(res.rows);
    });
}
module.exports = main;