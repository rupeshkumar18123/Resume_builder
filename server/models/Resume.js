const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  summary: String,
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String
  }],
  experience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [String],
  projects: [{
    title: String,
    link: String,
    description: String
  }],
  certifications: [String],
  hobbies: String,
  template: String,
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Resume", resumeSchema);
