import { generateToken } from "../utils/jwt.js";
const sessionsCtrls = {};

/*************************************** API ***************************************/
sessionsCtrls.postLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: `Usuario invalido` });
    }

    const token = generateToken(req.user);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

sessionsCtrls.postSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }

    res.status(200).send({ mensaje: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

sessionsCtrls.getLogOut = (req, res) => {
  res.clearCookie("jwtCookie");
  res.status(200).send({ resultado: "Usuario deslogueado" });
};

sessionsCtrls.getGithub = async (req, res) => {
  res.status(200).send({ mensaje: "Usuario registrado" });
};

sessionsCtrls.getGithubCallback = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Usuario logueado" });
};

sessionsCtrls.getUser = (req, res) => {
  res.send(req.user);
};

export default sessionsCtrls;
