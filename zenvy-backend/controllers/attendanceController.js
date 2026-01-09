const Attendance = require("../models/Attendance");
const logAudit = require("../utils/auditLogger");

// HR adds attendance
exports.addAttendance = async (req, res) => {
  const { employeeId, daysPresent, month } = req.body;

  const record = await Attendance.create({
    company: req.user.company,
    employee: employeeId,
    daysPresent,
    month
  });

  await logAudit(req.user.company, "Attendance Added", req.user.id);

  res.status(201).json(record);
};

// HR / ADMIN view all attendance
exports.getAttendance = async (req, res) => {
  const data = await Attendance.find({
    company: req.user.company
  }).populate("employee", "name");

  res.json(data);
};

// EMPLOYEE view own attendance
exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({
    employee: req.user._id,   // ✅ FIXED
    company: req.user.company
  });

  res.json(records);
};