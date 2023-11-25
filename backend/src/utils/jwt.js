import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  console.log(token);
  return token;
};

/* generateToken({
  _id: "655696e29b49729a0e2b45e2",
  first_name: "panchito",
  last_name: "perez",
  age: "40",
  email: "panchito@panchito.com",
  password: "$2b$12$6tZjGtOldM3eiSN6c7ubROCNzeoSR50txI8xUOs4CtzTWSghF9i0u",
  rol: "user",
  cart: "655696e29b49729a0e2b45e3",
}); */
/* generateToken({
  _id: "6552af4c4a1eb20d431dab17",
  first_name: "cristal",
  last_name: "cristal",
  age: "23",
  email: "cristal@cristal.com",
  password: "$2b$12$Lkvz3n2P3OuulWOYp84.NepepsAE6fjN2p6oMifmXdbFgGra6ORNq",
  rol: "admin",
  cart: "6552af4c4a1eb20d431dab18",
}); */

export const authToken = (req, res, next) => {
  const authHeader = req.headers.Authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "Usuario no autenticado, no tiene token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return res
        .status(403)
        .send({ error: "Usuario no autorizado, token inválido" });
    }
  });

  // Usuario válido
  req.user = credential.user;
  next();
};
