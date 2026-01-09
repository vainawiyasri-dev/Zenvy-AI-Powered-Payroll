import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Login page → branding only
  if (location.pathname === "/") {
    return (
      <header className="navbar">
        <h1>ZENVY</h1>
      </header>
    );
  }

  const getTitle = () => {
    if (role === "HR") return "HR Dashboard";
    if (role === "EMPLOYEE") return "Employee Dashboard";
    if (role === "ADMIN") return "Admin Dashboard";
    return "ZENVY";
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ redirect to login
  };

  return (
    <header className="navbar">
      <h1>{getTitle()}</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Navbar;
