const express = require('express');
const router = express.Router();

var data = { 
    "foil": {
        "name": "foil",
        "dob": "01/01/1998",
        "imageurl": "/images/foilimage1.png",
        "hobbies": ["Jokes", "Gags", "Stand up"]
        },
    "foil1": {
        "name": "foil1",
        "dob": "01/01/2000",
        "imageurl": "/images/foilimage2.png",
        "hobbies": ["Videogames", "Basketball", "Football"]
        },
    "foil2": { 
        "name": "foil2",            
        "imageurl": "/images/foilimage3.png",
        "hobbies": ["Hiking", "Laughing"]
        }
    }

var aplication= {}

router.get('/', (req, res) => {
    res.render('listing', { personlist: data })
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
    if(data[name] == undefined){
        res.status(404);
        res.render('404');
    }else{
        res.render('person', { person: data[name] })
    }
})

module.exports = router;