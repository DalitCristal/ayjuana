import { generateToken } from "../utils/jwt.js";
import "dotenv/config";

const sessionsCtrls = {};

sessionsCtrls.postLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: `Usuario invalido` });
    }

    const token = generateToken(req.user);
    res.cookie("jwtCookie", token, {
      maxAge: 43200000, //12Horas
    });

    //res.status(200).send({ payload: req.user }); //postman
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

sessionsCtrls.postSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        mensaje: "Usuario ya existente",
        respuesta: `${req.user.message}`,
      });
    }
    if (
      !req.user.first_name ||
      !req.user.last_name ||
      !req.user.age ||
      !req.user.email ||
      !req.user.password
    ) {
      return res
        .status(400)
        .send({ mensaje: "Campos de usuario incompletos o inválidos" });
    }

    res.status(201).send({ mensaje: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

sessionsCtrls.getLogOut = (req, res) => {
  res.clearCookie("jwtCookie");
  res.status(200).send({ resultado: "Usuario deslogueado" });
};

sessionsCtrls.getGithub = async (req, res) => {
  if (req.user) {
    res.status(200).send({ mensaje: "Usuario registrado" });
  } else {
    res.status(401).send({ mensaje: "Error en la autenticación de GitHub" });
  }
};

sessionsCtrls.getGithubCallback = async (req, res) => {
  if (req.user) {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Usuario logueado" });
  } else {
    res.status(401).send({ mensaje: "Error en la autenticación de GitHub" });
  }
};

export default sessionsCtrls;
