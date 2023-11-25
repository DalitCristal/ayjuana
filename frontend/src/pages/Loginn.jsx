import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Loginn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { inicioSesion, errors: inicioErrors } = useAuth();

  const onSubmit = handleSubmit((e) => {
    e.preventDefault;
    inicioSesion(e);
    //console.log(e);
  });

  return (
    <div className="pageBox">
      <h1 className="titleFormu">Iniciar sesión</h1>

      {inicioErrors.map((error, i) => (
        <p className="textRed500" key={i}>
          {error}
        </p>
      ))}

      <form onSubmit={onSubmit} className="containerFormu">
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
          Iniciar sesión
        </button>
      </form>
      <div className="pieFormLogin">
        <p>¿No tienes una cuenta aun?</p>
        <Link to={"/register"} className="linkFormu">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Loginn;
