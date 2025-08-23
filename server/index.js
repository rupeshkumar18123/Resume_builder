const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Fix duplicate import
const authRoutes = require("./routes/authRoutes"); // Add this
const resumeRoutes = require("./routes/resumeRoutes"); // Keep this

const app = express();
app.use(cors({ origin: ["http://localhost:3000","http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Add auth routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
//change in port
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

