import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux_User/userSlice";
import { useNavigate } from "react-router";

const usersData = [
  {
    id: 1,
    names: "Neetesh Gupta",
    address: "Ashoknagar",
    phone: "+91-7000835163",
    username: "Neetesh",
    password: "neetesh@123",
    cart: [],
  },
  {
    id: 2,
    names: "Shri Yadav",
    address: "Banglore",
    phone: "+91-9815421421",
    username: "Shri",
    password: "shri@123",
    cart: [],
  },
  {
    id: 3,
    names: "Rahul Khanna",
    address: "Mumbai",
    phone: "+91-8741216598",
    username: "Rahul",
    password: "rahul@123",
    cart: [],
  },
  {
    id: 4,
    names: "Rohit Mishra",
    address: "Bhopal",
    phone: "+91-9875110647",
    username: "Rohit",
    password: "rohit@123",
    cart: [],
  },
  {
    id: 5,
    names: "Deepak Sahu",
    address: "Ujjain",
    phone: "+91-9874556252",
    username: "Deepak",
    password: "deepak@123",
    cart: [],
  },
  {
    id: 6,
    names: "Deepti Vishw",
    address: "Shimla",
    phone: "+91-9787254544",
    username: "Deepti",
    password: "deepti@123",
    cart: [],
  },
  {
    id: 7,
    names: "Shruti Chouhan",
    address: "Kashmir",
    phone: "+91-9754627546",
    username: "Shruti",
    password: "shruti@123",
    cart: [],
  },
  {
    id: 8,
    names: "Kapil Bhati",
    address: "Kota",
    phone: "+91-9724254211",
    username: "Kapil",
    password: "kapil@123",
    cart: [],
  },
  {
    id: 9,
    names: "Piyush Sharma",
    address: "Indore",
    phone: "+91-8925484132",
    username: "Piyush",
    password: "piyush@123",
    cart: [],
  },
];

const LoginPage = ({ setLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = usersData.find(
      (user) => user.username === username && user.password === password,
    );

    if (user) {
      setLoggedIn(true);
      dispatch(login({ user }));
      navigate("/products");
      localStorage.setItem("loggedIn", "true");
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
