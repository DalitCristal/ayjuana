//REACT
import { BrowserRouter, Route, Routes } from "react-router-dom";

//CONTEXT
import { CartProvider } from "./context/CartContext.jsx";

//PAGES
import Home from "./pages/Home/Home.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword.jsx";
import SignOff from "./pages/SignOff/SignOff.jsx";
import Details from "./pages/Products/Details.jsx";
import Category from "./pages/Products/Category.jsx";
import PutPassword from "./pages/Profile/PutPassword.jsx";
//import Contact from "./pages/Contact.jsx";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";
import Error from "./pages/Error.jsx";

//PÁGINAS PROTEGIDAS
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import AdminProducts from "./pages/Products/AdminProducts.jsx";
import NewProduct from "./pages/Products/NewProduct.jsx";
import EditProd from "./pages/Products/EditProd.jsx";
import DeleteProd from "./pages/Products/DeleteProd.jsx";
import GetUsersAdmin from "./pages/UsersAdmin/GetUsersAdmin.jsx";
import EditRol from "./pages/UsersAdmin/EditRol.jsx";
import DeleteUsersAdmin from "./pages/UsersAdmin/DeleteUsersAdmin.jsx";
import GetProfile from "./pages/Profile/GetProfile.jsx";
import DeleteProfile from "./pages/Profile/deleteProfile.jsx";

//STYLES
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/login/forgot-password"
              element={<RecoverPassword />}
            />
            <Route path="/logout" element={<SignOff />} />

            <Route path="/product/:id" element={<Details />} />
            <Route path="/category/:categoryName" element={<Category />} />

            <Route path="/edit-profile/:userId" element={<PutPassword />} />
            {/*             <Route path="/contact" element={<Contact />} />
             */}
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
                  <AdminProducts />
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
                  <EditProd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/delete/:productId"
              element={
                <ProtectedRoute role={["admin", "premium"]}>
                  <DeleteProd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute role={"admin"}>
                  <GetUsersAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <ProtectedRoute role={"admin"}>
                  <EditRol />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/delete/:userId"
              element={
                <ProtectedRoute role={"admin"}>
                  <DeleteUsersAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <GetProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/delete/:userId"
              element={
                <ProtectedRoute role={["admin", "premium", "user"]}>
                  <DeleteProfile />
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
