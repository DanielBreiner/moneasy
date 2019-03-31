function select() { //NOTE(DanoB) Changes the options in form select
    let el = $("form #radio-data");

    if (!$("form input[type=checkbox]").is(':checked')) {
        el.html(`\
            <div class='radio-box'>\
            <input checked="checked" id="food" type="radio" name="categories" value="food" />\
            <label class='label img' for='food'><img src='img/pizza.svg'></label>\
            <input id="books" type="radio" name="categories" value="books" />\
            <label class='label img' for='books'><img src='img/books.svg'></label>\
            <input id="sweets" type="radio" name="categories" value="sweets" />\
            <label class='label img' for='sweets'><img src='img/candy.svg'></label>\
            <input id="toys and games" type="radio" name="categories" value="toys and games" />\
            <label class='label img' for='toys and games'><img src='img/video-game.svg'></label>\
            <input id="gifts" type="radio" name="categories" value="gifts" />\
            <label class='label img' for='gifts'><img src='img/gift.svg'></label>\
            <input id="fun" type="radio" name="categories" value="fun" />\
            <label class='label img' for='fun'><img src='img/party.svg'></label>\
            </div>\
            `);

    } else {
        el.html(`\
            <div class='radio-box'>\
            <input checked="checked" id="pocketMoney" type="radio" name="categories" value="pocketMoney" />\
            <label class='label img' for='pocketMoney'></label>\
            <input id="gift" type="radio" name="categories" value="gift" />\
            <label class='label img' for='gift'></label>\
            <input id="chores" type="radio" name="categories" value="chores" />\
            <label class='label img' for='chores'></label>\
            </div>\
            `);
    }
}