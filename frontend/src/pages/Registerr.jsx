import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
//STYLES
import "../components/GlobalStyles/Formularios.css";
//CONTEXT
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Registerr = () => {
  const { registro, isAuthenticated, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    registro(values);
  });

  return (
    <div className="pageBox">
      <h1 className="titleFormu">Registro</h1>

      {registerErrors.map((error, i) => (
        <p className="textRed500" key={i}>
          {error}
        </p>
      ))}

      <form onSubmit={onSubmit} className="containerFormu">
        <input
          type="text"
          {...register("first_name", { required: true })}
          id="first_name"
          placeholder="Nombre"
          className="inputFormu"
        />
        {errors.first_name && <p className="textRed500">Nombre es requerido</p>}

        <input
          type="text"
          {...register("last_name", { required: true })}
          id="last_name"
          placeholder="Apellido"
          className="inputFormu"
        />
        {errors.last_name && (
          <p className="textRed500">Apellido es requerido</p>
        )}

        <input
          type="number"
          id="age"
          {...register("age", { required: true })}
          placeholder="Edad"
          className="inputFormu"
        />
        {errors.age && <p className="textRed500">Edad es requerido</p>}

        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          placeholder="Correo Electrónico"
          className="inputFormu"
        />
        {errors.email && <p className="textRed500">Email es requerido</p>}

        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
          className="inputFormu"
        />
        {errors.password && (
          <p className="textRed500">Contraseña es requerido</p>
        )}

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

export default Registerr;
