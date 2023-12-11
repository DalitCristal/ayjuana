import logo from "/ay-juana-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navigation/NavBar.jsx";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRole } from "../ProtectedRoute/rolDelUsuario.js";
//STYLES
import "./Header.css";

const Header = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const roleFromCookies = getUserRole();

    setUserRole(roleFromCookies);
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
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              isActive ? "ActiveOptionH" : "OptionH"
            }
          >
            <PersonIcon />
          </NavLink>
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              isActive ? "ActiveOptionH" : "OptionH"
            }
          >
            <ShoppingCartIcon />
          </NavLink>
        </ul>
      </div>
      <Navbar userRole={userRole || "user"} />
    </>
  );
};

export default Header;
