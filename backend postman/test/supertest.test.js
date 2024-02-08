import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { HOST } from "../src/config/config";

const expect = chai.expect;

const requester = supertest(`${HOST}`);

await mongoose.connect(
  `mongodb+srv://dalacristal:Isr44J0TEEu5kSJ1@cluster0.qpsi8nz.mongodb.net/?`
);

let cookie = {};

before(async () => {
  const user = {
    email: "samuel@samuel.com",
    password: "Samuel123",
  };

  const response = await requester.post("/api/session/signin").send(user);

  expect(response.headers["set-cookie"]).to.be.an("array").that.is.not.empty;

  const cookieResult = response.headers["set-cookie"][0];

  const [cookieName, cookieValue] = cookieResult.split("=");

  cookie = {
    name: cookieName,
    value: cookieValue,
  };
  //console.log(cookie);
  expect(cookieName).to.equal("jwtCookie");
  expect(cookieValue).to.be.ok;
});

describe("Test CRUD de productos en la ruta /api/products", function () {
  it("Ruta: /api/products metodo GET", async () => {
    const { statusCode, body } = await requester
      .get("/api/products")
      .set("Authorization", `Bearer ${cookie.value}`);

    expect(statusCode).to.be.equal(200);
    //console.log(body);
  });

  it("Ruta: /api/products/:id metodo GET", async () => {
    const productId = "65774b45a8c0a0bd3c1225ba";

    const { statusCode, body } = await requester
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${cookie.value}`);

    expect(statusCode).to.be.equal(200);
    //console.log(body);
  });

  it("Ruta: /api/products metodo POST", async () => {
    const newProduct = {
      title: "Malla",
      description: "Con corazones blancos",
      price: 1050,
      stock: 560,
      category: "verano",
      status: true,
      code: "A154789632",
      thumbnails: [],
    };

    const { statusCode, _body, ok } = await requester
      .post("/api/products")
      .set("Authorization", `Bearer ${cookie.value}`)
      .send(newProduct);

    //console.log(statusCode);
    //console.log(_body);
    //console.log(ok);
    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: /api/products/:productId metodo PUT", async () => {
    const productId = "65774a12a8c0a0bd3c1225b0";

    const updatedProduct = {
      title: "Bikini",
      description: "Con circulos negros y rojos",
      price: 1050,
      stock: 560,
      category: "verano",
      status: true,
      code: "DGSAG54f54",
      thumbnails: [],
      owner: "656a3c7897ba3afb939761b8",
    };

    const { statusCode, _body, ok } = await requester
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${cookie.value}`)
      .send(updatedProduct);

    expect(statusCode).to.be.equal(200);
    //console.log(_body);
  });

  it("Ruta: /api/products/:id metodo DELETE", async () => {
    const productId = "65774b84a8c0a0bd3c1225be";

    const { statusCode, body, ok } = await requester
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${cookie.value}`);

    expect(statusCode).to.be.equal(200);
    //console.log(body);
  });
});

describe("Test Users Session /api/session", function () {
  let cookie = {};

  it("Ruta: /api/session/signup con metodo POST", async () => {
    const newUser = {
      first_name: "Samuel",
      last_name: "Martinez",
      age: 25,
      email: "samuel5555550@samuel55555550.com",
      password: "Samuel0",
    };

    const { statusCode, _body } = await requester
      .post("/api/session/signup")
      .send(newUser);

    expect(statusCode).to.equal(201);
    expect(_body.mensaje).to.equal("Usuario registrado");
  });

  it("Ruta: /api/session/signin con método POST", async () => {
    const user = {
      email: "samuel@samuel.com",
      password: "Samuel123",
    };
    const response = await requester.post("/api/session/signin").send(user);

    expect(response.headers["set-cookie"]).to.be.an("array").that.is.not.empty;

    const cookieResult = response.headers["set-cookie"][0];

    const [cookieName, cookieValue] = cookieResult.split("=");

    cookie = {
      name: cookieName,
      value: cookieValue,
    };

    expect(cookieName).to.equal("jwtCookie");
    expect(cookieValue).to.be.ok;
  });

  it("Ruta: /api/session/current con método GET", async () => {
    const { _body } = await requester
      .get("/api/session/current")
      .set("Cookie", [`${cookie.name} = ${cookie.value} `]);

    //console.log(_body);

    expect(_body.user.email).to.be.equal("samuel@samuel.com");
  });

  after(async () => {
    await mongoose.disconnect();
  });
});
