import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datForm = new FormData(formRef.current);
    const password = Object.fromEntries(datForm);

    //verificar token

    // Validaciones básicas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Llamada al backend para actualizar la contraseña

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.status == 200) {
        // Redireccionar al login después de cambiar la contraseña
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.mensaje || "Error al cambiar la contraseña");
      }
    } catch (error) {
      setError("Error de red");
    }
  };

  return (
    <div className="containerEditProfile">
      <h1 className="titleEditProfile">Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit} ref={formRef} className="formEditProfile">
        <label className="labelEditProfile">
          Nueva Contraseña:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="inputEditProfile"
          />
        </label>

        <label className="labelEditProfile">
          Confirmar Contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="inputEditProfile"
          />
        </label>

        <button type="submit" className="btnEditProfile">
          Guardar Contraseña
        </button>

        {error && <p className="errorEditProfile">{error}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
