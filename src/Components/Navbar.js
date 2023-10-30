import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ loggedIn, setLoggedIn }) {
  const cartNotification = useSelector((state) => state.list.cartNotification);
  const wishlistNotification = useSelector(
    (state) => state.list.wishlistNotification,
  );

  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <div className="body-navbar">
      <ul className="nav-links">
        <div className="left-buttons">
          <li>
            <Link to="/" className="nav-buttons">
              Home
            </Link>
          </li>
          {!loggedIn && (
            <li>
              <Link to="/loginpage" className="nav-buttons">
                Login
              </Link>
            </li>
          )}
          {loggedIn && (
            <li className="center">
              <Link to="/products" className="nav-buttons">
                Products
              </Link>
            </li>
          )}
        </div>
        <div className="right-buttons">
          <div className="nav-icon">
            {loggedIn && (
              <li style={{ position: "relative" }}>
                <Link to="/cart" className="nav-buttons">
                  <i className="fa fa-shopping-cart"></i>
                </Link>
                <div className="cart-dot">{cartNotification}</div>
              </li>
            )}
          </div>
          <div className="nav-icon">
            {loggedIn && (
              <li style={{ position: "relative" }}>
                <Link to="/wishlist" className="nav-buttons">
                  <i className="fa-solid fa-heart"></i>
                </Link>
                <div className="wishlist-dot">{wishlistNotification}</div>
              </li>
            )}
          </div>
          <div className="nav-icon">
            {loggedIn && (
              <li style={{ position: "relative" }}>
                <Link onClick={toggleDropDown} className="nav-buttons">
                  <i className="fa fa-user"></i>
                  <i
                    className={`fa ${
                      showDropDown ? "fa-caret-down" : "fa-caret-up"
                    }`}
                    style={{ fontSize: "15px" }}
                  ></i>
                </Link>
                <div
                  className={`dropdown-content ${showDropDown ? "show" : ""}`}
                >
                  <Link to="/profile">
                    <i className="fa-regular fa-address-card profile-button"></i>
                  </Link>
                  <Link onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket profile-button"></i>
                  </Link>
                </div>
              </li>
            )}
          </div>
        </div>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
