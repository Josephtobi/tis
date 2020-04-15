const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  Email: {type: String, required: true},
  Phone: {type: String, required: true},
  School: {type: String, required: true},
  Department: {type: String, required: true},
  Level: {type: String, required: true}
});


module.exports = mongoose.model('Post', postSchema);

