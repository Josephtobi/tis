const fs = require('fs');

const WorkshopEntry = function(FirstName, LastName, Email, Phone, School, Department, Level){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Phone = Phone;
        this.School = School;
        this.Department = Department;
        this.Level = Level;
}
exports.postFunction = (req, res, next) => {
    const newEntry = new WorkshopEntry(
       req.body.FirstName,
       req.body.LastName,
       req.body.Email,
       req.body.Phone,
       req.body.School,
       req.body.Department,
       req.body.Level,
    );

    console.log(newEntry);
    
       
    fs.appendFileSync('./data/datac.txt', JSON.stringify(newEntry));
    res.redirect('/submitted');
};