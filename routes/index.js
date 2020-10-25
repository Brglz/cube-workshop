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

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
    })
})

router.post('/create/accessory', async (req, res) => {
    const {
        name, description, imageUrl
    } = req.body;

    const accessory = new Accessory({
        name, description, imageUrl
    });

    await accessory.save();
    res.redirect('/');
})

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories();

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoriesString = acc._id.valueOf().toString();
        return !cubeAccessories.includes(accessoriesString)
    })


    res.render('attachAccessory', {
        title: 'Attach Accessory',
        ...cube,
        accessories: notAttachedAccessories,
        isNotFullyAttached: cube.accessories.length !== accessories.length && accessories.length > 0
    })


})

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body;

    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`);

});

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', { title: 'Details | Create Workshop', ...cube, isNotEmpty: cube.accessories.length !== 0 });
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})


module.exports = router;