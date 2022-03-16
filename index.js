const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3000
const home = require('./routes/home')
const abac = require('./routes/abac')
const cookieParser = require('cookie-parser');
const {newsMiddleware} = require('./lib/middleware')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/node_modules/bootstrap/dist')));
app.use(cookieParser("Una is so great"));
app.use(newsMiddleware)
// middleware for parsing the body of Posts
// need this before you can use req.body
app.use(express.urlencoded({ extended: true })) 
app.use('/', home)
app.use('/abac', abac)

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Connection with Mongo
var connectionString = "mongodb://localhost:27017/SSPROJECT";
mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }).
  catch ( error => {
    console.log('Database connection refused' + error);
    process.exit(2);
  })
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  
  db.once('open', () => {
    console.log("DB connected")
});  

// // 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});
// // 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))