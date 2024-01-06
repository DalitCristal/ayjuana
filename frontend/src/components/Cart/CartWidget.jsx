import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getUserId } from "../ProtectedRoute/rolDelUsuario";
import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
  const [userId, setUserId] = useState("");

  const { totalQuantity } = useContext(CartContext);

  useEffect(() => {
    const idFromCookies = getUserId();

    setUserId(idFromCookies);
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
