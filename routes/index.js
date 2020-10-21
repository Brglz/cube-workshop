const { Router } = require('express');
const { getAllCubes, getCube } = require('../controllers/cubes');
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

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create  | Create Workshop' });
})

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const cube = new Cube({ name, description, imageUrl, difficultyLevel });
    cube.save((err) => {
        if (err) {
            console.error(err);
            throw err
        }
        res.redirect('/')
    });

})

router.get('/details/:id', async (req, res) => {
    const cube = await getCube(req.params.id);
    console.log(cube);
    res.render('details', { title: 'Details | Create Workshop', ...cube });
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})


module.exports = router;