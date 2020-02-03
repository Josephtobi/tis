const Sequelize = require('sequelize');

const sequelize = require('../database');

const workshopEntries = sequelize.define('workshop-entries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    LastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    School: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Department: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Level: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Class: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    Reason: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

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
    
    workshopEntries.create({
        FirstName : FirstName,
        LastName : LastName,
        Email : Email,
        Phone : Phone,
        School : School,
        Department : Department,
        Level : Level,
        Class: Class,
        Reason: Reason
       }).then(res => console.log(res)).catch(err => console.log(err));
       res.redirect('/submitted');
    };


    

exports.workshopEntries = workshopEntries;