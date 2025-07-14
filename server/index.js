
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
