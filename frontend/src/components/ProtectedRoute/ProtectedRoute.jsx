// ProtectedRoute.jsx
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookiesByName, getUserRole } from "./rolDelUsuario";

const ProtectedRoute = ({ role, children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const token = getCookiesByName("jwtCookie");

  const isAuthorized = () => {
    return Array.isArray(role) ? role.includes(userRole) : role === userRole;
  };

  useEffect(() => {
    if (!token) {
      // Si no hay token
      navigate("/login", { replace: true });
    } else if (!isAuthorized()) {
      // Si el usuario no está autorizado
      navigate("/unauthorized", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userRole, navigate]);

  return isAuthorized() ? <>{children}</> : null;
};

ProtectedRoute.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
