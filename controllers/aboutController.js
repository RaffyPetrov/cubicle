const { Router } = require('express');

const router = Router();

//products
router.get('/', (req, res) => {
    res.render('about', { layout: false });
});




module.exports = router;
