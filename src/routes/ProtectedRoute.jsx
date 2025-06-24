import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const ProtectedRoute = () => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <div style={{ color: "white" }}>Cargando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
