import { useState, useEffect } from "react";
import ProductsList from "./ProductsList.jsx";
import getProducts from "./getProducts.jsx";
import "./ProductsListContainer.css";

const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
        console.error(`Error en la solicitud ${error} `);
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
    <div className="containerListProducts">
      <h1 className="titlePageProducts">Nuestros productos</h1>

      <ProductsList products={products} />

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Anterior
          </button>
        )}

        {currentPage > 2 && (
          <button onClick={() => handlePageChange(currentPage - 2)}>
            {currentPage - 2}
          </button>
        )}

        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}

        <span>{currentPage}</span>

        {hasMore && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}

        {hasMore && (
          <button onClick={() => handlePageChange(currentPage + 2)}>
            {currentPage + 2}
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
