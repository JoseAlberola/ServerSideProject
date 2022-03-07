const express = require('express');
const router = express.Router();

var menus = { 
    "À la carte": { 
        "name": "À la carte",            
        "imageurl": "/images/menu.jpg",        
        },
    "Midweek": {
        "name": "Midweek",
        "imageurl": "/images/menu.jpg",
        "price": "12"
        },
    "Weekend": {
        "name": "Weekend",
        "imageurl": "/images/menu.jpg",
        "price": "18"
        },
    "Children": { 
        "name": "Children",            
        "imageurl": "/images/menu.jpg",
        "price": "10"
        },
    "Tasting": { 
        "name": "Tasting",            
        "imageurl": "/images/menu.jpg",
        "price": "25"
        }
    }

var aplication= {}

router.get('/', (req, res) => {
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

router.get('/:name', (req, res) => {
    var name = req.params.name;
    if(menus[name] == undefined){
        res.status(404);
        res.render('404');
    }else{
        res.render('menu', { menu: menus[name] })
    }
})

module.exports = router;