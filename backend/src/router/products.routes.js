import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import productCtrls from "../controllers/products.controllers.js";
import { validateSchema } from "../config/validator.midleware.js";
import { createProductSchema } from "../utils/messagesError.js";
const productRouter = Router();

/************************************** API ***************************************/

//Obtener todos los productos
productRouter.get("/api/products", productCtrls.getProducts);

//Obtener un producto
productRouter.get("/api/products/:id", productCtrls.getProductById);

//Crear nuevo producto
productRouter.post(
  "/api/products",
  passportError("jwt"),
  authorization("admin"),
  validateSchema(createProductSchema),
  productCtrls.postProduct
);

//Editar producto
productRouter.put(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  validateSchema(createProductSchema),
  productCtrls.putProduct
);

//Eliminar producto
productRouter.delete(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.deleteProduct
);

export default productRouter;
