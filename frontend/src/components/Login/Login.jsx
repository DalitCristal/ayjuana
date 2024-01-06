import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFirstName } from "../ProtectedRoute/rolDelUsuario";
import "../GlobalStyles/Formularios.css";
import "./Login.css";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Obtener los mensajes desde localStorage
    const registerMessage = localStorage.getItem("registerMessage");
    const registerErrorMessage = localStorage.getItem("registerErrorMessage");
    const registerResponseErrorMessage = localStorage.getItem(
      "registerResponseErrorMessage"
    );

    if (registerMessage) {
      setMessage(registerMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("registerMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    if (registerResponseErrorMessage) {
      setErrorMessage(registerResponseErrorMessage);
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
        localStorage.removeItem("registerResponseErrorMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    if (registerErrorMessage) {
      setErrorMessage(registerErrorMessage);
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
        localStorage.removeItem("registerErrorMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datForm = new FormData(formRef.current);
    const data = Object.fromEntries(datForm);

    const response = await fetch("http://localhost:8080/api/session/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const datos = await response.json();
      document.cookie = `jwtCookie=${datos.token}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;

      const nameUser = getUserFirstName();
      localStorage.setItem("loginUser", `¡Hola ${nameUser}!`);

      navigate("/");
    } else if (response.status === 401) {
      setErrorMessage(
        `${response.statusText}, Correo electrónico o contraseña incorrecta`
      );
    } else {
      setErrorMessage(`${response.mensaje}`);
    }
  };

  return (
    <>
      <div className="pageBox">
        <h1 className="titleFormu">Iniciar sesión</h1>

        {errorMessage && (
          <div className="messageContainer error">
            <p>{errorMessage}</p>
          </div>
        )}

        {message && (
          <div className="messageContainer success">
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} ref={formRef} className="containerFormu">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="inputFormu"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="inputFormu"
          />

          <button type="submit" className="btnFormu">
            Iniciar sesión
          </button>
        </form>
        <div className="pieFormLogin">
          <p>¿No tienes una cuenta aún?</p>
          <Link to={"/register"} className="linkFormu">
            Registrarse
          </Link>
          <p>
            <Link to="/login/forgot-password">Olvidé mi contraseña</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
