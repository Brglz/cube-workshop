const express = require('express');

const router = express.Router();

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
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', { title: 'Details | Create Workshop', ...cube, isNotEmpty: cube.accessories.length !== 0 });
})

router.get('/delete/:id', (req, res) => {
    res.render('deleteCubePage', { title: 'Delete' })
})

router.post('/delete/:id', (req, res) => {
    res.redirect('/')
})

router.get('/edit/:id', (req, res) => {
    res.render('editCubePage', { title: 'Delete' })
})

router.post('/edit/:id', (req, res) => {
    res.redirect('/details/:id')
})



module.exports = router;