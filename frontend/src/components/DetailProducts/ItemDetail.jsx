import PropTypes from "prop-types";
import { getCookiesByName } from "../../utils/formsUtils";
import { CartContext } from "../../context/CartContext";
//REACT ROUTER DOM
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ product }) => {
  const { _id, title, img, category, description, price, stock, code } =
    product;
  const [userId, setUserId] = useState(null);
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = {
      _id,
      title,
      price,
      stock,
      quantity,
    };

    addItem(item, quantity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookiesByName("jwtCookie");
        const { user } = JSON.parse(atob(token.split(".")[1]));
        const userId = user._id;

        setUserId(userId);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchData();
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="card">
        <div>
          <img src={img} alt={title} />
          <div>
            <h3>{title}</h3>
            <p>
              <strong> Descripción: </strong>
              {description}
            </p>
            <h4>
              <strong>Categoría:</strong> {category}
            </h4>
            <p>
              <strong>Precio:</strong> ${price}
            </p>
            <p>
              <strong>Stock:</strong> {stock}
            </p>
            <p>
              <strong>Código:</strong> {code}
            </p>
          </div>
        </div>
        {quantityAdded > 0 ? (
          <Link to={`/cart/${userId}`}>Ver Carrito</Link>
        ) : (
          <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
        )}
      </div>
    </>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemDetail;
