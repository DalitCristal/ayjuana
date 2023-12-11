import PropTypes from "prop-types";
//STYLES
import "./NavBar.css";
//COMPONENTS
import NavGeneral from "./NavGeneral";
import ProductActionsDropdown from "./ProductActionsDropdown";

const Navbar = ({ userRole }) => {
  return (
    <nav className="navBar">
      {userRole === "admin" && (
        <>
          {/* Menú para admin */}
          <NavGeneral />
          <ProductActionsDropdown />
        </>
      )}

      {userRole === "premium" && (
        <>
          {/* Menú para premium */}
          <NavGeneral />
          <ProductActionsDropdown />
        </>
      )}

      {userRole !== "admin" && userRole !== "premium" && (
        /* Menú para usuarios regulares */
        <NavGeneral />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Navbar;
