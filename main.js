const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const path = require('path');
if(!process.env.moneasy){
    var keys = require("./config/keys");
}
const config = require("./config/config");
require("./passport"); //NOTE(DanoB) Initializing passport  

const app = express();

//middleware for public/static files
app.use(express.static(path.join(__dirname, 'public'))); //REVIEW(DanoB) Do we have to use path here?

//REVIEW(DanoB) How many of these middlewares do we really need?
//post body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
//Bodyparser
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

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

//REST API and its routing
app.use('/rest', require('./routes/rest'));

//routes
app.use('/', require('./routes/router'));
app.use("*", (req, res) => { res.sendStatus(404); }) //NOTE(DanoB) When no other route is found, send status 404 (not found)

const PORT = process.env.PORT || config.server.port;
app.listen(PORT, console.log(`Server started. http://localhost:${PORT}`));
