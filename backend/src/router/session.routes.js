import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import sessionsCtrls from "../controllers/session.controllers.js";

const sessionRouter = Router();

/*************************************** API ***************************************/
//Iniciar sesión
sessionRouter.post(
  "/api/session/signin",
  passport.authenticate("login"),
  sessionsCtrls.postLogin
);

//Registrarse
sessionRouter.post(
  "/api/session/signup",
  passport.authenticate("register"),
  sessionsCtrls.postSignUp
);

//Cerrar sesión
sessionRouter.get("/api/session/logout", sessionsCtrls.getLogOut);

//Registrarse a través de github
sessionRouter.get(
  "/api/session/github",
  passport.authenticate("github", { scope: [`user:email`] }),
  sessionsCtrls.getGithub
);

//Iniciar sesión a través de github
sessionRouter.get(
  "/api/session/githubCallback",
  passport.authenticate("github"),
  sessionsCtrls.getGithubCallback
);

sessionRouter.get(
  "/api/session/current",
  passportError("jwt"),
  authorization("user"),
  sessionsCtrls.getUser
);

sessionRouter.get("/api/session/verify", sessionsCtrls.verifyToken);

export default sessionRouter;
