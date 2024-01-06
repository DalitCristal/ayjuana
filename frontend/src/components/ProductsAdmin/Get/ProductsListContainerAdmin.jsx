import { useState, useEffect } from "react";
import ProductsListAdmin from "./ProductsListAdmin.jsx";
import getProductsAdmin from "./getProductsAdmin.jsx";
import "./ProductsListContainerAdmin.css";

const ProductsListContainerAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener los mensajes de éxito desde localStorage
    const updateMessage = localStorage.getItem("updateMessage");
    const newProductMessage = localStorage.getItem("newProductMessage");
    const deleteProductMessage = localStorage.getItem("deleteProductMessage");

    if (updateMessage) {
      setMessage(updateMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("updateMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    if (newProductMessage) {
      setMessage(newProductMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("newProductMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    if (deleteProductMessage) {
      setMessage(deleteProductMessage);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("deleteProductMessage");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProductsAdmin({
          page: currentPage,
          pageSize: 12,
          status: true,
          sort: "asc",
        });

        // Verificar si hay más productos en la página siguiente
        setHasMore(allProducts.length === 12);

        setProducts(allProducts);
      } catch (error) {
        console.error("Error al recuperar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div>
        <h1 className="title-page-products">Lista de Productos</h1>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </button>
          )}
          {hasMore && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          )}
        </div>
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
          {hasMore && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          )}
        </div>
        {loading ? "Cargando..." : null}
      </div>
    </>
  );
};

export default ProductsListContainerAdmin;
