const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const router = Router();
const { validateProduct } = require('./helpers/productHelpers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/', (req, res) => {
    productService.getAll(req.query)
    .then(products => {
        res.render('home', {title: 'Browse', products });
    })
    .catch(() => res.status(500).end())
    
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', {title: 'Create'});
});


router.post('/create', isAuthenticated, (req, res, next) => {
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
        // .catch(next);
});



router.get('/details/:productId', async(req, res) => {
    let product =  await productService.getOneWithAccessories(req.params.productId);
    res.render('details', {title: 'Product Details', product });
});

router.get('/:productId/attach', isAuthenticated, async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);

    
    res.render('attachAccessory', {product, accessories});
}); 

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`));
});


router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);
        });
});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (req.user._id != product.creator) {
                res.redirect('/products')
            } else {
                res.render('deleteCube', product);
            }
            
        });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (!product.creator.equals(req.user._id)) {
                res.redirect('/products');
                return;
            }

            return productService.deleteOne(req.params.productId)
        })
        .then(response => {
            if (response) {
                res.redirect('/products');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });

});

module.exports = router;
