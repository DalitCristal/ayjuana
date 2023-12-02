import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateEmailToken = (
  userId,
  userEmail,
  action,
  authorization = "newPassword"
) => {
  const token = jwt.sign(
    { userId, userEmail, action, authorization },
    process.env.EMAIL_SECRET,
    {
      expiresIn: "1h",
    }
  );
  //console.log("email token", token);
  return token;
};

/* export const verifyEmailToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    // Verificar la acción del token
    if (decoded.action && decoded.action !== "resetPassword") {
      return {
        valid: false,
        reason: "Token no válido para resetear contraseña",
      };
    }

    // Validar el tiempo de expiración
    if (Date.now() / 1000 > decoded.exp) {
      return {
        valid: false,
        reason: "Token de reseteo de contraseña expirado",
      };
    }

    return {
      valid: true,
      userId: decoded.userId,
      userEmail: decoded.userEmail,
    };
  } catch (error) {
    console.error("Error verificando el token de email:", error);
    return { valid: false, reason: "Token no válido" };
  }
};
 */
