import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { validateForm } from "./ValidateForm.jsx";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Obtener el mensaje de éxito desde localStorage
    const deleteMessage = localStorage.getItem("deleteMessage");
    if (deleteMessage) {
      setMessage(deleteMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("deleteMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = await validateForm(formData);

    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/session/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.status === 201) {
        localStorage.setItem(
          "registerMessage",
          "Usuario registrado exitosamente"
        );

        setMessage("");

        navigate("/login");
      } else if (response.status === 401) {
        setMessage("Email ya existente");
      } else {
        const responseData = await response.json();
        localStorage.setItem(
          "registerResponseErrorMessage",
          `Error al registrar usuario: ${responseData.mensaje}`
        );
      }
    } catch (error) {
      localStorage.setItem(
        "registerErrorMessage",
        `Error inesperado al registrar usuario: ${error}`
      );
      setMessage(`Error inesperado al registrar usuario: ${error}`);
    }
  };

  return (
    <>
      <div className="pageBox">
        <h1 className="titleFormu">Registro</h1>

        {message && (
          <div className="deleteMessageContainer">
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="containerFormu">
          <input
            type="text"
            id="first_name"
            placeholder="Nombre"
            className="inputFormu"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            id="last_name"
            placeholder="Apellido"
            className="inputFormu"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            id="age"
            placeholder="Edad"
            className="inputFormu"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Correo Electrónico"
            className="inputFormu"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
          <label className="labelPass">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Contraseña"
              className="registerPass"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="showPasswordButton"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </label>

          <label className="labelPass">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmar contraseña"
              className="registerPass"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="showPasswordButton"
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </label>

          <button type="submit" className="btnFormu">
            Registrarse
          </button>
        </form>
        <div className="pieFormLogin">
          <p>¿Ya tienes una cuenta?</p>

          <Link to={"/login"} className="linkFormu">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
