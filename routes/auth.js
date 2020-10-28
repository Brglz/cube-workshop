const express = require('express');
const { saveUser, verifyUser, guestAccess, getUserStatus, authAccessJSON } = require('../controllers/user');
const router = express.Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', { title: 'Login', isLogged: req.isLogged })
});

router.post('/login', guestAccess, getUserStatus, async (req, res) => {
    const error = await verifyUser(req, res);
    console.log('error', error);
    if (error.error) {
        console.log('rendering error page login');
        return res.render('loginPage', {
            error: 'Username or password is not correct'
        })
    }
    console.log('redirecting');
    res.redirect('/')
});

router.get('/logout', (req, res) => {
    res.clearCookie('aid')

    res.redirect('/')
})

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    res.render('registerPage', { title: 'Register', isLogged: req.isLogged })
})

router.post('/register', async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
        return res.render('registerPage', { title: 'Register', error: 'Invalid username or password' })
    }
    const { error } = await saveUser(req, res);
    if (error) {
        return res.render('registerPage', { title: 'Register', error: 'Invalid username or password' })
    };
    return res.redirect('/');
})


module.exports = router;
