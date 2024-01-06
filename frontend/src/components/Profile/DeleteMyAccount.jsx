import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils";
import "./DeleteMyAccount.css";

const DeleteMyAccount = () => {
  const { userId } = useParams();
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const token = getCookiesByName("jwtCookie");
      const { user: tokenUser } = JSON.parse(atob(token.split(".")[1]));

      if (userId !== tokenUser._id) {
        setMessage("Acceso no autorizado");

        navigate("/");

        return;
      }
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const deleteCookie = (name) => {
        document.cookie = getCookiesByName(name);
      };

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("deleteMessage", "Cuenta eliminada exitosamente");

        setMessage(`Cuenta eliminada exitosamente ${data.first_name} `);
        deleteCookie("jwtCookie");

        navigate("/register");
      } else {
        const data = await response.json();
        setMessage(`Error al eliminar la cuenta: ${data.mensaje}`);
      }
    } catch (error) {
      setMessage(`Error inesperado al eliminar la cuenta ${error}`);
    }
  };

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  const handleCancel = () => {
    setConfirmation(false);
    const token = getCookiesByName("jwtCookie");
    const { user } = JSON.parse(atob(token.split(".")[1]));
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <div className="deleteAccountContainer">
        {confirmation ? (
          <>
            <p className="confirmationMessage">
              ¿Estás seguro de eliminar tu cuenta? Esta acción no se puede
              deshacer.
            </p>
            <button onClick={handleDeleteAccount} className="deleteButton">
              Sí, eliminar
            </button>
            <button onClick={handleCancel} className="cancelButton">
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={handleConfirmation}
            className="buttonDeleteMyAccount"
          >
            Eliminar mi cuenta
          </button>
        )}
        {message && <p className="message">{message}</p>}{" "}
      </div>
    </>
  );
};

DeleteMyAccount.propTypes = {
  userId: PropTypes.string,
};

export default DeleteMyAccount;
