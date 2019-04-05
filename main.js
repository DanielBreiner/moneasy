const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
if(!process.env.moneasy){
    var keys = require("./config/keys");
}

const config = require("./config/config");
require("./passport"); //NOTE(DanoB) Initializing passport

const app = express();

let path = require('path');

//post body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//Login stuff
app.use(cookieSession({
    maxAge: 24*60*60*1000, //NOTE(DanoB) 1 day cookie maxAge
    keys: [process.env.sessionCookieKey || keys.session.cookieKey] //NOTE(DanoB) Cookie hash key
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require("./routes/auth"));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//midleware for public/static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
// app.use('/sql', require('./routes/sql'));
app.use('/', require('./routes/routes'));

//Bodyparser
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//port
const PORT = process.env.PORT || config.server.port;
app.listen(PORT, console.log(`Server started. http://localhost:${PORT}`));
