import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: ""
    });

    const [message, setMessage] = useState(""); // Store response message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); 

        const requestData = {
            email: formData.email,
            username: formData.fullName, // Map fullName to username for Flask
            password: formData.password,
            role: formData.role,
        };

        try {
            const response = await fetch("http://127.0.0.1:5555/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("User registered successfully!");
                setFormData({ fullName: "", email: "", password: "", role: "" });
            } else {
                setMessage(data.error || "Signup failed.");
            }
        } catch (error) {
            setMessage("Error connecting to server.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-10">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header text-center bg-gradient bg-primary text-white rounded-top">
                            <h3 className="mb-0">Signup - Mirema Apartments</h3>
                        </div>
                        <div className="card-body p-4">
                            {message && <div className="alert alert-info">{message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email Address</label>
                                    <input type="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Role</label>
                                    <select className="form-select form-select-lg" name="role" value={formData.role} onChange={handleChange} required>
                                        <option value="">Select Role</option>
                                        <option value="manager">Manager</option>
                                        <option value="landlord">Landlord</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
