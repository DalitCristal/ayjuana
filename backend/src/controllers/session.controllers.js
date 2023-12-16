import { generateToken } from "../utils/jwt.js";
import "dotenv/config";

const sessionsCtrls = {};

sessionsCtrls.postLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: `Usuario invalido` });
    }

    const token = generateToken(req.user);
    /*  res.cookie("jwtCookie", token, {
      maxAge: 43200000, //12Horas
    }); //postman */

    //res.status(200).send({ payload: req.user }); //postman
    res.status(200).send({ token }); //react
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

sessionsCtrls.postSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
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
  res.status(200).send({ mensaje: "Usuario registrado" });
};

sessionsCtrls.getGithubCallback = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Usuario logueado" });
};

/* sessionsCtrls.verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await user.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
 */
export default sessionsCtrls;
