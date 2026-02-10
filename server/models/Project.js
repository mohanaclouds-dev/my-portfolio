const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  liveLink: String,
  role: String,
  category: String // 'Full Stack', 'AI/ML', etc.
});

module.exports = mongoose.model('Project', ProjectSchema);