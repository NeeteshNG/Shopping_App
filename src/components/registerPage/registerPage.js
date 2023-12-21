import "./registerPage.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialFormData = useState({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    address: "",
  });

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      console.log("Registration successful!", response.data);
      navigate("/loginpage");
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Registration failed!", error.response.data);
    }
  };

  return (
      <div className="register-container">
        <div className="signup">
          <div className="reg-content">
            <h2>Register</h2>

            <div className="reg-form">
              <div className="reg-input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />{" "}
                <i>Email</i>
              </div>

              <div className="reg-input">
                <input
                  type="username"
                  name="username"
                  value={formData.email}
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />{" "}
                <i>Username</i>
              </div>

              <div className="reg-input">
                <input
                  autoComplete="off"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />{" "}
                <i>Password</i>
              </div>

              <div className="reg-input">
                <input
                  autoComplete="off"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />{" "}
                <i>Name</i>
              </div>

              <div className="reg-input">
                <input
                  autoComplete="off"
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />{" "}
                <i>Phone Number</i>
              </div>

              <div className="reg-input">
                <input
                  autoComplete="off"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />{" "}
                <i>Address</i>
              </div>

            </div>
              <div className="reg-input-register" onClick={handleSubmit}>
                <input type="submit" value="REGISTER"/>
              </div>
            <p className="login-text">
              Already a Member ? <Link to="/loginpage">Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default RegisterForm;
