const express = require('express');
const errorHandler = require('./middlewares/errorHandler.js')


const config = require('./config/index.js');
const routes = require('./routes.js');

const app = express();

require('./config/express.js')(app);
require('./config/mongoose.js')(app);

app.use(routes);
app.use(errorHandler);




app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});     
