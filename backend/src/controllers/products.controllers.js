import { productModel } from "../models/products.models.js";

const productCtrls = {};

/************************************** API ***************************************/

productCtrls.getProducts = async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar productos", mensaje: error });
  }
};

// ------ Buscar producto por ID ------
productCtrls.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: prod });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar Producto",
        mensaje: "No encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar producto", mensaje: error });
  }
};

// ------ Crear un nuevo producto ------
productCtrls.postProduct = async (req, res) => {
  const { title, description, price, stock, code, thumbnail, category } =
    req.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      price,
      stock,
      code,
      category,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear producto", mensaje: error });
  }
};

// ------ Actualizar un producto ------
productCtrls.putProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock, code, thumbnail, category } =
    req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      stock,
      code,
      thumbnail,
      category,
    });
    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Producto Actualizado" });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar producto",
        mensaje: "No encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar un producto", mensaje: error });
  }
};

// ------ Borrar un producto ------
productCtrls.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: "Producto Borrado" });
    } else {
      res.status(404).send({
        respuesta: "Error en borrar producto",
        mensaje: "No encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en borrar producto", mensaje: error });
  }
};

export default productCtrls;
