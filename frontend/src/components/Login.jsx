import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const formuRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);

    const response = await fetch("http://localhost:8080/api/session/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      const datos = await response.json();
      document.cookie = `jwtCookie=${datos.token}; expires ${new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/;`;
      navigate("/products");
      console.log(datos.token);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <h1 className="titleFormu">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} ref={formuRef} className="containerFormu">
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
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
