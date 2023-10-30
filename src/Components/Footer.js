// Footer.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>
            This is the Shopping App that was Given as a Task to implement React
            Learnings that we have learned so Far. You can also go through the
            GitHub repository to see how this task is implemented from the
            scratch.
          </p>
          <ul className="ul_git">
            <li className="il_git">
              <a
                href="https://github.com/NeeteshNG/MyTaskBestPeers_4"
                rel="noreferrer"
                target="_blank"
                title="Git Repo"
                className="git-click"
              >
                <i className="fab fa-github size_git"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: neeteshng@gmail.com</p>
          <p>Phone: +91 70008 35163</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Neetesh Gupta. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
