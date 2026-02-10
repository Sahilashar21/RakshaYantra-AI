import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import { FaShieldAlt, FaEnvelope, FaLink, FaRobot, FaChartBar, FaCheckCircle } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <FaShieldAlt className="hero-icon" /> Email Security Made Simple
            </h1>
            <p className="hero-subtitle">
              Protect yourself from phishing, malware, and suspicious emails with intelligent security analysis.
            </p>
            <div className="hero-buttons">
              <Link to="/inbox" className="btn btn-primary">
                <FaEnvelope /> Go to Inbox
              </Link>
              <a href="#features" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="shield-animation">🛡️</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Rakshayantra?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaLink />
            </div>
            <h3>Link Analysis</h3>
            <p>Automatically extract and analyze all links in your emails. Detect malicious URLs before you click them.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartBar />
            </div>
            <h3>Threat Detection</h3>
            <p>Real-time scanning with Safe Browsing and VirusTotal APIs to identify phishing and malware threats.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaCheckCircle />
            </div>
            <h3>Email Verification</h3>
            <p>Verify sender authenticity and check for spoofed or suspicious sender addresses.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRobot />
            </div>
            <h3>AI Assistant</h3>
            <p>Get instant help from our AI chatbot for understanding security threats and best practices.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaEnvelope />
            </div>
            <h3>Gmail Integration</h3>
            <p>Seamlessly connect your Gmail account and scan your inbox directly. Safe and secure OAuth integration.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Privacy First</h3>
            <p>Your data is never stored. All scanning is performed securely and temporarily for your analysis only.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Login</h3>
            <p>Connect your Gmail account securely using OAuth authentication.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Scan</h3>
            <p>Our system automatically analyzes emails for threats and suspicious links.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Review</h3>
            <p>Get detailed reports on each email's security status and recommended actions.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Act</h3>
            <p>Make informed decisions about which emails are safe to interact with.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Secure Your Email?</h2>
        <p>Join thousands of users protecting themselves from email threats every day.</p>
        <Link to="/inbox" className="btn btn-primary btn-large">
          Start Now →
        </Link>
      </section>
    </div>
  );
}
