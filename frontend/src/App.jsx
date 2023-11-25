import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
//PAGES
import Registerr from "./pages/Registerr.jsx";
import Loginn from "./pages/Loginn.jsx";
import Home from "./pages/Home/Home.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import ProductsListContainer from "./pages/ProductsListContainer.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import Error from "./pages/Error.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
//COMPONENTS
import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Loginn />} />
            <Route path="/register" element={<Registerr />} />
            <Route
              path="/products/:categoryId"
              element={<ProductsListContainer />}
            />
            <Route path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductsListContainer />} />
              <Route path="/add-product" element={<NewProduct />} />
              <Route path="/product/:id" element={<NewProduct />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
