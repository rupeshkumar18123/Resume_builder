const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  basicInfo: { name: String, email: String, phone: String, ... },
  education: [{ institution: String, degree: String, ... }],
  experience: [{ company: String, role: String, ... }],
  skills: [String],
  template: { type: String }, // e.g. "modern", "classic"
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Resume", resumeSchema);
