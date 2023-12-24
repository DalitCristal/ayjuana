import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (!isInCart(item._id)) {
      setCart((prev) => [...prev, { item, quantity }]);
      console.log("producto agregado");
    } else {
      console.error("El producto ya fue agregado");
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((prod) => {
      if (prod.item._id === itemId) {
        return { ...prod, quantity: newQuantity };
      }
      return prod;
    });

    setCart(updatedCart);
  };

  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((prod) => prod.item._id !== itemId);
    setCart(cartUpdated);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some((prod) => prod.item._id === itemId);
  };

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const total = cart.reduce(
    (acc, product) => acc + product.item.price * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateItemQuantity,
        removeItem,
        emptyCart,
        totalQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
