import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="body-navbar">
      <ul className="nav-links">
        <li>
          <Link to='/' className="nav-buttons">Home</Link>
        </li>
        <li className="center">
          <Link to='/products' className="nav-buttons">Products</Link>
        </li>
        <li className="upward">
          <Link to='/cart' className="nav-buttons">Cart</Link>
        </li>
        <li className="forward">
          <Link to='/wishlist' className="nav-buttons">Wishlist</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
