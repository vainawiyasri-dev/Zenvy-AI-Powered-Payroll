import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RunPayroll from "./pages/RunPayroll";
import SalarySlip from "./pages/SalarySlip";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import "./styles/main.css";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["HR", "ADMIN"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/run-payroll"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <RunPayroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary-slip"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <SalarySlip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
