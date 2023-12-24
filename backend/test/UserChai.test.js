import chai from "chai";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";

const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://dalacristal:Isr44J0TEEu5kSJ1@cluster0.qpsi8nz.mongodb.net/?`
);

describe("Test CRUD Users con chai en api/users", function () {
  it("Obtener todos los usuarios mediante el método GET", async () => {
    const users = await userModel.find();
    //console.log(users);
    //expect(Array.isArray(users)).to.be.ok;
    expect(users).not.to.be.deep.equal([]);
  });

  it("Obtener un usuario mediante el método GET", async () => {
    const user = await userModel.findById("6552af4c4a1eb20d431dab17");
    //console.log(user);
    expect(user).to.have.property("_id");
  });

  it("Crear un nuevo usuario mediante el método POST", async () => {
    const newUser = {
      first_name: "Julia",
      last_name: "Moreno",
      age: 31,
      email: "julia@julia.com",
      password: "$2b$12$Lkvz3n2P3OuulWOYp84.NepepsAE6fjN2p6oMifmXdbFgGra6ORNq",
    };

    const user = await userModel.create(newUser);
    //console.log(user);
    expect(user).to.have.property("_id");
  });

  it("Actualizar un usuario mediante el método PUT", async () => {
    const updateUser = {
      first_name: "Andrea Marta",
      last_name: "Martinez",
      age: 28,
      email: "andrea28@andrea28.com",
      password: "$2b$12$Lkvz3n2P3OuulWOYp84.NepepsAE6fjN2p6oMifmXdbFgGra6ORNq",
    };

    const user = await userModel.findByIdAndUpdate(
      "6584ddc40fc50223f7701145",
      updateUser
    );
    //console.log(user);

    expect(user).to.have.property("_id");
  });

  it("Eliminar un usuario mediante el método DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete(
      "6584e0ac03bfec90661d79f4"
    );
    //console.log(resultado);

    expect(resultado).to.be.ok;
  });
});
