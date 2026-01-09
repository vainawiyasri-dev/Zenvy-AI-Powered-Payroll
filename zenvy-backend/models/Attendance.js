const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", index: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  daysPresent: Number,
  month: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
