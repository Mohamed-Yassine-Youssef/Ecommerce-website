import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import { useSelector } from "react-redux";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <BrowserRouter>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/shipping"
              element={userInfo ? <ShippingScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment"
              element={userInfo ? <PaymentScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/placeorder"
              element={
                userInfo ? <PlaceOrderScreen /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/order/:id"
              element={userInfo ? <OrderScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={userInfo ? <ProfileScreen /> : <Navigate to="/login" />}
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/cart"
              element={userInfo ? <CartScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart/:id"
              element={userInfo ? <CartScreen /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/userlist"
              element={
                userInfo && userInfo.isAdmin ? (
                  <UserListScreen />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/user/:id/edit"
              element={
                userInfo && userInfo.isAdmin ? (
                  <UserEditScreen />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/productList"
              element={
                userInfo && userInfo.isAdmin ? (
                  <ProductListScreen />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/product/:id/edit"
              element={
                userInfo && userInfo.isAdmin ? (
                  <ProductEditScreen />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/orderList"
              element={
                userInfo && userInfo.isAdmin ? (
                  <OrderListScreen />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/search/:keyword" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
