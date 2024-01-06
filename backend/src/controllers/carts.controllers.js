import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { userModel } from "../models/users.models.js";
import Ticket from "../models/ticket.models.js";

const cartsCtrls = {};

cartsCtrls.getCartById = async (req, res) => {
  const { id } = req.params;

  // Acceder a la información del usuario autenticado
  const user = req.user;

  try {
    const cart = await cartModel.findById(id);

    if (cart) {
      res.status(200).send({ respuesta: "OK", mensaje: cart });
    } else
      res.status(404).send({
        respuesta: "Error en consultar Carrito",
        mensaje: "No encontrado",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consulta carrito", mensaje: error });
  }
};

cartsCtrls.postAddProd = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex((item) => item.id_prod == pid);
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en agregar producto Carrito",
          mensaje: "Producto no encontrado",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en agregar producto Carrito",
        mensaje: "carrito no encontrado",
      });
    }
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({ respuesta: "Error en agregar producto Carrito", mensaje: error });
  }
};

cartsCtrls.deleteProd = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const posicion = cart.products.findIndex((item) => item.id_prod == pid);

        cart.products.splice(posicion, 1);

        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en eliminar producto Carrito",
          mensaje: "Producto no encontrado",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en eliminar producto Carrito",
        mensaje: "carrito no encontrado",
      });
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Error en eliminar producto Carrito",
      mensaje: error,
    });
  }
};

cartsCtrls.putProds = async (req, res) => {
  const { cid } = req.params;
  const arr = req.body;

  try {
    const cart = await cartModel.findById(cid);
    arr.forEach((p) => {
      let i = cart.products.findIndex((prod) => prod.id_prod._id == p.id_prod);

      if (i != -1) {
        cart.products[i] = p;
      } else {
        cart.products.push(p);
      }
    });
    const response = await cartModel.findByIdAndUpdate(cid, cart);
    res.status(200).send({
      respuesta: "Se actualizaron prods correctamente",
      mensaje: response,
    });
  } catch (error) {
    res.status(400).send({ respuesta: "Hubo un problema", mensaje: error });
  }
};

cartsCtrls.putQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex(
          (item) => item.id_prod._id == pid
        );
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }

        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en actualizar cantidad de producto Carrito",
          mensaje: "Producto no encontrado",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar cantidad de producto Carrito",
        mensaje: "carrito no encontrado",
      });
    }
  } catch (error) {
    req.logger.error(error);
    res.status(400).send({
      respuesta: "Error en actualizar cantidad de producto Carrito",
      mensaje: error,
    });
  }
};

cartsCtrls.deleteProds = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    cart.products = [];

    const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
    res.status(200).send({ respuesta: "OK", mensaje: respuesta });
  } catch (error) {
    res.status(400).send({
      respuesta: "Error en eliminar todos los productos Carrito",
      mensaje: error,
    });
  }
};

cartsCtrls.getTotalPrice = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);

    let total = 0;
    for (let prod = 0; prod < cart.products.length; prod++) {
      total += parseInt(cart.products[prod].id_prod.price);
    }

    res.status(200).send({
      respuesta: "Suma sa del total de todos los productos",
      mensaje: total,
    });
  } catch (error) {
    res.status(400).send({
      respuesta: "Error sumar el total de todos los productos",
      mensaje: error,
    });
  }
};

cartsCtrls.finalizarCompra = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid).populate("products.id_prod");

    if (!cart) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }

    // Verifica el stock de cada producto en el carrito
    let totalAmount = 0;
    for (const item of cart.products) {
      const product = item.id_prod;
      const requestedQuantity = item.quantity;

      if (product.stock >= requestedQuantity) {
        // Resta la cantidad del stock del producto
        product.stock -= requestedQuantity;
        const idString = product._id.toString();

        let productoQueActualizar = await productModel.findById(idString);

        if (productoQueActualizar) {
          productoQueActualizar.stock -= requestedQuantity;

          await productoQueActualizar.save();
        } else {
          req.logger.error(
            "No se encontro el producto que quiere actualizar",
            error
          );
        }

        //Precio total de la compra
        const priceProduct = item.id_prod.price;
        totalAmount += priceProduct * requestedQuantity;
      } else {
        // Si no hay suficiente stock, no agrega el producto al proceso de compra
        return res.status(400).json({
          mensaje: `No hay suficiente stock para el producto: ${product.title}`,
        });
      }
    }

    //const userEmail = await userModel.findById()
    //Crea un ticket asociado a la compra
    const newTicket = await Ticket.create({
      amount: cart.totalAmount,
      //purchaser: req.user.email,
    });

    res.status(200).send({
      mensaje: "Compra finalizada samente",
      ticket: newTicket,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: `Error al finalizar la compra: ${error.message}` });
  }
};

export default cartsCtrls;
