import PropTypes from "prop-types";
import { obtenerRolDelUsuario } from "./rolDelUsuario";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = document.cookie.includes("jwtCookie=");

  // Obtener el rol del usuario
  const rolDelUsuario = obtenerRolDelUsuario();

  // Verificar si se pudo obtener el rol del usuario
  if (rolDelUsuario) {
    if (isAuthenticated && rolDelUsuario === role) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    console.log("No se pudo obtener el rol del usuario.");
  }

  return <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
