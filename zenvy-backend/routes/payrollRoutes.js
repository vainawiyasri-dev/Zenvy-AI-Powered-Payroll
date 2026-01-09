const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {
  runPayroll,
  getPayrollsForHR,
  getPayrollsForEmployee
} = require("../controllers/payrollController");

router.use(auth);

// HR/Admin routes
router.post("/run", role("HR", "ADMIN"), runPayroll);
router.get("/", role("HR", "ADMIN"), getPayrollsForHR);

// Employee self route
router.get("/me", role("EMPLOYEE"), getPayrollsForEmployee);

module.exports = router;
