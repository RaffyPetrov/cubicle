const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');
const { Router } = require('express');
const accessoryController = require('./controllers/accessoryController');
const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories', accessoryController);

router.get('/{*any}', (req, res) => {
    res.render('404', {layout: false});
});


module.exports = router;