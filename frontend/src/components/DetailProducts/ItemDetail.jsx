import PropTypes from "prop-types";

//REACT ROUTER DOM
import { Link } from "react-router-dom";

const ItemDetail = ({ product }) => {
  if (!product) {
    return null;
  }
  const { title, img, category, description, price } = product;
  return (
    <>
      <div className="card">
        <div>
          <img src={img} alt={title} />
          <div>
            <h3>{title}</h3>
            <h4>
              <strong>Categoría:</strong> {category}
            </h4>
            <p>
              <strong> Descripción: </strong>
              {description}
            </p>
            <p>
              <strong>Precio:</strong> ${price}
            </p>
          </div>
        </div>

        <Link to={"/cart"} className="finalizarCompra">
          Agregar al carrito
        </Link>
      </div>
    </>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemDetail;
