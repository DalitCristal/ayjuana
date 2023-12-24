import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils";
import Header from "../Header/Header";
import "./DeleteUser.css";

const DeleteUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = getCookiesByName("jwtCookie");

      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
        navigate("/users");
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el usuario:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <>
      <Header />
      <div className="delete-user-container">
        <h1>Eliminar Usuario</h1>
        <p>
          ¿Estás seguro que deseas eliminar este usuario? Esta acción no se
          puede deshacer.
        </p>
        <div className="buttons-container">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="delete-button"
          >
            {loading ? "Eliminando..." : "Eliminar Usuario"}
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
