import passport from "passport";
import { z } from "zod";

//Funcion para retornar errores en las estrategias de passport
export const passportError = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

//Recibo un rol y establezco su capacidad
export const authorization = (rol) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "Usuario no autorizado" });
    }
    if (req.user.user.rol != rol) {
      return res
        .status(403)
        .send({ error: "Usuario no tiene los permisos necesarios" });
    }
    next();
  };
};

//Verifico que los productos se carguen correctamente
export const createProductSchema = z.object({
  title: z.string({
    required_error: "Titulo es requerido",
    invalid_type_error: "Titulo debe ser una cadena de caracteres",
  }),
  description: z.string().trim(),
  price: z
    .number({
      required_error: "Precio es requerido",
      invalid_type_error: "Precio debe ser un número",
    })
    .positive()
    .finite(),
  stock: z.number().nonnegative().finite(),
  category: z.string().trim(),
  status: z.boolean({
    required_error: "Estado es requerido",
    invalid_type_error: "El estado debe ser verdadero o falso",
  }),
  code: z.string(),
  thumbnails: z.array(z.string().url({ message: "Invalid url" })),
});
