import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserData } from "../Profile/fetchUserData";

const ProductCardAdmin = ({ product }) => {
  const {
    id,
    title,
    description,
    price,
    stock,
    category,
    status,
    code,
    owner,
  } = product;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUserData(owner);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [owner]);

  return (
    <div className="product-card">
      <img src={"thumbnails"} alt={title} className="product-thumbnail" />

      <div className="product-details">
        <h2>Título: {title}</h2>
        <p>Descripción: {description}</p>
        <p>Precio: ${price}</p>
        <p>Stock: {stock}</p>
        <p>Categoría: {category}</p>
        <p>Habilitado en la tienda: {status ? "Sí" : "No"}</p>
        <p>Código: {code}</p>
        {userData ? (
          <>
            <p>
              Titular: {userData.first_name} {userData.last_name}
            </p>
            <p>Rol: {userData.rol}</p>
          </>
        ) : null}
      </div>
      <Link to={`/products/edit/${id}`} className="option">
        Editar producto
      </Link>
      <Link to={`/products/delete/${id}`} className="option">
        Eliminar producto
      </Link>
    </div>
  );
};

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    code: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }),
};

export default ProductCardAdmin;

/* import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCardAdmin = ({ product }) => {
  const { id, title, description, price, stock, category, code, thumbnail } =
    product;

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-thumbnail" />
      <div className="product-details">
        <h2>TITULO: {title}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
        <p>Category: {category}</p>
        <p>Code: {code}</p>
      </div>
      <Link to={`/products/edit/${id}`} className="option">
        Editar producto
      </Link>
      <Link to={`/products/delete/${id}`} className="option">
        Eliminar producto
      </Link>
    </div>
  );
};

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default ProductCardAdmin;
 */
