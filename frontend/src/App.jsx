import { BrowserRouter, Route, Routes } from "react-router-dom";
//PAGES
import Registerr from "./pages/Registerr.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Details from "./pages/Details.jsx";
import Error from "./pages/Error.jsx";
//COMPONENTS
import Header from "./components/Header/Header.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import EditProfile from "./components/Profile/EditProfile.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registerr />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/edit-profile/:userId/:token"
            element={<EditProfile />}
          />

          <Route path="/contact" element={"<Contact />"} />
          <Route path="/profile" element={"<Profile />"} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
