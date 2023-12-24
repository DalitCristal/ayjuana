import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import usersCtrls from "../controllers/users.controllers.js";
import { addLogger } from "../config/logger.js";

const userRouter = Router();
userRouter.use(addLogger);

//Todos los usuarios
userRouter.get(
  "/api/users",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.getApiAllUsers
);

//Un usuario
userRouter.get(
  "/api/users/:id",
  passportError("jwt"),
  authorization(["admin", "premium", "user"]),
  usersCtrls.getUserById
);

//Crear un usuario
userRouter.post("/api/users/mail", usersCtrls.postMail);

//Restablecer contraseña de usuario
userRouter.put(`/api/users/:userId`, usersCtrls.putPasswordUser);

//Editar todos los campos del usuario
userRouter.put(`/api/users/profile/:userId`, usersCtrls.putUser);

//Edita rol de un usuario
userRouter.put(
  `/api/users/premium/:uid`,
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.putRolUser
);

//validar email token
userRouter.post(
  `/api/validate-reset-token/:userId`,
  usersCtrls.verifyEmailToken
);

//Elimina un usuario
userRouter.delete(
  "/api/users/:userId",
  passportError("jwt"),
  authorization(["admin", "premium", "user"]),
  usersCtrls.deleteUser
);

export default userRouter;
