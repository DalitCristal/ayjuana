import mongoose from "mongoose";
import { productModel } from "../src/models/products.models.js";
import Assert from "assert";

const assert = Assert.strict;

await mongoose.connect(
  `mongodb+srv://dalacristal:Isr44J0TEEu5kSJ1@cluster0.qpsi8nz.mongodb.net/?`
);

describe("Test CRUD de productos en la ruta /api/products", function () {
  before(() => {
    console.log("Arrancando el test");
  });
  beforeEach(() => {
    console.log("Comienza el test");
  });

  it("Obtener todos los productos mediante el método GET", async () => {
    const products = await productModel.find();
    //console.log(products);
    assert.strictEqual(Array.isArray(products), true);
  });

  it("Obtener un producto mediante el método GET", async () => {
    const product = await productModel.findById("657745291ade343791de8718");
    //console.log(product);
    assert.ok(product._id);
  });

  it("Crear un nuevo producto mediante el método POST", async () => {
    const newProduct = {
      title: "Malla",
      description: "Con circulos",
      price: 1050,
      stock: 560,
      category: "verano",
      status: true,
      code: "DGSAG554f54",
      thumbnails: [],
      owner: "656a3c7897ba3afb939761b8",
    };

    const product = await productModel.create(newProduct);
    //console.log(product);
    assert.ok(product._id);
  });

  it("Actualizar un producto mediante el método PUT", async () => {
    const updateProduct = {
      title: "Malla",
      description: "Colorida",
      price: 1530,
      stock: 50,
      category: "verano",
      status: true,
      code: "DGSAG554FD",
      thumbnails: [
        "www.imagen.com",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Felearningactual.com%2Fel-metodo-del-caso%2F&psig=AOvVaw3Xc8YQ8MlPeXS64qHLlM-y&ust=1703299295419000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJj_8r2CooMDFQAAAAAdAAAAABAH",
      ],
    };

    const product = await productModel.findByIdAndUpdate(
      "6584f6f09abdc5a8c3fa18b4",
      updateProduct
    );

    //console.log(product);

    assert.ok(product._id);
  });

  it("Eliminar un producto mediante el método DELETE", async () => {
    const resultado = await productModel.findByIdAndDelete(
      "6584f7ce53660391b7dfc909"
    );
    //console.log(resultado);

    assert.strictEqual(typeof resultado, "object");
  });
});
