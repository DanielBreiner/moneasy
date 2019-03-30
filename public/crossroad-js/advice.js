function getAdvice() {
    $.ajax({
        "url": "/advice",
        "contentType": "application/json",
        "success": function (res) {
            if (res === "false"){
                console.log("false");
            }
        }
    });
}