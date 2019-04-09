function select() { //NOTE(DanoB) Changes the options in form select
    let el = $("form #radio-data");

    if (!$("form input[type=checkbox]").is(':checked')) {
        el.html(`\
            <div class='radio-box'>\
            <input checked="checked" id="food" type="radio" name="category" value="food" />\
            <label class='label img' for='food'><img src='img/pizza.svg'></label>\
            <input id="books" type="radio" name="category" value="books" />\
            <label class='label img' for='books'><img src='img/books.svg'></label>\
            <input id="sweets" type="radio" name="category" value="sweets" />\
            <label class='label img' for='sweets'><img src='img/candy.svg'></label>\
            <input id="toys and games" type="radio" name="category" value="toys and games" />\
            <label class='label img' for='toys and games'><img src='img/video-game.svg'></label>\
            <input id="gifts" type="radio" name="category" value="gifts" />\
            <label class='label img' for='gifts'><img src='img/gift.svg'></label>\
            <input id="fun" type="radio" name="category" value="fun" />\
            <label class='label img' for='fun'><img src='img/party.svg'></label>\
            </div>\
            `);

    } else {
        el.html(`\
            <div class='radio-box'>\
            <input checked="checked" id="pocketMoney" type="radio" name="category" value="pocketMoney" />\
            <label class='label img' for='pocketMoney'><img src='img/money-wings.svg'></label>\
            <input id="gift" type="radio" name="category" value="gift" />\
            <label class='label img' for='gift'><img src='img/gift.svg'></label>\
            <input id="chores" type="radio" name="category" value="chores" />\
            <label class='label img' for='chores'><img src='img/chores.svg'></label>\
            </div>\
            `);
    }
}

$(function() {
    let _ = function(e) {
        if (e.which === 1) {
            this.click();
            console.log("here");
            
        }
    }
    $(".apple-switch").on("mousedown", _);
    $(".apple-switch").on("mouseup", _);
});