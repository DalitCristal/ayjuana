import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
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

  const validateForm = () => {
    const nameRegex = /^[A-Za-zñÑ]+$/;
    if (
      !nameRegex.test(formData.first_name) ||
      !nameRegex.test(formData.last_name)
    ) {
      setMessage("El nombre y el apellido solo pueden contener letras.");
      return false;
    }

    const ageValue = parseInt(formData.age, 10);
    if (isNaN(ageValue) || ageValue < 16 || ageValue > 120) {
      setMessage("La edad debe ser un número entre 16 y 120");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("El correo electrónico no tiene un formato válido.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage(
        "La contraseña debe tener al menos 6 caracteres, incluir al menos una mayúscula, al menos una minúscula y al menos un número."
      );
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Detener el envío si las validaciones no son exitosas
    if (!validateForm()) {
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

        navigate("/login");
      } else if (response.status === 401) {
        setMessage("Email ya existente");
      } else {
        const responseData = await response.json();
        setMessage(responseData.mensaje || "Error al registrar usuario");
      }
    } catch (error) {
      setMessage(`Error inesperado al registrar usuario: ${error}`);
    }
  };

  return (
    <>
      <Header />
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
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="inputFormu"
            value={formData.password}
            onChange={handleChange}
            required
          />

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
