const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/index.js');


router.get('/login', (req, res) => { 
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({username, password});

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch(error) {
        console.log(error);
        res.render('login', {error});
    }
});

router.get('/register', (req, res) => { 
    res.render('register');

});


router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;
    console.log('Register form submission:', req.body); 
    
    if (password !== repeatPassword) {
        return res.render('register', { message: 'Passwords do not match!' });
    }

    try {
        let user = await authService.register({ username, password });
        console.log('User successfully registered:', user);
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.render('register', {error});
        
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;