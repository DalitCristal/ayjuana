import { Link } from "react-router-dom";
import "./secondSection.css";

const SecondSection = () => {
  return (
    <div className="secondSection">
      <h2 className="titleSection">Explorá nuestros productos</h2>
      <p className="paragraphSection">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis iusto
        ea
      </p>
      <div className="imageContainer">
        <Link to={`/category/coat`} className="linkSection">
          <div className="cardSection">
            <img
              src="../../public/ay-juana-ropa-feminina.jpg"
              alt="Categoría de ropa femenina"
              className="imageSection"
            />
            <h3 className="h3Section">Colección femenina</h3>
          </div>
        </Link>
        <Link to={`/category/coat`} className="linkSection">
          <div className="cardSection">
            <img
              src="../../public/ay-juana-ropa-niñas-niños.jpg"
              alt="Categoría de ropa infantil"
              className="imageSection"
            />
            <h3 className="h3Section">Colección infantil</h3>
          </div>
        </Link>
        <Link to={`/category/coat`} className="linkSection">
          <div className="cardSection">
            <img
              src="../../public/ay-juana-ropa-masculina.jpg"
              alt="Categoría de ropa masculina"
              className="imageSection"
            />
            <h3 className="h3Section">Colección masculina</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SecondSection;
