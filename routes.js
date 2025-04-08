const { Router } = require('express');

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');

const router = Router();

router.use('/', homeController);
router.use('/products', productController);

router.get('/{*any}', (req, res) => {
    res.render('404', {layout: false});
});

module.exports = router;