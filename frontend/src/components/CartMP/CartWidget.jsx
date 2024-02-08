import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST } from "../../config/config";

const CartWidget = () => {
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = getCookiesByName("jwtCookie");

        if (!token) return;

        const { user } = JSON.parse(atob(token.split(".")[1]));
        const cid = user.cart;
        setUserId(user._id);

        const response = await fetch(`${HOST}/api/carts/${cid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        if (response.status === 200) {
          setTotalQuantity(
            data.mensaje.products.reduce(
              (acc, product) => acc + product.quantity,
              0
            )
          );
        } else {
          console.error(
            `Error al obtener la cantidad total del carrito: ${data.mensaje} `
          );
        }
      } catch (error) {
        console.error(
          `Error inesperado al obtener la cantidad total del carrito: ${error} `
        );
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="cartMenu">
      <Link to={`/cart/${userId}`}>
        <ShoppingCartIcon />
        {totalQuantity}
      </Link>
    </div>
  );
};

export default CartWidget;
