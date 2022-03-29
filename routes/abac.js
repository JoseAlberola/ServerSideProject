const express = require('express');
const router = express.Router();

var aplication = {}

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

module.exports = router;