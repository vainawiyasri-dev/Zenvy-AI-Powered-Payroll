import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
