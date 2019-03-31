function getAdvice(cb) {
    $.ajax({
        "url": "/advice",
        "method": "GET",
        "contentType": "application/json",
        "data": {"timediff": 1},
        "success": function (res) {            
            if (Object.values(res[0])[0]- 60 > 0){ //NOTE(DanoB) New advice every 25 secs.
                $.ajax({ //NOTE(DanoB) Read advice
                    "url": "/advice",
                    "contentType": "application/json",
                    "success": function (res) {
                        cb(res[0]["quote"]);
                    }
                });
                $.ajax({ //NOTE(DanoB) Increment curadvice
                    "url": "/advice",
                    "method": "GET",
                    "contentType": "application/json",
                    "data": {"read": 1}
                });
                $.ajax({ //NOTE(DanoB) Reset date
                    "url": "/advice",
                    "method": "GET",
                    "contentType": "application/json",
                    "data": {"date": 1}
                });
            } else {
                cb(false);
            }
        }
    });
}