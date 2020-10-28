const express = require('express');
const { checkAuthentication, getUserStatus, authAccessJSON } = require('../controllers/user');
const { getCube, updateCube } = require('../controllers/cubes');
const { getAccessories } = require('../controllers/accessories');
const Accessory = require('../models/accessory');

const router = express.Router();

router.get('/create/accessory', checkAuthentication, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLogged: req.isLogged
    })
})

router.post('/create/accessory', authAccessJSON, async (req, res) => {
    const {
        name, description, imageUrl
    } = req.body;

    const accessory = new Accessory({
        name, description, imageUrl
    });

    console.log(accessory, 'ASDSDSDSDSDSDS');
    try {
        await accessory.save()
        return res.redirect('/')
    } catch (error) {
        return res.render('createAccessory', {
            title: 'Create Accessory',
            isLogged: true,
            error: 'Accessory details are not valid'
        });
    }
})

router.get('/attach/accessory/:id', checkAuthentication, getUserStatus, async (req, res) => {
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
        isNotFullyAttached: cube.accessories.length !== accessories.length && accessories.length > 0,
        isLogged: req.isLogged
    })


})

router.post('/attach/accessory/:id', authAccessJSON, async (req, res) => {
    const {
        accessory
    } = req.body;

    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`);

});

module.exports = router;