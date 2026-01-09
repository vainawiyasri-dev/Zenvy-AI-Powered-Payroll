const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "EMPLOYEE"
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  salary: {
    type: Number,
    default: 30000
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
