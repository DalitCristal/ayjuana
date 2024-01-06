import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCookiesByName, isTokenExpired } from "../../../utils/formsUtils.js";
import "./DeleteProduct.css";

const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = getCookiesByName("jwtCookie");

      if (isTokenExpired(token)) {
        document.cookie =
          "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.setItem("tokenMessage", "Sesión expirada");

        navigate("/login");
        return;
      }

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
        localStorage.setItem(
          "deleteProductMessage",
          "Producto eliminado exitosamente"
        );
        navigate("/products");
      } else {
        const errorData = await response.json();
        setMessage(`Error al eliminar el producto: ${errorData}`);
      }
    } catch (error) {
      setMessage(`Error en la solicitud DELETE: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message && (
        <div className="message-error-container">
          <p>{message}</p>
        </div>
      )}

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
    </>
  );
};

export default DeleteProduct;
