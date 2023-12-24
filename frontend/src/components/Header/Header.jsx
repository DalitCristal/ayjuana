import logo from "/ay-juana-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navigation/NavBar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole, getUserId } from "../ProtectedRoute/rolDelUsuario.js";
import CartWidget from "../Cart/CartWidget.jsx";
//STYLES
import "./Header.css";

const Header = () => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const roleFromCookies = getUserRole();

    setUserRole(roleFromCookies);
  }, []);

  useEffect(() => {
    const idFromCookies = getUserId();

    setUserId(idFromCookies);
  }, []);

  return (
    <>
      <div className="headerContainer">
        <div className="logoHeader">
          <img src={logo} alt="ay juana logo" />
        </div>
        <form className="headerFormu">
          <input
            className="inputHerderFormu"
            type="search"
            placeholder="Buscar..."
            aria-label="Search"
          />
          <button className="btnHeaderFormu" type="submit">
            <SearchIcon />
          </button>
        </form>
        <ul className="buttonsHeader">
          {userRole ? (
            <>
              <li>
                <Link to={`/profile/${userId}`}>
                  <PersonIcon />
                </Link>
              </li>
              <li>
                <Link to="/logout">Cerrar Sesión</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
          <CartWidget />
        </ul>
      </div>
      <Navbar userRole={userRole || "user"} />
    </>
  );
};

export default Header;
