import { useState, useEffect } from "react";
import ProductsList from "./ProductsList.jsx";
import getProducts from "./getProducts.jsx";
import "./ProductsListContainer.css";

const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Obtener los mensajes de éxito desde localStorage
    const loginUser = localStorage.getItem("loginUser");
    const logout = localStorage.getItem("logout");

    if (loginUser) {
      setMessage(loginUser);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("loginUser");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (logout) {
      setMessage(logout);
      const timeoutId = setTimeout(() => {
        setMessage("");
        localStorage.removeItem("logout");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts({
          page: currentPage,
          pageSize: 12,
          sort: "asc",
        });

        // Verificar si hay más productos en la página siguiente
        setHasMore(allProducts.length === 12);

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
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
    <div>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}

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

      <ProductsList products={products} />

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
  );
};

export default ProductsListContainer;
