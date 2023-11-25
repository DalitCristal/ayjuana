import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated, loading);
  if (loading) return <h1>Cargado...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
