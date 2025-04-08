const { Router } = require('express');

const productController = require('./controllers/productController.js');
const aboutController = require('./controllers/aboutController.js');

const router = Router();

router.use('/about', aboutController);
router.use('/', productController);

module.exports = router;