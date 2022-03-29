const express = require('express');
const { readMenu  } = require('../models/menu');
const router = express.Router();

router.get('/', async (req, res) => {
    const menus = await readMenu();
    res.render('listingmenu', { menulist: menus })
});

router.get('/:name', async (req, res) => {
    var name = req.params.name;
    const menu = await readMenu({'name': name})
    if(!menu){
        console.log('404 because that menu doesn\'t exist');
        res.status(404);
        res.render('404');
    }else{
        res.render('menu', { menu: menu })
    }
})

module.exports = router;