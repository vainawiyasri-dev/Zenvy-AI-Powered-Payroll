const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors({ origin: "https://zenvy-aipayroll.netlify.app" }));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/payroll", require("./routes/payrollRoutes"));

app.use(require("./middlewares/errorMiddleware"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


