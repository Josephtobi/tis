const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Post = require('./post-controller/conference-controller')
mongoose.connect('mongodb+srv://Theulsis:'+process.env.PASSKEY+'@colloquium-data-qe7ip.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
  console.log('e don connect !')
})
.catch((err)=>{
  console.log(err)
})

const port = process.env.PORT || 3000;




app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use('/home',  (req, res, next) => {
    res.render('home', {});
});

app.get('/events',(req, res, next) => {
    res.render('events');
});

app.get('/register',(req, res, next) => {
    res.render('register');
});

app.post('/register',(req, res, next) => {
    const post = new Post({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        School: req.body.School,
        Department: req.body.Department,
        Level: req.body.Level
      });
      post.save();
    res.render('events');
});



app.use('/about',(req, res, next) => {
    res.render('about');
});



app.use('/',(req, res, next) => {
    res.redirect('/home');
    
});



app.listen(port);


