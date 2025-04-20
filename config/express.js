const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

function setupExpress(app) {
    app.engine('hbs', exphbs.engine({
        extname: 'hbs',
        layoutsDir: 'views/layouts',
     }));

    app.set('view engine', 'hbs');


    app.use(express.static('public'));

    app.use(express.urlencoded({ extended: true}));

    app.use(cookieParser());

    app.use(auth());
}

module.exports = setupExpress;