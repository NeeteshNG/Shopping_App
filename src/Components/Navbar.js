import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="body-navbar">
      <ul class="nav-links">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li class="center">
          <Link to='/products'>Products</Link>
        </li>
        <li class="upward">
          <Link to='/cart'>Cart</Link>
        </li>
        <li class="forward">
          <Link to='/wishlist'>Wishlist</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
