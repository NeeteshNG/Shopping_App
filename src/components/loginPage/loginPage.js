import React, { useState } from "react";
import "./loginPage.css"
import { useDispatch } from "react-redux";
import { login } from "../../Redux/userSlice";
import { useNavigate } from "react-router";

const LoginPage = ({ setLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
