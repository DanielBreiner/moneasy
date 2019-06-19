var currentMoney = 0;

function getBalance() {
    $.ajax({ //NOTE(DanoB) Read advice
        "url": "/rest/balance",
        "contentType": "text/plain",
        "success": function (res) {
            currentMoney = Number(res);
            get();
        }
    });
}

function post() {
    let data = {};
    $('form').serializeArray().forEach((item) => {
        data[item.name] = item.value;
    });
    $("form").trigger("reset");
    $.ajax({
        "url": "/rest/goal",
        "method": "POST",
        "content-type": "application/json",
        "data": data,
        "success": function (res) {
            if (res)
                get();
            //else //TODO(DanoB) Sem pridat spatnu vazbu FAIL
        }
    });
}

function get() {
    $.ajax({
        "url": "/rest/goal",
        "method": "GET",
        "content-type": "application/json",
        "success": function (res) {
            if (res) {
                let wrapper = $('.progress-wrapper').html("");
                res.forEach((item) => {
                    let progress = Math.round(currentMoney / item.goal * 100);
                    progress = (progress < 2) ? 5 : (progress > 98) ? 98 : progress;
                    wrapper.append(`
                        <div class="progress-bar">\
                            <div id="${item.id}" class="progress" style="width: ${progress}%;">\</div>\
                            <div class="progress-end">\
                                <img src="img/wheelbarrow.png">\
                            </div>\
                        </div> \
                        <div class="goal-name">${item.name}</div>`
                    );
                });
            }
            //else //TODO(DanoB) Sem pridat spatnu vazbu FAIL
        }
    });
}