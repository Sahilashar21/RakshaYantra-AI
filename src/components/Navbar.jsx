import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShieldAlt, FaHome, FaEnvelope, FaChartBar } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaShieldAlt className="brand-icon" />
          <span>Rakshayantra</span>
        </Link>

        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <FaHome /> Home
          </Link>
          <Link 
            to="/inbox" 
            className={`nav-link ${location.pathname === "/inbox" ? "active" : ""}`}
          >
            <FaEnvelope /> Inbox
          </Link>
          <Link 
            to="/reports" 
            className={`nav-link ${location.pathname === "/reports" ? "active" : ""}`}
          >
            <FaChartBar /> Reports
          </Link>
        </div>
      </div>
    </nav>
  );
}
