
function get() {
    $.ajax({
        "url": "/sql",
        "contentType": "application/json",
        "success": function (res) {
            let table = $("#expenses tbody").html("");
            piechart(res)
            res.forEach(function (item) {
                let dateUse = new Date(Number(item["date"]));
                classes = [];
                if (item["spent"] < 0) classes.push("spend");
                if (item["id"]) classes.push("id" + item["id"]);
                table.append(`\
                    <tr ${(classes.length>0) ? `class="${classes.join(" ")}"`: '' }>\
                        <td>${dateUse.getDate() + "." + dateUse.getMonth()+1 + "." + dateUse.getFullYear()}</td>\
                        <td>${item["spent"] + " €"}</td>\
                        <td>${item["category"]}</td>\
                        <td>${item["note"]}</td>\
                        <td><a class='link'>X</a></td>\
                    </tr>\
                    `)
            });
        }
    });
}

function post() {
    let data = {};
    $('form').serializeArray().forEach(function (item) {
        if (item) {
            data[item["name"]] = item["value"];
        }
    });
    if ($("form input[type=checkbox]").is(":checked")) {
        data["credit"] = true;
    } else {
        data["credit"] = false;
    }
    console.log(data);
    

    $.ajax({
        "url": "/sql",
        "method": "POST",
        "content-type": "application/json",
        "data": data,
        "success": function (res) {
            console.log(res);
            
            if (res) {
                $("form").trigger("reset");
                get();
                //NOTE(DanoB) Sem pridat spatnu vazbu ze sa PODARILO
            } else {
                console.log(res)
                //NOTE(DanoB) Sem pridat spatnu vazbu FAIL
            }
        }
    });
}

function del() {
    
    $.ajax({
        "url": "/sql",
        "method": "DELETE",
        "content-type": "application/json",
        "data": data,
        "success": function (res) {
            console.log(res);
        }
    });
}