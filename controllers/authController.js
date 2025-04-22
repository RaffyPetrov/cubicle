const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/index.js');
const validator = require('validator');
const { body, validationResult } = require('express-validator');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');


router.get('/login', isGuest, (req, res) => { 
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;


    console.log('Login form submission:', req.body);
    try {

        let token = await authService.login({username, password});

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch(error) {
        console.log(error);
        res.render('login', {error});
    }
});

router.get('/register', isGuest, (req, res) => { 
    res.render('register');

});


router.post('/register', 
    isGuest,
    // body('email', 'Your email is not valid').isEmail().normalizeEmail(),
    // body('username', 'Specify  username').notEmpty(),
    // body('password', 'Password too short').isLength({min: 5}),

    async (req, res) => {
    const {username, password, repeatPassword} = req.body;
    console.log('Register form submission:', req.body); 
    
    // let isStrongPassword = validator.isStrongPassword(password, { 
    //     minLength: 8, 
    //     minLowercase: 1, 
    //     minUppercase: 1, 
    //     minNumbers: 1,
    //     minSymbols: 1
    // });

    if (password !== repeatPassword) {
        return res.render('register', { error: {message: 'Password missmatch!'} });
    }


    // let errors = validationResult(req);
    // if (errors.errors.length > 0) {
    //     return res.render('register',  errors);
    // }


    try {
        // if (!isStrongPassword) {
        //     throw 'You should have strong password!';
        // }
        
        let user = await authService.register({ username, password });

        // console.log(user);
        // console.log('User successfully registered:', user);
        res.redirect('/auth/login');
    } catch (err) {
        let error = Object.keys(err?.errors).map(x => ({ message: err.errors[x].properties.message}))[0];
        // console.log(errors);
        res.render('register', {error});
        
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
}); 

module.exports = router;