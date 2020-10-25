const { Router } = require('express');
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes');
const { getAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube Workshop',
        cubes
    })

});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About  | Create Workshop' });
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})


module.exports = router;