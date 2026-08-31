import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <h2 className="footer-brand">TheatreHub</h2>
          <p className="footer-description">
            Your ultimate cinematic experience. Discover, review, and track the greatest movies of all time.
          </p>
        </div>
        
        <div className="footer-section links-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/movies">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        
        <div className="footer-section social-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>TheatreHub &copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}
