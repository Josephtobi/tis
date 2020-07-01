const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose')
const Post = require('./post-controller/conference-controller')
const Applicant = require('./post-controller/registeration-controller')
mongoose.connect('mongodb+srv://Theulsis:'+process.env.PASSKEY+'@colloquium-data-qe7ip.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to DB 1')
})
.catch((err)=>{
  console.log(err)
})

mongoose.connect('mongodb+srv://chani:'+process.env.PASSKEY+'@cluster0-6j3ia.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to DB 2')
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


app.get('/join',(req, res, next) => {
    res.render('join');
});

app.get('/team',(req, res, next) => {
  res.render('team');
});

app.get('/gallery',(req, res, next) => {
  res.render('gallery');
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

app.post('/join',(req, res, next) => {
    const applicant = new Applicant({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Department: req.body.Department,
        Level: req.body.Level,
        Skills: req.body.Skills,
        Internship: req.body.Internship,
        Competition: req.body.Competition,
      });
      console.log(applicant)
      applicant.save()
      .then(()=>{
        console.log(chalk.blueBright('Saved  new applicant !, ID: '+ applicant._id))
      })
      .catch()
    res.render('about');
});



app.use('/about',(req, res, next) => {
    res.render('about');
});



app.use('/',(req, res, next) => {
    res.redirect('/home');
    
});



app.listen(port);


