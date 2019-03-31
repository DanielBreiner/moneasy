function getUserCurAdvice(cb) {
    $.ajax({
        "url": "/advice",
        "contentType": "application/json",
        "success": function (res) {
            if ("curadvice" in res[0]){
                cb(res[0]["curadvice"])
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
                cb(res[0].quote)
            }
        }
    });
}