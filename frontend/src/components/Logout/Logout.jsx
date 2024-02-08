import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../config/config";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch(`${HOST}/api/session/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            title: `Sesión cerrada con éxito.`,
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/", { replace: true });
        } else {
          console.error(`Error al cerrar sesión: ${response.mensaje} `);
        }
      } catch (error) {
        console.error(`Error en la solicitud: ${error}`);
      }
    };

    logout();
  }, [navigate]);

  return <div>Saliendo de tu cuenta...</div>;
};

export default Logout;
