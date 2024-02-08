import Carrousel from "../../components/Home/Carrousel/Carrousel.jsx";
import ProductsListContainer from "../../components/ProductsUser/ProductsListContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import SecondSection from "../../components/Home/Carrousel/SecondSection.jsx";
const Home = () => {
  return (
    <>
      <Header />

      <Carrousel />
      <SecondSection />
      <ProductsListContainer />
    </>
  );
};

export default Home;
