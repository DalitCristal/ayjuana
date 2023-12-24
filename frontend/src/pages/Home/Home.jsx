import Carrousel from "../../components/Carrousel/Carrousel.jsx";
import ProductsListContainer from "../../components/ProductsUser/ProductsListContainer.jsx";
import Header from "../../components/Header/Header.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <Carrousel />
        <ProductsListContainer />
      </div>
    </>
  );
};

export default Home;
