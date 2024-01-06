import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id, title, description, price, thumbnails } = product;

  return (
    <div className="product-card">
      {thumbnails.length > 0 && (
        <img
          src={thumbnails[0]}
          alt={`${title} - Thumbnail`}
          className="product-thumbnail"
        />
      )}
      <div className="product-details">
        <h2>TITULO: {title}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
      <Link to={`/product/${id}`} className="option">
        Más detalles
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProductCard;
