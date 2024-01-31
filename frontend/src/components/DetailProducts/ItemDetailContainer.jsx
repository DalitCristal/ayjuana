//STYLES
import "./ItemDetailContainer.css";
//COMPONENTS
import ItemDetail from "./ItemDetail.jsx";
//HOOKS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HOST, PORT_BACK } from "../../config/config.js";
import Swal from "sweetalert2";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${HOST}${PORT_BACK}/api/products/${id}`);

        if (response.status === 200) {
          const productData = await response.json();
          setProduct(productData.mensaje);
        } else {
          Swal.fire({
            title: `Error en la solicitud de información: ${response.status} `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error en la solicitud de información: ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
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
