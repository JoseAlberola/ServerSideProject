const express = require('express');
const router = express.Router();

const linksForHome = 
[ {url: 'https://elcaso.elnacional.cat/es/noticias/criticas-duras-abac-restaurante-estrella-michelin-jordi-cruz-insoportable_60199_102.html' , text : 'El Caso'},
{ url: 'https://www.lasprovincias.es/gastronomia/restaurantes/jordi-cruz-abac-precio-20211017184151-nt.html', text : 'Las provincias'}];

router.get('/', function (req, res) {
    var message = "";

    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on: " + dateLastVisit;
    }
    
    var currentDate = new Date();
    res.cookie('tracking', currentDate.toUTCString(), {signed: true});
    
    res.render('home', {'message': message, linkData : linksForHome});
});

router.get('/about',  (req, res) => {
    res.render('about');
});

module.exports = router;