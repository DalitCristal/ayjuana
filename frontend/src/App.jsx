import { BrowserRouter, Route, Routes } from "react-router-dom";
//PAGES
import Register from "./pages/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import Home from "./pages/Home/Home.jsx";
import Details from "./pages/Details.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
//COMPONENTS
import Header from "./components/Header/Header.jsx";
import EditProfile from "./components/Profile/EditProfile.jsx";
import ProductsListContainerAdmin from "./components/ProductsAdmin/ProductsListContainerAdmin.jsx";
import NewProduct from "./components/ProductsAdmin/NewProduct.jsx";
import EditProduct from "./components/ProductsAdmin/EditProduct.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import DeleteProduct from "./components/ProductsAdmin/DeleteProduct.jsx";
import Unauthorized from "./components/ProtectedRoute/Unauthorized.jsx";
import ProductsByCategory from "./components/ProductsUser/ProductsByCategory.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Details />} />
          <Route
            path="/category/:categoryName"
            element={<ProductsByCategory />}
          />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/contact" element={"<Contact />"} />

          <Route
            path="/products"
            element={
              <ProtectedRoute role={["admin", "premium"]}>
                <ProductsListContainerAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/create"
            element={
              <ProtectedRoute role={["admin", "premium"]}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/edit/:productId"
            element={
              <ProtectedRoute role={["admin", "premium"]}>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/delete/:productId"
            element={
              <ProtectedRoute role={["admin", "premium"]}>
                <DeleteProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
