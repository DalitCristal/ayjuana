import { userModel } from "../models/users.models.js";
import { encryptPassword, validatePassword } from "../utils/bcrypt.js";
import "dotenv/config";
import nodemailer from "nodemailer";
import { generateEmailToken } from "../utils/emailToken.js";
import jwt from "jsonwebtoken";

const usersCtrls = {};

//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO

//Todos los usuarios
usersCtrls.renderApiAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

//Un usuario
usersCtrls.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res
        .status(404)
        .send({ respuesta: "Error", mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ mensaje: "Error", respuesta: error });
  }
};

//verificar email token
usersCtrls.verifyEmailToken = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.EMAIL_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token expirado
        return res.status(403).json({ mensaje: "Token expirado" });
      } else {
        // Otro error en la verificación
        console.error("Error en la verificación del token:", err);
        return res.status(403).json({ mensaje: "No autorizado" });
      }
    }

    try {
      // Verificar que la acción del token sea la especificada
      if (user.action !== "resetPassword") {
        return res.status(400).json({ mensaje: "Acción no válida" });
      }
      // Validar el tiempo de expiración
      const currentTime = Math.floor(Date.now() / 1000);
      if (user.exp && user.exp < currentTime) {
        return res.status(400).json({ mensaje: "Token expirado" });
      }
      // Validar que el Id del token sea igual al Id de los query params
      const userIdFromToken = user.userId;
      const userIdFromParams = req.params.userId;
      if (userIdFromToken !== userIdFromParams) {
        return res.status(400).json({ mensaje: "Id no válido" });
      }

      res.status(200).json({ mensaje: "Ok", user });
    } catch (error) {
      console.error("Error en la verificación del token:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });
};

//Edita un usuario
usersCtrls.putUser = async (req, res) => {
  const { userId } = req.params;
  const { first_name, last_name, age, email, password } = req.body;

  // Validar que la nueva contraseña no sea igual a la contraseña actual
  const userPassword = await userModel.findById(userId);

  if (validatePassword(password, userPassword.password)) {
    return res.status(400).json({
      mensaje: "La nueva contraseña no puede ser igual a la contraseña actual",
    });
  }

  const bcryptPassword = encryptPassword(password, process.env.SALT);

  try {
    const user = await userModel.findByIdAndUpdate(userId, {
      first_name,
      last_name,
      age,
      email,
      password: bcryptPassword,
    });

    if (user) {
      res.clearCookie("token");
      res.status(200).send({
        mensaje: "Contraseña actualizada exitosamente",
        respuesta: user,
      });
    } else {
      res
        .status(404)
        .send({ respuesta: "Error", mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: "Token no válido" });
  }
};

//Elimina un usuario
usersCtrls.renderDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res
        .status(404)
        .send({ respuesta: "Error", mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

/* MAIL */
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dalitcristal25@gmail.com",
    pass: process.env.CONTRASENA_NODEMAILER,
    authMethod: "LOGIN",
  },
});

usersCtrls.postMail = async (req, res) => {
  try {
    const { email } = req.body;

    let emailExistente = await userModel.findOne({ email });

    const userId = emailExistente.id;
    const userEmail = emailExistente.email;
    const action = "resetPassword";

    const emailToken = generateEmailToken(userId, userEmail, action);

    if (emailExistente) {
      const resultado = await transporter.sendMail({
        from: "Recuperacion de contraseña dalitcristal25@gmail.com",
        to: userEmail,
        subject: "Recuperación de contraseña",
        html: `
        <div>
          <h1>Recuperación de Contraseña</h1>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href='http://localhost:5173/edit-profile/${userId}'>Restablecer Contraseña</a>
        </div>
      `,
      });
      res
        .status(200)
        .json({ respuesta: "email enviando con exito", mensaje: emailToken });
    } else {
      res.status(404).send({ mensaje: "Usuario No encontrado" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al enviar el correo electrónico." });
  }
};

export default usersCtrls;
