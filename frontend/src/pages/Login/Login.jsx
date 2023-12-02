import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

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

    if (response.status == 200) {
      const datos = await response.json();
      document.cookie = `jwtCookie=${datos.token}; expires=${new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
      navigate("/");
    } else {
      console.log(response);
    }
  };

  return (
    <div className="pageBox">
      <h1 className="titleFormu">Iniciar sesión</h1>

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
        <p>¿No tienes una cuenta aun?</p>
        <Link to={"/register"} className="linkFormu">
          Registrarse
        </Link>
        <p>
          <Link to="/login/forgot-password">Olvidé mi contraseña</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
