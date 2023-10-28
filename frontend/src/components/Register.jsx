import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const formuRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);

    const response = await fetch("http://localhost:8080/api/session/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      const datos = await response.json();
      navigate("/login");
      console.log(datos);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <h1 className="titleFormu">Registro</h1>
      <form onSubmit={handleSubmit} ref={formuRef} className="containerFormu">
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Nombre"
          className="inputFormu"
          required
        />

        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Apellido"
          className="inputFormu"
          required
        />

        <input
          type="number"
          id="age"
          name="age"
          placeholder="Edad"
          className="inputFormu"
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo Electrónico"
          className="inputFormu"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          className="inputFormu"
          required
        />
        <button type="submit" className="btnFormu">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
