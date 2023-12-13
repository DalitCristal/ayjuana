export const getUserRole = () => {
  // Obtener el token desde las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwtCookie="))
    ?.split("=")[1];

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      //console.log("rol de usuario:", decodedToken);

      return decodedToken.user.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return null;
};
