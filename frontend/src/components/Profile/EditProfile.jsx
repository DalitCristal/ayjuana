import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./editProfile.css";

const EditProfile = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    const validateResetToken = async () => {
      try {
        const token = document.cookie.replace("token=", "");
        const response = await fetch(
          `http://localhost:8080/api/validate-reset-token/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.status === 200) {
          setTokenValid(false);
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        setTokenValid(false);
      }
    };

    validateResetToken();
  }, [userId]);

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.status === 200) {
        console.log("Contraseña actualizada exitosamente");
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
    <>
      <Header />
      <div className="containerEditProfile">
        <h1 className="titleEditProfile">Cambiar Contraseña</h1>
        {tokenValid ? (
          <form onSubmit={handleSavePassword} className="formEditProfile">
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
        ) : (
          <div>
            <p>
              El enlace ha expirado. Por favor, genera un nuevo correo de
              restablecimiento.
            </p>
            <button
              onClick={() => navigate("/login/forgot-password")}
              className="btnForgotPassword"
            >
              Generar nuevo correo de restablecimiento
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
