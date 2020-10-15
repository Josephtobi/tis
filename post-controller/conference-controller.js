const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  Email: {type: String, required: true},
  Phone: {type: String, required: true},
  Gender: {type: String, required: true},
  Nationality: {type: String, required: true},
  Media: {type: String, required: true},
  ref: {type: String},
  Status: {type: String, required: true},
  School: {type: String},
  Department: {type: String},
  Level: {type: String},
  Industry: {type: String},
  Expectation: {type: String}
});


module.exports = mongoose.model('Post', postSchema);

