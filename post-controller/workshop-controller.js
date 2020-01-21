const fs = require('fs');
 
const ConferenceEntry = function(FirstName, LastName, Email, Phone, School, Department, Level, Class, Reason){
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
exports.postFunction = (req, res, next) => {
const newEntry = new ConferenceEntry(
   req.body.FirstName,
   req.body.LastName,
   req.body.Email,
   req.body.Phone,
   req.body.School,
   req.body.Department,
   req.body.Level,
   req.body.ClassType,
   req.body.Reason
);

   
fs.appendFileSync('./data/dataw.txt', JSON.stringify(newEntry));
    res.redirect('/submitted');
    
};