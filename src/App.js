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
import ProfilePage from "./components/profilePage/profilePage";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import RegisterForm from "./components/registerPage/registerPage";
import useAppController from "./AppController";

function App() {
  const {
    loggedIn,
    setLoggedIn,
    products,
    cartQuantity,
    setCartQuantity,
    userCartInfo,
    setUserCartInfo,
    userCartProducts,
    setUserCartProducts,
    fetchCartProducts,
    removeItemFromCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    totalAmountOfCart,
    toggleWishlist,
    isInWishlist,
    userWishlistProducts
  } = useAppController();

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
            element={
              <Products 
                fetchCartProducts={fetchCartProducts} 
                products={products} 
                authenticated={loggedIn}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
                userWishlistProducts={userWishlistProducts}
              />
            }
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
                removeItem={removeItemFromCart}
                incrementQuantity={incrementCartItemQuantity}
                decrementQuantity={decrementCartItemQuantity}
                totalAmount={totalAmountOfCart}
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
