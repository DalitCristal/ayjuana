import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un authProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const registro = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log(response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const inicioSesion = async (user) => {
    try {
      const res = await loginRequest(user);
      document.cookie = `jwtCookie=${res.data.token}; expires ${new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/;`;
      //console.log(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  //ELIMINA EL ERROR DESPUES DE 5S
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get("jwtCookie");

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        console.log(cookies);
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registro,
        inicioSesion,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
