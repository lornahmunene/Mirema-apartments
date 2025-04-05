import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'; // Import custom CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const requestData = {
      email: formData.email,
      username: formData.fullName,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://127.0.0.1:5555/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({ fullName: "", email: "", password: "", role: "" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Image Section (optional) */}
        <div className="signup-image"></div>

        {/* Form Section */}
        <div className="signup-form">
          <h2 className="signup-title">Serene Suites - Sign Up</h2>

          {message && (
            <div className="message-alert">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button type="submit" className="submit-button">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <a href="/login" className="login-link-text">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
