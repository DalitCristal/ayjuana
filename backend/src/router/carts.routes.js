import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import cartsCtrls from "../controllers/carts.controllers.js";

const cartRouter = Router();

cartRouter.get(
  "/api/carts/:id",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.getCartById
);

cartRouter.post("/api/carts/:cid/products/:pid", cartsCtrls.postAddProd);

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
  /* passportError("jwt"),
  authorization("user"), */
  cartsCtrls.putQuantity
);

cartRouter.delete(
  "/api/carts/:cid",
  passportError("jwt"),
  authorization("user"),
  cartsCtrls.deleteProds
);
{
}
cartRouter.get("/api/total-price-carts/:cid", cartsCtrls.getTotalPrice);

cartRouter.put("/api/:cid/purchase", cartsCtrls.finalizarCompra);

export default cartRouter;
