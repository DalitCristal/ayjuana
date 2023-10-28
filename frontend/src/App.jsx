import { BrowserRouter, Route, Routes } from "react-router-dom";
//COMPONENTS
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
