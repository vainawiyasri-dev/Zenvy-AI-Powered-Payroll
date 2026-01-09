import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [salarySlips, setSalarySlips] = useState([]);

  // ---------------- ATTENDANCE ----------------
  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/my"); // fetch attendance for logged-in employee
      setAttendance(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
      setAttendance([]); // clear on error
    }
  };

  // ---------------- SALARY SLIPS ----------------
  const fetchSalarySlips = async () => {
    try {
      const res = await api.get("/payroll/me"); // fetch payroll for logged-in employee
      setSalarySlips(res.data);
    } catch (err) {
      console.error("Failed to fetch salary slips:", err);
      setSalarySlips([]); // clear on error
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchSalarySlips();
  }, []);

  return (
    <div className="container">
     

      {/* ATTENDANCE */}
      <div className="card">
        <h3>My Attendance</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Days Present</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length ? (
              attendance.map((a) => (
                <tr key={a._id}>
                  <td>{a.month}</td>
                  <td>{a.daysPresent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No attendance records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SALARY SLIPS */}
      <div className="card">
        <h3>Salary Slips</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross Salary</th>
              <th>Pro-Rated</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {salarySlips.length ? (
              salarySlips.map((s) => {
                const proRated = s.grossSalary - s.netSalary; // amount deducted due to absent days
                return (
                  <tr key={s._id}>
                    <td>{s.month}</td>
                    <td>₹ {s.grossSalary.toFixed(2)}</td>
                    <td>₹ {proRated.toFixed(2)}</td>
                    <td>₹ {s.netSalary.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No salary slips available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
