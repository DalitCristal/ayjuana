import { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/users/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status == 200) {
        setMessage("Se ha enviado un correo electrónico con instrucciones.");
      } else {
        setMessage("Hubo un problema al enviar el correo electrónico.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error en el proceso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerForgotPassword">
      <h1 className="titleForgotPassword">Recuperar Contraseña</h1>
      <p className="parrafoForgotPassword">
        Ingrese su correo electrónico y le enviaremos instrucciones para
        restablecer su contraseña.
      </p>

      <label className="labelForgotPassword">
        Correo Electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputForgotPassword"
        />
      </label>

      <button
        onClick={handleForgotPassword}
        disabled={loading}
        className="btnForgotPassword"
      >
        Enviar Correo Electrónico
      </button>

      {message && <p className="messageForgotPassword">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
