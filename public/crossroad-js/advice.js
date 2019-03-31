function getAdvice(cb) {
    $.ajax({
        "url": "/advice",
        "contentType": "application/json",
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