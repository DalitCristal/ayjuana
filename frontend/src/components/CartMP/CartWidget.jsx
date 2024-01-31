import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookiesByName } from "../../utils/formsUtils";
import { HOST, PORT_BACK } from "../../config/config";
import Swal from "sweetalert2";

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

        const response = await fetch(`${HOST}${PORT_BACK}/api/carts/${cid}`, {
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
          Swal.fire({
            title: `Error al obtener la cantidad total del carrito: ${data.mensaje} `,
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error inesperado al obtener la cantidad total del carrito: ${error} `,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
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
