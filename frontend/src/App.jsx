import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
//COMPONENTS
import Registerr from "./components/Registerr.jsx";
import Login from "./components/Login";
import Home from "./pages/Home/Home.jsx";
import NewProduct from "./components/NewProduct";
import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registerr />} />
            <Route path="/products" element={<h1>Todos los productos</h1>} />
            <Route path="/add-product" element={<NewProduct />} />
            <Route path="/product/:id" element={<h1>Un solo producto</h1>} />
            <Route
              path="/products/:categoryId"
              element={<h1>Productos por categoria</h1>}
            />
            <Route path="/contact" element={<h1>Contacto</h1>} />
            <Route path="/profile" element={<h1>Perfil de usuario</h1>} />
            <Route path="*" element={<h1>Error</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
