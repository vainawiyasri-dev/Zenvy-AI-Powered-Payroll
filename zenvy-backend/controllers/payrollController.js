const Employee = require("../models/User"); // Employee is part of User model
const Attendance = require("../models/Attendance");
const { predictLeave, recommendSalary } = require("../utils/aiService");
const SalaryComponent = require("../models/SalaryComponent");
const Payroll = require("../models/Payroll");
const logAudit = require("../utils/auditLogger");

// Run Payroll for all employees in the company for a selected month
exports.runPayroll = async (req, res) => {
  try {
    const companyId = req.user.company;
    const { month } = req.body; // HR sends the month

    if (!month) return res.status(400).json({ message: "Month is required" });

    const employees = await Employee.find({ company: companyId, role: "EMPLOYEE" });
    const payrollsToSave = [];

    for (const emp of employees) {
  const attendance = await Attendance.findOne({
    employee: emp._id,
    company: companyId,
    month
  });

  if (!attendance) continue;

  const salaryComp = await SalaryComponent.findOne({
    employee: emp._id,
    company: companyId
  });

  if (!salaryComp) continue;

  const leavePrediction = predictLeave(attendance.daysPresent);

  const grossSalary =
    salaryComp.baseSalary +
    salaryComp.hra +
    salaryComp.bonus;

  const netSalary =
    (grossSalary / 30) * attendance.daysPresent -
    salaryComp.deductions;

  payrollsToSave.push({
    employee: emp._id,
    company: companyId,
    month,
    grossSalary,
    netSalary,
    leavePrediction
  });
}


    if (payrollsToSave.length === 0) {
      return res.status(400).json({ message: `No payroll to process for ${month}` });
    }

    await Payroll.insertMany(payrollsToSave);
    await logAudit(companyId, `Payroll Run for ${month}`, req.user._id);

    res.json({ message: `Payroll processed successfully for ${month}`, count: payrollsToSave.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to run payroll", error: err.message });
  }
};

// Get Payrolls for HR/Admin
exports.getPayrollsForHR = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ company: req.user.company })
      .populate("employee", "name email");
    res.json(payrolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payrolls" });
  }
};

// Get Payrolls for Employee (self)
exports.getPayrollsForEmployee = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employee: req.user._id })
      .populate("employee", "name email");
    res.json(payrolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payrolls" });
  }
};
