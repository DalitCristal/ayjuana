import passport from "passport";

// Funcion para retornar errores en las estrategias de passport
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

// Recibo roles y establezco su capacidad
export const authorization = (roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "Usuario no autorizado" });
    }

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    if (!roles.includes(req.user.user.rol)) {
      return res
        .status(403)
        .send({ error: "Usuario no tiene los permisos necesarios" });
    }

    next();
  };
};
