//HOOK
import { useContext } from "react";
//CONTEXT
import { CartContext } from "../../context/CartContext.jsx";
//COMPONENT
import CartItem from "../Cart/CartItem.jsx";
//REACT ROUTER DOM
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, emptyCart, totalQuantity, total } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <section className="cart">
        <h2 className="alert">El carrito de compras se encuentra vacio</h2>
        <Link to={"/"} className="option">
          Productos
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="cartConProducts">
        <h3>Productos</h3>

        <section className="containerPorducts">
          {cart.map((p, index) => (
            <CartItem key={index} {...p} />
          ))}
        </section>
        <h3 className="total">Total a pagar: ${total} </h3>
        <button onClick={() => emptyCart()} className="btn">
          Vaciar carrito
        </button>
        <Link to="/checkout" className="option">
          Finalizar compra
        </Link>
      </section>
    </>
  );
};

export default Cart;
