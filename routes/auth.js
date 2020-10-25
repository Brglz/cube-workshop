const { Router } = require('express');
const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('loginPage', { title: 'Login' })
});

router.post('/login', (req, res) => {


    res.redirect('/');
});

router.post('/logout', (req, res) => {
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('registerPage', { title: 'Register' })
})

router.post('/register', (req, res) => {


    res.redirect('/login');
})


module.exports = router;
