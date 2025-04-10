const express = require('express');
const exphbs = require('express-handlebars');


function setupExpress(app) {
    app.engine('hbs', exphbs.engine({
        extname: 'hbs',
        layoutsDir: 'views/layouts',
     }));

    app.set('view engine', 'hbs');


    app.use(express.static('public'));

    app.use(express.urlencoded({ extended: true}));
}

module.exports = setupExpress;