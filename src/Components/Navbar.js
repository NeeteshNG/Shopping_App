import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="body-navbar">
      <ul class="nav-links">
        <li>
          <Link to='/' className="nav-buttons">Home</Link>
        </li>
        <li class="center">
          <Link to='/products' className="nav-buttons">Products</Link>
        </li>
        <li class="upward">
          <Link to='/cart' className="nav-buttons">Cart</Link>
        </li>
        <li class="forward">
          <Link to='/wishlist' className="nav-buttons">Wishlist</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
