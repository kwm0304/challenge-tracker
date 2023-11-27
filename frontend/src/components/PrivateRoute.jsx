import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;