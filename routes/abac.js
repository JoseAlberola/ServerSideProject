const express = require('express');
const { readMenu  } = require('../models/menu');
const router = express.Router();

var aplication= {}

router.get('/', async (req, res) => {
    const menus = await readMenu();
    res.render('listingmenu', { menulist: menus })
});

router.get('/jose',  (req, res) => {
    res.type('text/plain');
    res.send('I\'m Jose.');
});

router.get('/careers',  (req, res) => {
    res.render('personform');
});

router.post('/apply', (req, res) => {
    console.log("Data sent via post");
    console.table(req.body);
    aplication = req.body;
    res.redirect(303, 'personadded')
})

router.get('/personadded', (req, res) => { 
    res.render('personadded', {aplication: aplication})
})

router.get('/:name', async (req, res) => {
    var name = req.params.name;
    const menu = await readMenu({'name': name})
    if(!menu){
        console.log('404 because person doesn\'t exist');
        res.status(404);
        res.render('404');
    }else{
        res.render('menu', { menu: menu })
    }
})

module.exports = router;