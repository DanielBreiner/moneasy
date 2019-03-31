function getUserCurAdvice(cb) {
    $.ajax({
        "url": "/advice",
        "contentType": "application/json",
        "success": function (res) {
            cb(Object.values(res[0])[0]);
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
            cb(res[0]["quote"]);
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