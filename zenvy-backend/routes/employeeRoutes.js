const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {
  createEmployee,
  getEmployees
} = require("../controllers/employeeController");

router.use(auth);

router.post("/", role("HR", "ADMIN"), createEmployee);
router.get("/", role("HR", "ADMIN"), getEmployees);

module.exports = router;
