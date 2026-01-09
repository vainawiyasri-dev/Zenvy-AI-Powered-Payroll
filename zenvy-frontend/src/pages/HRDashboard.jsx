import { useEffect, useState } from "react";
import api from "../api/api";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [attendanceForm, setAttendanceForm] = useState({ employeeId: "", daysPresent: "", month: "" });
  const [payrolls, setPayrolls] = useState([]);
  const [payrollMonth, setPayrollMonth] = useState("");

  // ---------------- EMPLOYEES ----------------
  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    await api.post("/employees", form);
    setForm({ name: "", email: "", password: "" });
    fetchEmployees();
  };

  // ---------------- ATTENDANCE ----------------
  const fetchAttendance = async () => {
    const res = await api.get("/attendance");
    setAttendance(res.data);
  };

  const addAttendance = async (e) => {
    e.preventDefault();
    await api.post("/attendance", attendanceForm);
    setAttendanceForm({ employeeId: "", daysPresent: "", month: "" });
    fetchAttendance();
  };

  // ---------------- PAYROLL ----------------
  const fetchPayrolls = async () => {
    try {
      const res = await api.get("/payroll");
      setPayrolls(res.data);
    } catch (err) {
      console.error("Failed to fetch payrolls:", err);
    }
  };

  const runPayroll = async () => {
  if (!payrollMonth) {
    alert("Please select a month");
    return;
  }

  try {
    await api.post("/payroll/run", { month: payrollMonth });
    alert("Payroll processed");
    fetchPayrolls(); // 🔑 THIS WAS MISSING
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Payroll failed");
  }
};


  // ---------------- USE EFFECT ----------------
  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
    fetchPayrolls();
  }, []);

  return (
    <div className="container">
      

      {/* CREATE EMPLOYEE */}
      <div className="card">
        <h3>Create Employee</h3>
        <form  className="hr" onSubmit={createEmployee}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="hr-button">Create</button>
        </form>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="card">
        <h3>Employees</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD ATTENDANCE */}
      <div className="card">
        <h3>Add Attendance</h3>
        <form className="hr" onSubmit={addAttendance}>
          <select value={attendanceForm.employeeId} onChange={(e) => setAttendanceForm({ ...attendanceForm, employeeId: e.target.value })} required>
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))}
          </select>
          <input placeholder="Days Present" value={attendanceForm.daysPresent} onChange={(e) => setAttendanceForm({ ...attendanceForm, daysPresent: e.target.value })} required />
          <input placeholder="Month (e.g. January)" value={attendanceForm.month} onChange={(e) => setAttendanceForm({ ...attendanceForm, month: e.target.value })} required />
          <button className="hr-button">Add</button>
        </form>
      </div>

      {/* VIEW ATTENDANCE */}
      <div className="card">
        <h3>Attendance Records</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Days Present</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a._id}>
                <td>{a.employee?.name}</td>
                <td>{a.daysPresent}</td>
                <td>{a.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RUN PAYROLL */}
      <div className="card">
        <h3>Run Payroll</h3>
        <select value={payrollMonth} onChange={(e) => setPayrollMonth(e.target.value)} required>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button type="button" onClick={runPayroll}>Run Payroll</button>
      </div>

      {/* PAYROLL SUMMARY */}
      <div className="card">
        <h3>Payroll Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Net Salary</th>
              <th>Leave Prediction</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p) => (
              <tr key={p._id}>
                <td>{p.employee?.name}</td>
                <td>{p.month}</td>
                <td>₹{p.netSalary.toFixed(2)}</td>
                <td>{p.leavePrediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboard;
