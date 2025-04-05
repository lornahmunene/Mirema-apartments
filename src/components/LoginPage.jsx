import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Importing custom CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const requestData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1500);  // Redirect to dashboard
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Serene Suites</h2>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
