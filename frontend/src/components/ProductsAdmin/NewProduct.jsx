import { useRef } from "react";
import { getCookiesByName } from "../../utils/formsUtils.js";
import Header from "../Header/Header.jsx";
import "./NewProduct.css";

const NewProduct = () => {
  const formuRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);
    const token = getCookiesByName("jwtCookie");

    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const responseData = await response.json();
    if (response.status === 200) {
      console.log("Solicitud exitosa:", responseData);
    } else {
      console.log("Error en la solicitud:", responseData);
    }
  };

  return (
    <>
      <Header />
      <h1 className="titleFormu">Crear nuevo producto</h1>
      <form onSubmit={handleSubmit} ref={formuRef} className="containerFormu">
        <label className="labelNewProduct">
          Título:
          <input
            type="text"
            id="title"
            name="title"
            className="inputNewProduct"
            required
          />
        </label>
        <label className="textareaNewProduct">
          Descripción:
          <textarea
            type="text"
            id="description"
            name="description"
            className="textareaNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Categoría:
          <input
            type="text"
            id="category"
            name="category"
            className="inputNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Código:
          <input
            type="text"
            id="code"
            name="code"
            className="inputNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Precio:
          <input
            type="number"
            id="price"
            name="price"
            className="inputNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Stock:
          <input
            type="number"
            id="stock"
            name="stock"
            className="inputNewProduct"
            required
          />
        </label>
        <label className="labelNewProduct">
          Habilitado para e-commerce:
          <select name="status" className="inputNewProduct">
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className="labelNewProduct">
          URL de las imágenes (separadas por comas):
          <textarea
            type="text"
            name="thumbnails"
            className="textareaNewProduct"
          />
        </label>

        <button type="submit" className="btnFormu">
          Crear Producto
        </button>
      </form>
    </>
  );
};

export default NewProduct;
