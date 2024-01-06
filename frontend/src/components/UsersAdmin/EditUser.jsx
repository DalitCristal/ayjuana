import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserData, updateUser } from "../../utils/fetchUserData.js";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserData(id);

        if (response.data) {
          setUserData(response.data);
          setSelectedRole(response.data.rol);
        } else {
          console.error(
            "Error al obtener los detalles del usuario:",
            response.error
          );
        }
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUserData = { ...userData, rol: selectedRole };
      const response = await updateUser(id, updatedUserData);

      if (response.respuesta) {
        console.log(response.mensaje);
        navigate(`/users`);
      } else {
        console.error("Error al actualizar el usuario:", response.error);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <>
      <div className="containerEditUser">
        <h1 className="tituloEditUser">Editar Usuario</h1>
        <div>
          <p className="textoEditUser">Nombre: {userData.first_name}</p>
          <p className="textoEditUser">Apellido: {userData.last_name}</p>
          <p className="textoEditUser">Email: {userData.email}</p>
          <label className="labelEditUser">
            Rol:
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="selectEditUser"
            >
              <option value="user">Usuario</option>
              <option value="premium">Premium</option>
            </select>
          </label>
        </div>
        <button onClick={handleSaveChanges} className="btnEditUser">
          Guardar Cambios
        </button>
      </div>
    </>
  );
};

export default EditUser;
