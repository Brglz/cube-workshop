const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const { getUserStatus } = require('../controllers/user');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube Workshop',
        cubes,
        isLogged: req.isLogged
    })

    console.log(req.isLogged);

});

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', { title: 'About  | Create Workshop', isLogged: req.isLogged });
})

router.get('*', getUserStatus, (req, res) => {
    res.render('404', { title: 'Page Not Found', isLogged: req.isLogged });
})


module.exports = router;