import { productModel } from "../models/products.models.js";

const productCtrls = {};

productCtrls.getProducts = async (req, res) => {
  try {
    let { category, status, limit, page, sort } = req.query;

    const cat = category ?? "virtual";
    const statusProd = status ?? true;
    const limitProd = limit ?? 10;
    const pageProd = page ?? 1;
    const order = sort ?? "desc";
    let productsFromDB;
    let productsToShow;
    let nextPage;
    let prevPage;

    if (cat == undefined) {
      productsFromDB = await productModel.paginate(
        {},
        { limit: limitProd, page: pageProd, sort: { price: order } }
      );
      productsToShow = [];
      for (let prod of productsFromDB.docs) {
        let prodRendered = {
          title: prod.title,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          category: prod.category,
          status: prod.status,
          code: prod.code,
          thumbnails: prod.thumbnails,
          id: prod._id,
        };
        productsToShow.push(prodRendered);
      }

      if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
        prevPage = 1;
        nextPage = productsFromDB.nextPage;
      } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
        prevPage = productsFromDB.prevPage;
        nextPage = productsFromDB.nextPage;
      } else if (!productsFromDB.hasNextPage) {
        nextPage = productsFromDB.totalPages;
        prevPage = productsFromDB.prevPage;
      }
    } else {
      productsFromDB = await productModel.paginate(
        { category: cat },
        { limit: limitProd, page: pageProd, sort: { price: order } }
      );
      productsToShow = [];
      for (let prod of productsFromDB.docs) {
        let prodRendered = {
          title: prod.title,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          category: prod.category,
          status: prod.status,
          code: prod.code,
          thumbnails: prod.thumbnails,
          id: prod._id,
        };
        productsToShow.push(prodRendered);
      }
      if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
        prevPage = 1;
        nextPage = productsFromDB.nextPage;
      } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
        prevPage = productsFromDB.prevPage;
        nextPage = productsFromDB.nextPage;
      } else if (!productsFromDB.hasNextPage) {
        nextPage = productsFromDB.totalPages;
        prevPage = productsFromDB.prevPage;
      }
    }

    res.status(200).send({
      respuesta: "OK",
      mensaje: productsToShow,
      next: nextPage,
      prev: prevPage,
    });
  } catch (error) {
    console.error("Error fetching and processing products:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/* productCtrls.getProducts = async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar productos", mensaje: error });
  }
}; */

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
  const {
    title,
    description,
    price,
    stock,
    category,
    status,
    code,
    thumbnail,
  } = req.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      price,
      stock,
      category,
      status,
      code,
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
