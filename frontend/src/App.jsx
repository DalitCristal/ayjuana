import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
//PAGES
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import Home from "./pages/Home/Home.jsx";
import Details from "./pages/Details.jsx";
import Error from "./pages/Error.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Logout from "./pages/Logout.jsx";
import DeleteMyAccount from "./pages/Profile/deleteProfile.jsx";
import Cart from "./pages/Cart/Cart.jsx";
//COMPONENTS
import EditProfile from "./components/Profile/EditProfile.jsx";
import ProductsListContainerAdmin from "./components/ProductsAdmin/ProductsListContainerAdmin.jsx";
import NewProduct from "./components/ProductsAdmin/NewProduct.jsx";
import EditProduct from "./components/ProductsAdmin/EditProduct.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import DeleteProduct from "./components/ProductsAdmin/DeleteProduct.jsx";
import Unauthorized from "./components/ProtectedRoute/Unauthorized.jsx";
import ProductsByCategory from "./components/ProductsUser/ProductsByCategory.jsx";
import UsersListContainer from "./components/UsersAdmin/UsersListContainer.jsx";
import EditUser from "./components/UsersAdmin/EditUser.jsx";
import DeleteUser from "./components/UsersAdmin/DeleteUser.jsx";
import Contact from "./pages/Contact.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product/:id" element={<Details />} />
            <Route
              path="/category/:categoryName"
              element={<ProductsByCategory />}
            />
            <Route path="/login/forgot-password" element={<ForgotPassword />} />
            <Route path="/edit-profile/:userId" element={<EditProfile />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/cart/:userId"
              element={
                <ProtectedRoute role={["admin", "user"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
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
              path="/users"
              element={
                <ProtectedRoute role={"admin"}>
                  <UsersListContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <ProtectedRoute role={"admin"}>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/delete/:userId"
              element={
                <ProtectedRoute role={"admin"}>
                  <DeleteUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/delete/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <DeleteMyAccount />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
