import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allproducts from "./pages/allproducts/Allproducts";
import Favorites from "./pages/favorites/Favorites";
import CategoryProducts from "./components/category/categoryProducts/CategoryProducts";
import Return from "./pages/returnpolicy/returnPolicy";
import './index.css'

function App() {
  
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/vjyothi-ecommerce/" element={<Home />} />
          <Route path="/vjyothi-ecommerce/allproducts" element={<Allproducts />} />
          <Route
            path="/vjyothi-ecommerce/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/vjyothi-ecommerce/favorites" element={<Favorites />} />
          <Route
            path="/vjyothi-ecommerce/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vjyothi-ecommerce/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/vjyothi-ecommerce/login" element={<Login />} />
          <Route path="/vjyothi-ecommerce/signup" element={<Signup />} />
          <Route path="/vjyothi-ecommerce/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/vjyothi-ecommerce/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/vjyothi-ecommerce/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/vjyothi-ecommerce/:categoryproducts"
            element={<CategoryProducts />}
          />
          <Route path="/*" element={<NoPage />} />
          <Route path="/vjyothi-ecommerce/returnpolicy" element={<Return />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/vjyothi-ecommerce/login"} />;
  }
};

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin.user.email === "rajesh2kkid@gmail.com") {
    return children;
  } 
  else  {
    return <Navigate to={"/vjyothi-ecommerce/login"} />;
  }

};
