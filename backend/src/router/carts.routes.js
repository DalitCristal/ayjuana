import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import cartsCtrls from "../controllers/carts.controllers.js";
import { addLogger } from "../config/logger.js";

const cartRouter = Router();
cartRouter.use(addLogger);

cartRouter.get(
  "/api/carts/:id",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.getCartById
);

cartRouter.post(
  "/api/carts/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.postAddProd
);

cartRouter.delete(
  "/api/carts/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.deleteProd
);

cartRouter.put(
  "/api/carts/:cid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.putProds
);

cartRouter.put(
  "/api/carts/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.putQuantity
);

cartRouter.delete(
  "/api/carts/:cid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.deleteProds
);

cartRouter.get(
  "/api/total-price-carts/:cid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.getTotalPrice
);

cartRouter.put(
  "/api/:cid/purchase",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.finalizarCompra
);

export default cartRouter;
