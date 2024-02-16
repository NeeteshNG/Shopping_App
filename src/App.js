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
  const [cartQuantity, setCartQuantity] = useState(0)

  const [userCartInfo, setUserCartInfo] = useState([]);
  const [userCartProducts, setUserCartProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () =>  {
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

  const fetchCartProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        "http://127.0.0.1:8000/cartApi/cart-items/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const userCartProductsInfo = data

      setUserCartInfo(data)

      const authUserIdInfo = userCartProductsInfo.filter((id_of) => (
        id_of.user === user.id
      ))

      const filteredProducts = authUserIdInfo.map((info) => {
        const product = products.find((item) => item.id === info.product);
        if (product) {
          return { ...product, quantity: info.quantity };
        }
        return null;
      }).filter(Boolean);

      setUserCartProducts(filteredProducts)
      setCartQuantity(filteredProducts.length)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCartProducts();

    const userIsLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (userIsLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} cartQuantity={cartQuantity}/>
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
            element={<Products fetchCartProducts={fetchCartProducts} products={products} authenticated={loggedIn} />}
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                products={products} 
                setCartQuantity={setCartQuantity} 
                fetchCartProducts={fetchCartProducts}
                userCartInfo={userCartInfo}
                setUserCartInfo={setUserCartInfo}
                userCartProducts={userCartProducts}
                setUserCartProducts={setUserCartProducts}
              />
            } 
          />
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
