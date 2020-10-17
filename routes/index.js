// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const { getCube } = require('../controllers/database-controller');

const router = Router();

router.get('/', (req, res) => {
    getAllCubes((cubes) => {
        res.render('index', {
            title: 'Cube Workshop',
            cubes
        })
    })
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About  | Create Workshop' });
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create  | Create Workshop' });
})

router.get('/details/:id', (req, res) => {
    getCube(req.params.id, (cube) => {
        res.render('details', { title: 'Details | Create Workshop', ...cube });
    })
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})


module.exports = router;