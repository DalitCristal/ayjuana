import NavBar from "../Navigation/NavBar.jsx";
import { useState, useEffect } from "react";
import ProductsList from "./ProductsList.jsx";
import getProducts from "./getProducts.jsx";
import "./ProductsListContainer.css";

const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async (page) => {
      try {
        const productsArray = await getProducts(page);
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
    <div>
      <NavBar />
      <h1 className="title-page-products">Lista de Productos</h1>
      <ProductsList products={products} />

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
  );
};

export default ProductsListContainer;
