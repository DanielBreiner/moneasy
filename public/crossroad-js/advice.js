function getUserCurAdvice(cb) {
    
    $.ajax({
        "url": "/advice",
        "contentType": "application/json",
        "success": function (res) {
            if (typeof res === "number"){
                cb(res);
            }
        }
    });
}

function getAdvice(num, cb) {
    $.ajax({
        "url": "/advice",
        "method": "GET",
        "contentType": "application/json",
        "data": {"advice": num},
        "success": function (res) {
            if ("quote" in res[0]){
                cb(res[0].quote);
            }
        }
    });
}

function readAdvice(){
    $.ajax({
        "url": "/advice",
        "method": "GET",
        "contentType": "application/json",
        "data": {"read": 1}
    });

}