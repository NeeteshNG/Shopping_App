import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux_User/userSlice";
import { useNavigate } from "react-router";

const usersData = [
    {username : "user1", password : "user1"},
    {username : "user2", password : "user2"},
    {username : "user3", password : "user3"}
]

const LoginPage = ({setLoggedIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (isValidUser(username, password)) {
      setLoggedIn(true);
      dispatch(login({ user: { username } }));
      navigate('/products')
    } else {
    }
  };

  const isValidUser = (username, password) => {
    const user = usersData.find((user) => user.username === username);

    if (user && user.password === password) {
      return true;
    }
    return false;
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
