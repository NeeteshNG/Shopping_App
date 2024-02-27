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
import { Box } from "@mui/material";

function App() {
  const {
    loggedIn,
    user,
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
    userWishlistProducts,
    wishlistQuantity,
    handleAddToCart,
    handleLogout,
    handleLogin,
    setUsername,
    setPassword,
    username, 
    password,
    handleSlide,
    currentIndex,
    quantity,
    handleIncrement,
    handleDecrement,
    selectedImageIndex,
    setSelectedImageIndex,
    formData,
    handleChangeOnRegister,
    handleSubmitOfRegister
  } = useAppController();

  return (
    <Router>
      <Box className="App">
        <Navbar 
          setLoggedIn={setLoggedIn} 
          loggedIn={loggedIn} 
          cartQuantity={cartQuantity}
          wishlistQuantity={wishlistQuantity}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route 
            path="/Shopping_App" 
            element={
              <Home 
                products={products} 
                handleSlide={handleSlide} 
                currentIndex={currentIndex}
                fetchCartProducts={fetchCartProducts} 
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
                userWishlistProducts={userWishlistProducts}
                handleAddToCart={handleAddToCart}
              />
            } 
          />
          <Route
            path="/loginpage"
            element={
              <ProtectedRoute
                element={
                  <LoginPage 
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                  />
                }
                authenticated={!loggedIn}
                redirectPath="/products"
              />
            }
          />
          <Route
            path="/registerPage"
            element={
              <ProtectedRoute
                element={
                  <RegisterForm 
                    formData={formData}
                    handleChange={handleChangeOnRegister}
                    handleSubmit={handleSubmitOfRegister}
                  />
                }
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
                handleAddToCart={handleAddToCart}
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
          <Route 
            path="/wishlist" 
            element={
              <Wishlist 
                products={userWishlistProducts}
                toggleWishlist={toggleWishlist} 
              />
            } 
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<ProfilePage user={user}/>}
                authenticated={loggedIn}
                redirectPath="/loginpage"
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductPage 
                products={products}
                handleAddToCart={handleAddToCart}
                toggleWishlist={toggleWishlist}
                quantity={quantity}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
              />
            }
          />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
