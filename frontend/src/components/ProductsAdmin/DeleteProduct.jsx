import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCookiesByName } from "../../utils/formsUtils.js";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = getCookiesByName("jwtCookie");

      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
        navigate("/products");
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el producto:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="boxDeleteProduct">
      <p className="textDeleteProduct">
        ¿Estás seguro que deseas eliminar el producto? Esta acción no se puede
        deshacer.
      </p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="btnDeleteProduct"
      >
        {loading ? "Eliminando..." : "Eliminar Producto"}
      </button>
      <Link to={"/products"} className="btnCancel">
        Cancelar
      </Link>
    </div>
  );
};

export default DeleteProduct;
