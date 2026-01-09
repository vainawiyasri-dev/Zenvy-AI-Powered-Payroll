const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    month: {
      type: String,
      required: true
    },
    grossSalary: {
      type: Number,
      required: true
    },
    netSalary: {
      type: Number,
      required: true
    },

    // ✅ AI FIELD 
    leavePrediction: {
      type: String,
      default: "Unknown"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payroll", payrollSchema);
