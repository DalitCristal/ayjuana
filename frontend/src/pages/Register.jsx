import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/GlobalStyles/Formularios.css";

const Register = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const datForm = new FormData(formRef.current);
    const data = Object.fromEntries(datForm);
    const response = await fetch("http://localhost:8080/api/session/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      navigate("/login");
    } else {
      console.log(response);
    }
  };

  return (
    <div className="pageBox">
      <h1 className="titleFormu">Registro</h1>

      <form onSubmit={onSubmit} className="containerFormu">
        <input
          type="text"
          id="first_name"
          placeholder="Nombre"
          className="inputFormu"
        />

        <input
          type="text"
          id="last_name"
          placeholder="Apellido"
          className="inputFormu"
        />

        <input
          type="number"
          id="age"
          placeholder="Edad"
          className="inputFormu"
        />

        <input
          type="email"
          id="email"
          placeholder="Correo Electrónico"
          className="inputFormu"
        />

        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          className="inputFormu"
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
  );
};

export default Register;
