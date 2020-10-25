const express = require('express');
const { saveUser, verifyUser } = require('../controllers/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('loginPage', { title: 'Login' })
});

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res);

    return status ? res.redirect('/') : res.redirect('*');

});

router.post('/logout', (req, res) => {
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('registerPage', { title: 'Register' })
})

router.post('/register', async (req, res) => {
    await saveUser(req, res);

    return res.redirect('/');

})


module.exports = router;
