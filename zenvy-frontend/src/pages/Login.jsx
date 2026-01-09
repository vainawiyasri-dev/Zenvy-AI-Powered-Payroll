import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const navigate = useNavigate();

const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    if (!res.data.token) {
      alert("Login failed: token missing");
      return;
    }
    login(res.data.token, res.data.role);

    // Redirect based on role
    if (res.data.role === "ADMIN" || res.data.role === "HR") {
      navigate("/hr");
    } else if (res.data.role === "EMPLOYEE") {
      navigate("/employee");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>ZENVY Payroll Login</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
