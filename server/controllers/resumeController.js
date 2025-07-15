const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
  try {
    const resumeData = req.body;
    resumeData.userId = req.userId; // Add user ID from auth middleware
    
    // Create or update resume
    let resume;
    if (resumeData._id) {
      resume = await Resume.findByIdAndUpdate(resumeData._id, resumeData, { new: true });
    } else {
      resume = await Resume.create(resumeData);
    }
    
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: "Error saving resume", error: err.message });
  }
};