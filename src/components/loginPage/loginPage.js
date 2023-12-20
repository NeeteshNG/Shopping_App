import React, { useState } from "react";
import "./loginPage.css"
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          setLoggedIn(true);
          dispatch(login({ user: data.user }));
          navigate("/products");
          localStorage.setItem("loggedIn", "true");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="signin">
        <div className="content">
          <h2>Log In</h2>

          <div className="form">
            <div className="inputBox">
              <input
                type="text"
                value={username}
                autoComplete="off"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />{" "}
              <i>Username</i>
            </div>

            <div className="inputBox">
              <input
                type="password"
                value={password}
                autoComplete="off"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />{" "}
              <i>Password</i>
            </div>
            <div className="inputBox" onClick={handleLogin}>
              <input type="submit" value="Login" />
            </div>
          </div>
            <p className="register-text">Not a Member ?  <Link to="/registerPage">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
