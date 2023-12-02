import { userModel } from "../models/users.models.js";
import { encryptPassword } from "../utils/bcrypt.js";
import "dotenv/config";
import nodemailer from "nodemailer";
import { generateEmailToken } from "../utils/emailToken.js";

const usersCtrls = {};

//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO
/************************************** API ***************************************/
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
usersCtrls.renderUserByID = async (req, res) => {
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
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

//Edita un usuario
usersCtrls.putUser = async (req, res) => {
  const { id, token } = req.params;
  const { first_name, last_name, age, email, password } = req.body;

  const emailTokenVerification = verifyEmailToken(token);

  if (!emailTokenVerification.valid) {
    return res.status(400).send({
      respuesta: "Error",
      mensaje: emailTokenVerification.reason,
    });
  }

  const newPassword = encryptPassword(password);

  try {
    const user = await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      age,
      email,
      password: newPassword,
    });
    if (user) {
      res.status(200).send({
        respuesta: "Contraseña actualizada exitosamente",
        mensaje: user,
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
    console.log(email);

    let emailExistente = await userModel.findOne({ email });
    console.log("email existente", emailExistente);

    const userId = emailExistente.id;
    const userEmail = emailExistente.email;
    const action = "resetPassword";

    console.log(userId);
    const emailToken = generateEmailToken(userId, userEmail, action);
    //console.log(emailToken);

    if (emailExistente) {
      const resultado = await transporter.sendMail({
        from: "Recuperacion de contraseña dalitcristal25@gmail.com",
        to: userEmail,
        subject: "Recuperación de contraseña",
        html: `
        <div>
          <h1>Recuperación de Contraseña</h1>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href='http://localhost:5173/edit-profile/${userId}/${emailToken}'>Restablecer Contraseña</a>
        </div>
      `,
      });
      //console.log(resultado);
      res.status(200).json({ respuesta: "email enviando con exito" });
    } else {
      console.log("Usuario no existente");
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al enviar el correo electrónico." });
  }
};

export default usersCtrls;
