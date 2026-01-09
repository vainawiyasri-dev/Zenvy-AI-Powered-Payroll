const mongoose = require("mongoose");

const salaryComponentSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    index: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  baseSalary: {
    type: Number,
    required: true
  },
  hra: {
    type: Number,
    default: 0
  },
  bonus: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("SalaryComponent", salaryComponentSchema);
