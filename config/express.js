const express = require('express');
const exphbs = require('express-handlebars');


function setupExpress(app) {
    app.engine('hbs', exphbs.engine({
        extname: 'hbs' }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));
}

module.exports = setupExpress;