const express = require('express');

const config = require('./config/config.js');
const routes = require('./routes.js');

const app = express();

require('./config/express.js')(app);

app.use(routes);


app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});     
