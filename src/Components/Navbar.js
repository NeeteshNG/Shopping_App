import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="body-navbar">
      <ul className="nav-links">
        <div className="left-buttons">
          <li>
            <Link to='/' className="nav-buttons">Home</Link>
          </li>
          <li className="center">
            <Link to='/products' className="nav-buttons">Products</Link>
          </li>
        </div>
        <div className="right-buttons">
          <li className="upward">
            <Link to='/cart' className="nav-buttons"><i class="fa fa-shopping-cart"></i></Link>
          </li>
          <li className="forward">
            <Link to='/wishlist' className="nav-buttons"><i class="fa fa-heart-o"></i></Link>
          </li>
        </div>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
