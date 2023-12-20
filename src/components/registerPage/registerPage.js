import "./registerPage.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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
    <div className="register-form-body">
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
