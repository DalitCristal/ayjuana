//REACT ROUTER DOM
import { NavLink } from "react-router-dom";
//STYLES
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="navBar">
        <ul className="buttonsNav">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            Inicio
          </NavLink>

          <NavLink
            to={`/category/coats`}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            Abrigos
          </NavLink>
          <NavLink
            to={`/category/pants`}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            Pantalones
          </NavLink>
          <NavLink
            to={`/category/t-shirts`}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            Remeras
          </NavLink>

          <NavLink
            to={"/contact"}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            Contacto
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
