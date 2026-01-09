const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", index: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["ADMIN", "HR", "EMPLOYEE"] }
});

module.exports = mongoose.model("User", userSchema);
