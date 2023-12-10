//STYLES
import "./ItemDetailContainer.css";
//COMPONENTS
import ItemDetail from "./ItemDetail.jsx";
//HOOKS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData.mensaje);
        } else {
          console.error("Error fetching product details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="ItemDetailContainer" key={id}>
      {loading ? (
        "Cargando..."
      ) : product ? (
        <ItemDetail product={product} />
      ) : null}
    </div>
  );
};

export default ItemDetailContainer;
