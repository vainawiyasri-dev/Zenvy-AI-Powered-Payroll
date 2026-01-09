const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {
  addAttendance,
  getAttendance,
  getMyAttendance
} = require("../controllers/attendanceController");

router.use(auth);

router.post("/", role("HR"), addAttendance);
router.get("/", role("HR", "ADMIN"), getAttendance);
router.get("/my", role("EMPLOYEE"), getMyAttendance);

module.exports = router;
