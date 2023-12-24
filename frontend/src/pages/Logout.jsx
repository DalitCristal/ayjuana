import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/session/logout",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        console.log(response);
        if (response.status === 200) {
          navigate("/");
        } else {
          console.error("Error al cerrar sesión:", response.statusText);
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
      }
    };

    logout();
  }, [navigate]);

  return <div>Saliendo de tu cuenta...</div>;
};

export default Logout;
