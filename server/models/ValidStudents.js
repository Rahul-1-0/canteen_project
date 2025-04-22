const mongoose = require('mongoose');

const validStudentSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true, unique: true },
  branch: String,
  section: String,
  course: String
});

module.exports = mongoose.model('ValidStudent', validStudentSchema);
