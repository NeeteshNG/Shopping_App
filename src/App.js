import "./App.css";
import Home from "./components/homepage/home";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/products/products";
import Cart from "./components/cartpage/cart";
import Wishlist from "./components/wishlistpage/wishlist";
import ProductPage from "./components/productPage/productPage";
import Footer from "./components/footer/footer";
import LoginPage from "./components/loginPage/loginPage";
import { useState } from "react";
import ProfilePage from "./components/profilePage/profilePage";
import { useEffect } from "react";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import RegisterForm from "./components/registerPage/registerPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/productsApi/products/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (userIsLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path="/Shopping_App" element={<Home products={products} />} />
          <Route
            path="/loginpage"
            element={
              <ProtectedRoute
                element={<LoginPage setLoggedIn={setLoggedIn} />}
                authenticated={!loggedIn}
                redirectPath="/products"
              />
            }
          />
          <Route
            path="/registerPage"
            element={
              <ProtectedRoute
                element={<RegisterForm />}
                authenticated={!loggedIn}
                redirectPath="/products"
              />
            }
          />
          <Route
            path="/products"
            element={<Products products={products} authenticated={loggedIn} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<ProfilePage />}
                authenticated={loggedIn}
                redirectPath="/loginpage"
              />
            }
          />
          <Route
            path="/products/:productId"
            element={<ProductPage products={products} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
