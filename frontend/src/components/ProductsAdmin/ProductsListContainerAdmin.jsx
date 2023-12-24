import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import ProductsListAdmin from "./ProductsListAdmin.jsx";
import getProductsAdmin from "./getProductsAdmin.jsx";
import "./ProductsListContainerAdmin.css";

const ProductsListContainerAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener el mensaje de éxito desde localStorage
    const updateMessage = localStorage.getItem("updateMessage");
    if (updateMessage) {
      setMessage(updateMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("updateMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async (page) => {
      try {
        const productsArray = await getProductsAdmin(page);

        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Header />
      <div>
        <h1 className="title-page-products">Lista de Productos</h1>
        {message && (
          <div className="message-container">
            <p>{message}</p>
          </div>
        )}
        <ProductsListAdmin products={products} />
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </button>
          )}
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Siguiente
          </button>
        </div>
        {loading ? "Cargando..." : null}
      </div>
    </>
  );
};

export default ProductsListContainerAdmin;
