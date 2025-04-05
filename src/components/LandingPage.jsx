import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'; // Import custom CSS
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div className="landing-container">

    
      <main className="main-content">
        <h1 className="main-title">Serene Apartments</h1>
        <p className="main-description">Modern Living in Peaceful Surroundings</p>

        <Link to="/apartments" className="cta-button">View Apartments</Link>
      </main>
      <Navbar/>
    </div>
  );
};

export default LandingPage;
