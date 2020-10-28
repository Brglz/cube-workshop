const express = require('express');
const jwt = require("jsonwebtoken");
const Cube = require('../models/cube')
const { checkAuthentication, getUserStatus, authAccessJSON } = require('../controllers/user');
const { getCubeWithAccessories } = require('../controllers/cubes');

const router = express.Router();

router.get('/create', checkAuthentication, getUserStatus, (req, res) => {
    res.render('create', { title: 'Create  | Create Workshop', isLogged: req.isLogged });
})

router.post('/create', authAccessJSON, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    const token = req.cookies['aid'];
    const decodedObj = jwt.verify(token, 'secret');

    const cube = new Cube({ name: name.trim(), description: description.trim(), imageUrl, difficultyLevel, creatorId: decodedObj.userId });
    try {
        await cube.save()
        return res.redirect('/')
    } catch (error) {
        return res.render('create', { title: 'Create  | Create Workshop', isLogged: req.isLogged, error: 'Cube details are not valid' });
    }

})

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', { title: 'Details | Create Workshop', ...cube, isNotEmpty: cube.accessories.length !== 0, isLogged: req.isLogged });
})

router.get('/delete/:id', checkAuthentication, getUserStatus, (req, res) => {
    res.render('deleteCubePage', { title: 'Delete', isLogged: req.isLogged })
})

router.post('/delete/:id', authAccessJSON, (req, res) => {
    res.redirect('/')
})

router.get('/edit/:id', checkAuthentication, getUserStatus, (req, res) => {
    res.render('editCubePage', { title: 'Delete', isLogged: req.isLogged })
})

router.post('/edit/:id', authAccessJSON, (req, res) => {
    res.redirect('/details/:id')
})



module.exports = router;