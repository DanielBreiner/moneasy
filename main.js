const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require("body-parser");
const app = express();

let path = require('path');

//post body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//midleware for public/static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/routes'));
app.use('/test', require('./routes/routes'));
app.use('/dashboard', require('./routes/routes'));
app.use('/crossroad', require('./routes/routes'));
app.use('/goal', require('./routes/routes'));

//Bodyparser
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started. http://localhost:${PORT}`));

