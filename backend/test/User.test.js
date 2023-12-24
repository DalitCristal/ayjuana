import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";
import Assert from "assert";

const assert = Assert.strict;

await mongoose.connect(
  `mongodb+srv://dalacristal:Isr44J0TEEu5kSJ1@cluster0.qpsi8nz.mongodb.net/?`
);

describe("Test CRUD de usuarios en la ruta api/users", function () {
  before(() => {
    console.log("Arrancando el test");
  });
  beforeEach(() => {
    console.log("Comienza el test");
  });

  it("Obtener todos los usuarios mediante el método GET", async () => {
    const users = await userModel.find();
    //console.log(users);
    assert.strictEqual(Array.isArray(users), true);
  });

  it("Obtener un usuario mediante el método GET", async () => {
    const user = await userModel.findById("6552af4c4a1eb20d431dab17");
    //console.log(user);
    assert.ok(user._id);
  });

  it("Crear un nuevo usuario mediante el método POST", async () => {
    const newUser = {
      first_name: "Laura",
      last_name: "Sanchez",
      age: 30,
      email: "laura@laura.com",
      password: "$2b$12$Lkvz3n2P3OuulWOYp84.NepepsAE6fjN2p6oMifmXdbFgGra6ORNq",
    };

    const user = await userModel.create(newUser);
    //console.log(user);
    assert.ok(user._id);
  });

  it("Actualizar un usuario mediante el método PUT", async () => {
    const updateUser = {
      first_name: "Andrea",
      last_name: "Martinez",
      age: 31,
      email: "andrea28@andrea28.com",
      password: "$2b$12$Lkvz3n2P3OuulWOYp84.NepepsAE6fjN2p6oMifmXdbFgGra6ORNq",
    };

    const user = await userModel.findByIdAndUpdate(
      "6584ddc40fc50223f7701145",
      updateUser
    );

    //console.log(user);

    assert.ok(user._id);
  });

  it("Eliminar un usuario mediante el método DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete(
      "65818b3b120368e433bae7ff"
    );
    //console.log(resultado);

    assert.strictEqual(typeof resultado, "object");
  });
});
