import PropTypes from "prop-types";
import { useState } from "react";
import "./ItemCount.css";

const CountUpdateQuantity = ({ initial, stock, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const [availableProducts, setAvailableProducts] = useState(stock - quantity);

  const increment = () => {
    if (quantity < availableProducts) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleUpdateQuantity = () => {
    onAdd(quantity);
    setAvailableProducts(stock - quantity);
  };

  return (
    <div className="counter">
      <div className="controls">
        <p>
          <h4>Productos disponibles: {availableProducts}</h4>
        </p>
        <button onClick={decrement} className="btnItemCount">
          -
        </button>
        <h4 className="numberItemCount">{quantity}</h4>
        <button onClick={increment} className="btnItemCount">
          +
        </button>
      </div>
      <div>
        <button
          className="btnItemCount"
          onClick={handleUpdateQuantity}
          disabled={quantity > availableProducts}
        >
          Modificar cantidad
        </button>
      </div>
    </div>
  );
};

CountUpdateQuantity.propTypes = {
  initial: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default CountUpdateQuantity;
