import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData } from "../../utils/fetchUserData";
import Cart from "./Cart";
import "./CartListContainer.css";

const CartListContainer = () => {
  const { userId } = useParams();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Obtener el ID del carrito
        const userData = await fetchUserData(userId);
        const cid = userData.data.cart;

        // Obtener detalles del carrito usando el ID del carrito
        const response = await fetch(`http://localhost:8080/api/carts/${cid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.status === 200) {
          setCart(data.mensaje);
        } else {
          console.error("Error al obtener el carrito:", data.mensaje);
        }
      } catch (error) {
        console.error("Error inesperado al obtener el carrito:", error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleAddToCart = async (productId, quantity) => {
    const cid = cart._id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cid}/products/${productId}` /* de donde saco productId */,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setCart(data.mensaje);
      } else {
        console.error("Error al agregar producto al carrito:", data.mensaje);
      }
    } catch (error) {
      console.error("Error inesperado al agregar producto al carrito:", error);
    }
  };

  if (!cart) {
    return <p>Cargando carrito...</p>;
  }
  return (
    <>
      <Header />
      <div className="cartContainer">
        <h2 className="cartTitle">Detalles del Carrito</h2>
        <p className="cartId">ID: {cart._id}</p>
        <>
          <Cart products={cart.products} onAddToCart={handleAddToCart} />
        </>
      </div>
    </>
  );
};

export default CartListContainer;
