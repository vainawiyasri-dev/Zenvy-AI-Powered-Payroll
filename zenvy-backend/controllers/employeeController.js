const User = require("../models/User"); // unified employee/HR/Admin
const SalaryComponent = require("../models/SalaryComponent");
const bcrypt = require("bcryptjs");
const logAudit = require("../utils/auditLogger");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if employee already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Employee already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await User.create({
      name,
      email,
      password: hashed,
      role: "EMPLOYEE",
      company: req.user.company
    });

    // AUTO salary structure (DEFAULT)
    const defaultSalary = {
      baseSalary: 30000,
      hra: 5000,
      bonus: 0,
      deductions: 0
    };

    await SalaryComponent.create({
      company: req.user.company,
      employee: employee._id,
      ...defaultSalary
    });

    await logAudit(req.user.company, `Employee Created: ${employee.name}`, req.user._id);

    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ company: req.user.company, role: "EMPLOYEE" }).select("-password");
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

