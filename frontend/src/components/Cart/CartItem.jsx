import { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CartContext.jsx";
import CountUpdateQuantity from "../ItemCount/CountUpdateQuantity.jsx";
import "./CartItem.css";

const CartItem = ({ item, quantity }) => {
  const { updateItemQuantity, removeItem } = useContext(CartContext);
  const handleUpdateQuantity = (newQuantity) => {
    updateItemQuantity(item._id, newQuantity);
  };
  console.log(item);
  const handleRemove = () => {
    console.log("Removing item with ID:", item._id);
    removeItem(item._id);
  };

  return (
    <div className="cart-item">
      <div>
        <h3 className="tituloCart">{item.title}</h3>
        <ul className="detailsCompra">
          <li>Precio por unidad: ${item.price}</li>
          <li>Cantidad: {quantity}</li>
        </ul>
      </div>
      <div className="cartItemControls">
        <CountUpdateQuantity
          initial={quantity}
          stock={item.stock}
          onAdd={handleUpdateQuantity}
        />
        <button onClick={handleRemove}>Eliminar</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;

/* import PropTypes from "prop-types";
import "./CartItem.css";

const CartItem = ({ item, quantity }) => {
  return (
    <>
      <section className="productCart">
        <h3 className="tituloCart">{item.title}</h3>
        <ul className="detailsCompra">
          <li>Precio por unidad: ${item.price}</li>
          <li>Cantidad: {quantity}</li>
        </ul>
      </section>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;
 */
