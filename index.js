const express = require('express');

const config = require('./config/config.js');
const app = express();

require('./config/express.js')(app);

app.get('/', (req, res) => {
    res.render('home', { layout: false});
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});     