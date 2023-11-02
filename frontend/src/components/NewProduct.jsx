import { useRef } from "react";
import { getCookiesByName } from "../utils/formsUtils.js";

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
        Authorization: `Bearer ${token} `,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      const datos = await response.json();
      console.log(datos);
    } else {
      const datos = await response.json();

      console.log(datos);
    }
  };

  return (
    <div>
      <h1 className="titleFormu">Creación de nuevo producto</h1>
      <form onSubmit={handleSubmit} ref={formuRef} className="containerFormu">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Titulo"
          className="inputFormu"
          required
        />

        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción"
          className="inputFormu"
          required
        />

        <input
          type="text"
          id="category"
          name="category"
          placeholder="Categoría"
          className="inputFormu"
          required
        />
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Código"
          className="inputFormu"
          required
        />

        <input
          type="number"
          id="price"
          name="price"
          placeholder="Precio"
          className="inputFormu"
          required
        />

        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="Stock"
          className="inputFormu"
          required
        />
        <button type="submit" className="btnFormu">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
