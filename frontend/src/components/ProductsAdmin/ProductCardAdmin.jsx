import PropTypes from "prop-types";
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
