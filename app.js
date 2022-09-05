const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("./post-controller/conference-controller");
const Applicant = require("./post-controller/registeration-controller");
const TeamsData = require("./db/teams.db");
const SliderData = require("./db/slider.db");

mongoose
  .connect(
    "mongodb+srv://Theulsis:" +
      process.env.PASSKEY +
      "@colloquium-data-qe7ip.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB 1");
  })
  .catch((err) => {
    console.log(err);
  });



const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/home", (req, res, next) => {
  res.render("home", {
    sliders: SliderData,
  });
});

app.get("/events", (req, res, next) => {
  res.render("events");
});

app.get("/register", (req, res, next) => {
  res.render("register");
});

app.get("/join", (req, res, next) => {
  res.render("join");
});

app.get("/team", (req, res, next) => {
  res.render("team", { teams: TeamsData });
});

app.get("/gallery", (req, res, next) => {
  res.render("gallery");
});

//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
app.post("/register", (req, res, next) => {
  const post = new Post({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Gender: req.body.Gender,
    Nationality: req.body.Nationality,
    Media: req.body.Media,
    Referral: req.body.Referral,
    Status: req.body.Status,
    School: req.body.School,
    Department: req.body.Department,
    Level: req.body.Level,
    Industry: req.body.Industry,
    Expectation: req.body.Expectation,
  });
  post
    .save()
    .then((response) => {
      res.render("events");
      // using Twilio SendGrid's v3 Node.js Library
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.MAILER);
      const msg = {
        to: req.body.Email,
        from: "ulsisinfo@gmail.com",
        subject: "Colloquium registeration",
        text: "Your application for The Colloquium 2020 was successful, you will recieve further information from us concerning attendance",
        html: "<strong>Your application for The Colloquium 2020 was successful, you will recieve further information from us concerning attendance</strong> ",
      };
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(error));
});

app.post("/join", (req, res, next) => {
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
  console.log(applicant);
  applicant
    .save()
    .then(() => {
      res.render("about");
      // using Twilio SendGrid's v3 Node.js Library
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.MAILER);
      const msg = {
        to: req.body.Email,
        from: "ulsisinfo@gmail.com",
        subject: "TIS Application",
        text: "We have recieved your application. It will be reviewed and your status communicated to you. Thank you for your interest in The Investment Society.",
        html: "<strong>We have recieved your application. It will be reviewed and your status communicated to you. Thank you for your interest in The Investment Society.</strong> ",
      };
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    })
    .catch();
});

app.use("/about", (req, res, next) => {
  res.render("about");
});

app.use("/", (req, res, next) => {
  res.redirect("/home");
});

app.listen(port);
