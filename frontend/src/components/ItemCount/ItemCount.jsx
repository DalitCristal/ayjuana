import PropTypes from "prop-types";
import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ initial, stock, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="counter">
      <div className="controls">
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
          onClick={() => onAdd(quantity)}
          disabled={!stock}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

ItemCount.propTypes = {
  initial: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ItemCount;
