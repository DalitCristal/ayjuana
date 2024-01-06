import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils.js";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [editableFields, setEditableFields] = useState({
    first_name: false,
    last_name: false,
    age: false,
    email: false,
    password: false,
  });
  const [updateMessage, setUpdateMessage] = useState(null);

  // Nuevos estados para campos editables
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setAge] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");

  const fetchProfile = useCallback(
    async (token) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data.mensaje);
        } else {
          console.error("Error fetching user data:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    [userId, setUserData]
  );

  useEffect(() => {
    const token = getCookiesByName("jwtCookie");
    const { user } = JSON.parse(atob(token.split(".")[1]));

    if (user._id !== userId) {
      console.error("Acceso no autorizado");
      return;
    }

    if (userId) {
      fetchProfile(token);
    }
  }, [userId, fetchProfile]);

  const handleEditField = (field) => {
    setEditableFields((prevFields) => ({ ...prevFields, [field]: true }));
    switch (field) {
      case "first_name":
        setNewFirstName(userData.first_name);
        break;
      case "last_name":
        setNewLastName(userData.last_name);
        break;
      case "age":
        setAge(userData.age);
        break;
      case "email":
        setEmail(userData.email);
        break;
      case "password":
        setPassword(userData.password);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = getCookiesByName("jwtCookie");
      const updatedFields = {};

      // Agregar al objeto solo los campos que han sido editados
      if (editableFields.first_name) updatedFields.first_name = newFirstName;
      if (editableFields.last_name) updatedFields.last_name = newLastName;
      if (editableFields.age) updatedFields.age = newAge;
      if (editableFields.email) updatedFields.email = newEmail;
      if (editableFields.password) updatedFields.password = newPassword;

      const response = await fetch(
        `http://localhost:8080/api/users/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setUserData(data.mensaje);
        // Desactivar la edición para todos los campos
        setEditableFields({
          first_name: false,
          last_name: false,
          age: false,
          email: false,
          password: false,
        });
        setUpdateMessage("Cambios guardados exitosamente.");

        setTimeout(() => {
          setUpdateMessage(null);
        }, 3000);

        fetchProfile();
      } else {
        setUpdateMessage(
          "Error al guardar los cambios. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      setUpdateMessage(
        "Error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <div className="divContainerProfile">
        <h2 className="h2Profile">Mi perfil</h2>

        {updateMessage && (
          <div className="messageContainerProfile">
            <p className="messageProfile">{updateMessage}</p>{" "}
          </div>
        )}

        {userData ? (
          <div>
            <p>
              Nombre:
              {editableFields.first_name ? (
                <>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("first_name")}
                  className="spanProfile"
                >
                  {userData.first_name}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Apellido:
              {editableFields.last_name ? (
                <>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("last_name")}
                  className="spanProfile"
                >
                  {userData.last_name}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Edad:
              {editableFields.age ? (
                <>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setAge(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("age")}
                  className="spanProfile"
                >
                  {userData.age}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Email:
              {editableFields.email ? (
                <>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("email")}
                  className="spanProfile"
                >
                  {userData.email}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <p>
              Contraseña:
              {editableFields.password ? (
                <>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputProfile"
                  />
                  <EditIcon style={{ cursor: "pointer" }} />
                </>
              ) : (
                <span
                  onClick={() => handleEditField("password")}
                  className="spanProfile"
                >
                  {userData.password}
                  <EditIcon style={{ cursor: "pointer" }} />
                </span>
              )}
            </p>
            <button onClick={handleSaveChanges} className="buttonSaveChanges">
              Guardar cambios
            </button>
            <div>
              <Link to={`/profile/delete/${userId}`}>Eliminar mi cuenta</Link>
            </div>
          </div>
        ) : (
          <p className="pLoading">Cargando...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
