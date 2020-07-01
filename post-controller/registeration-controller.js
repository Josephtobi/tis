const mongoose = require('mongoose');

const applicantSchema = mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  Email: {type: String, required: true},
  Phone: {type: String, required: true},
  Department: {type: String, required: true},
  Level: {type: String, required: true},
  Skills: {type: String, required: true},
  Internship: {type: String, required: true},
  Competition: {type: String, required: true},
});


module.exports = mongoose.model('Applicant', applicantSchema);