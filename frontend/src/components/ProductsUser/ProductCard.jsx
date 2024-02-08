import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HOST } from "../../config/config";
import { getUserId } from "../ProtectedRoute/rolDelUsuario";
import AddToCartButton from "../CartMP/AddToCartButton";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { id, title, description, price, thumbnails } = product;
  const userId = getUserId();
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  const handleAddToCart = () => {
    setAddToCartClicked(true);
  };

  return (
    <div className="productCard">
      <div className="blackCape">
        {addToCartClicked ? (
          <>
            <Link to={`/cart/${userId}`}>Ver Carrito</Link>
            <Link to={`/product/${id}`} className="linkCardProduct">
              Más detalles
            </Link>
          </>
        ) : (
          <>
            <AddToCartButton
              productId={id}
              quantity={1}
              onClick={() => handleAddToCart()}
            />

            <Link to={`/product/${id}`} className="linkCardProduct">
              Más detalles
            </Link>
          </>
        )}
      </div>
      <img
        src={`${HOST}/static/products/img/${thumbnails[0].name}`}
        alt={`${title}-${id}`}
        className="productThumbnail"
      />

      <div className="productDetails">
        <h2 className="titleProductDetails">
          {title.length >= 19 ? `${title.substring(0, 19)}...` : title}
        </h2>
        <p className="sortDescription">
          {description.length >= 40 ? (
            `${description.substring(0, 40)}...`
          ) : (
            <>
              {description}
              <br />
              <br />
            </>
          )}
        </p>
        <p className="priceProduct">Precio: ${price}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnails: PropTypes.array.isRequired,
  }).isRequired,
};

export default ProductCard;
