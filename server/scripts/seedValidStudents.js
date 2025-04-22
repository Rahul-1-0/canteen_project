const mongoose = require('mongoose');
require('dotenv').config();

// Load the ValidStudents model
const ValidStudent = require('../models/ValidStudents');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  const students = [
    {
      admissionNumber: "IT23C007",
      branch: "IT",
      section: "C",
      course: "B.Tech"
    },
    {
      admissionNumber: "CS22B012",
      branch: "CSE",
      section: "B",
      course: "B.Tech"
    },
    {
      admissionNumber: "EC21A045",
      branch: "ECE",
      section: "A",
      course: "B.Tech"
    },
    {
      admissionNumber: "ME20B010",
      branch: "ME",
      section: "B",
      course: "B.Tech"
    },
    {
      admissionNumber: "IT23D003",
      branch: "IT",
      section: "D",
      course: "B.Tech"
    },
    {
      admissionNumber: "CS22C021",
      branch: "CSE",
      section: "C",
      course: "B.Tech"
    }
  ];

  try {
    await ValidStudent.insertMany(students, { ordered: false });
    console.log("🎉 Multiple valid students inserted successfully!");
  } catch (err) {
    if (err.code === 11000) {
      console.log("⚠️ Some students already exist. Skipped duplicates.");
    } else {
      console.error("❌ Error inserting students:", err.message);
    }
  } finally {
    mongoose.disconnect();
  }
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
