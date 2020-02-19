const getDb = require('../database').getDb;
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

class workshopEntry{
    constructor(FirstName, LastName, Email, Phone, School, Department, Level, Class, Reason){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Phone = Phone;
        this.School = School;
        this.Department = Department;
        this.Level = Level;
        this.Class = Class;
        this.Reason = Reason;
    }

    save(){
        const db = getDb();
        db.collection('workshopEntries')
        .insertOne(this)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        res.redirect('/submitted');
    }
}

exports.postFunction = (req, res, next) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    const School = req.body.School;
    const Department = req.body.Department;
    const Level = req.body.Level;
    const Class =  req.body.ClassType;
    const Reason =  req.body.Reason;
    
    const entry = new conferenceEntry(FirstName,
        LastName,Email, Phone, School, Department, Level, Class, Reason);

        entry
        .save()
        .then(res => {console.log('done');
        return transporter.sendMail({
            to: Email,
            from: 'TheExpeditionTeam',
            subject: 'Workshop registeration',
            html:`<img src="https://i.ibb.co/YymR8xM/logo1.png" border="0" alt="logo" width="150px" height="auto">
            <p><span style="color: rgb(240, 4, 0);">Congratulations</span>, ${FirstName}.</p> <p>You have succesfully signed up for The Expedition workshop and will be updated accordingly.</p>`
          });})
        .catch(err => console.log(err))
    res.redirect('/submitted');}



exports.workshopEntry = workshopEntry;