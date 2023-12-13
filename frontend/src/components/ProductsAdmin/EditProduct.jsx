import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils";
import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const formuRef = useRef(null);

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    code: "",
    status: true,
    thumbnails: [],
    category: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );
        const data = await response.json();
        setProductData(data.mensaje);
      } catch (error) {
        console.error("Error al obtener los detalles del producto", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Manejar cambios en el array de thumbnails
    if (name === "thumbnails") {
      const thumbnailsArray = value.split(",");
      setProductData((prevData) => ({
        ...prevData,
        [name]: thumbnailsArray,
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? e.target.checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataFormu = new FormData(formuRef.current);
    const data = Object.fromEntries(dataFormu);
    const token = getCookiesByName("jwtCookie");

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Producto actualizado:", updatedProduct);
        navigate("/products");
      } else {
        const errorData = await response.json();
        console.error("Error en la actualización:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="containerEditProduct">
      <h1 className="titleEditProduct">Editar Producto</h1>
      <form onSubmit={handleSubmit} ref={formuRef} className="formEditProduct">
        <label className="labelEditProduct">
          Título:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Descripción:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="textareaEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Precio:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Stock:
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Código:
          <input
            type="text"
            name="code"
            value={productData.code}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          Habilitado para e-commerce:
          <select
            name="status"
            value={productData.status ? "true" : "false"}
            onChange={handleInputChange}
            className="inputEditProduct"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label className="labelEditProduct">
          Categoría:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>
        <label className="labelEditProduct">
          URL de las imágenes (separadas por comas):
          <input
            type="text"
            name="thumbnails"
            value={productData.thumbnails.join(", ")}
            onChange={handleInputChange}
            className="inputEditProduct"
          />
        </label>

        <button type="submit" className="btnEditProduct">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
