const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));



http.createServer(app);


app.use('/home',  (req, res, next) => {
    res.render('home', {});
});


app.use('/register',(req, res, next) => {
    res.render('register');
});

app.use('/gallery',(req, res, next) => {
    res.render('gallery');
});

app.use('/about',(req, res, next) => {
    res.render('about');
});

app.use('/partners',(req, res, next) => {
    res.render('partners');
});

app.use('/',(req, res, next) => {
    res.render('home');
});






app.listen(8000);