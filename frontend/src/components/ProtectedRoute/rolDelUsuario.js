// Función para obtener el rol del usuario del token JWT
export const obtenerRolDelUsuario = () => {
  const token = document.cookie.replace("jwtCookie=", "");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const rolDelUsuario = payload.user.rol;

      return rolDelUsuario;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return null;
};
