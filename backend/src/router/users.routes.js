import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import usersCtrls from "../controllers/users.controllers.js";
const userRouter = Router();

//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO

//Todos los usuarios
userRouter.get(
  "/api/users",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderApiAllUsers
);
//Un usuario
userRouter.get(
  "/api/users/:id",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderUserByID
);
//Edita un usuario
userRouter.post("/api/users/mail", usersCtrls.postMail);
userRouter.put(`/api/users/:userId`, usersCtrls.putUser);
userRouter.post(
  `/api/validate-reset-token/:userId`,
  usersCtrls.verifyEmailToken
);

//Elimina un usuario
userRouter.delete(
  "/api/users/:id",
  passportError("jwt"),
  authorization("user"),
  usersCtrls.renderDeleteUser
);

export default userRouter;
