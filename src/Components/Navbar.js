import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, setLoggedIn }) {
  const cartNotification = useSelector((state) => state.list.cartNotification);
  const wishlistNotification = useSelector(
    (state) => state.list.wishlistNotification
  );

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if(selectedValue === "profile"){
      navigate("/profile");
    }
    else if(selectedValue === "logout"){
      setLoggedIn(false);
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
    }
  }

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
                <select name="sel" className="drop-down-select" onChange={handleSelectChange}>
                  <option className="not-show-button">&#xf007;</option>
                  <option className="drop-down-button" value="profile">
                    &#xf2c2;
                  </option>
                  <option value="logout" className="drop-down-button">
                    &#xf2f5;
                  </option>
                </select>
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
