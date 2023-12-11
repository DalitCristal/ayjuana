// Función para obtener el rol del usuario del token JWT
export const getUserRole = () => {
  // Obtener el token desde las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtCookie="))
    ?.split("=")[1];

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      return decodedToken.user.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return null;
};

export const getCookiesByName = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

/* 
// Función para obtener el rol del usuario del token JWT
export const getUserRole = () => {
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
*/
