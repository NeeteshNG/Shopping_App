import "./registerPage.css";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterForm = ({ formData, handleChange, handleSubmit }) => {
  const navigate = useNavigate();

  const handleSubmitButton = async (e) => {
    await handleSubmit(e);
    navigate("/loginpage");
  };

  return (
      <div className="content-body">
        <div className="signup">
          <div className="reg-content">
            <h2>Register</h2>

            <div className="reg-form">
              <div className="reg-input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />{" "}
                <i>Email</i>
              </div>

              <div className="reg-input">
                <input
                  type="username"
                  name="username"
                  value={formData.username}
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
              <div className="reg-input-register" onClick={handleSubmitButton}>
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
