const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conferencePost = require('./post-controller/conference-controller');
const workshopPost = require('./post-controller/workshop-controller');
const port = process.env.PORT || 3000;
const mongoConnection = require('./database');
const mongoConnect = mongoConnection.mongoConnect;
const getDb = mongoConnection.getDb;



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use('/home',  (req, res, next) => {
    res.render('home', {});
});


app.get('/register-c',(req, res, next) => {
    res.render('register-c');
});

app.get('/register-w',(req, res, next) => {
    res.render('register-w');
});

app.post('/register-c', conferencePost.postFunction);

app.post('/register-w', workshopPost.postFunction);

app.get('/submitted',(req, res, next) => {
    res.render('submitted');
    
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

mongoConnect(client => {
console.log(client)
app.listen(port);});


