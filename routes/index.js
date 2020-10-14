// TODO: Require Controllers...
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home | Create Workshop' });
})

// router.get('/create', (req, res) => {
//     res.render('create'), { title: 'Create Cube | Create Workshop' };
// })

router.get('/about', (req, res) => {
    res.render('about', { title: 'About  | Create Workshop' });
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create  | Create Workshop' });
})

router.get('/details/:id', (req, res) => {
    res.render('details', { title: 'Details | Create Workshop' });
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
})


module.exports = router;