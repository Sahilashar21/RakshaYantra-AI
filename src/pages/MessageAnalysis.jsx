import React, { useState } from "react";
import axios from "axios";
import { FaLink, FaExclamationCircle, FaCheck, FaTimes } from "react-icons/fa";
import "../styles/MessageAnalysis.css";

const MessageAnalysis = () => {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeMessage = async () => {
    if (!message.trim()) {
      setError("Please paste a message to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze-message",
        { message },
        { withCredentials: true }
      );

      setAnalysis(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to analyze message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case "SAFE":
        return <FaCheck className="icon safe" />;
      case "SUSPICIOUS":
        return <FaExclamationCircle className="icon suspicious" />;
      case "MALICIOUS":
        return <FaTimes className="icon dangerous" />;
      default:
        return <FaExclamationCircle className="icon" />;
    }
  };

  return (
    <div className="message-analysis-container">
      {/* Background gradient */}
      <div className="analysis-bg-gradient"></div>

      {/* Header */}
      <div className="analysis-header">
        <h1>💬 WhatsApp & SMS Phishing Detection</h1>
        <p className="subtitle">
          Paste your messages to detect phishing links and fraudulent intent
        </p>
      </div>

      <div className="analysis-content">
        {/* Input Section */}
        <div className="input-section">
          <div className="input-card">
            <label className="input-label">Paste Message Here</label>
            <textarea
              className="message-input"
              placeholder="Paste your WhatsApp, SMS, or any message text here...&#10;&#10;Example: 'Click here to claim your Amazon gift card: bit.ly/xyz123'"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
            />
            <div className="input-footer">
              <span className="char-count">
                {message.length} characters
              </span>
              <button
                className="analyze-btn"
                onClick={analyzeMessage}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-icon">⏳</span> Analyzing...
                  </>
                ) : (
                  <>
                    <span>🔍</span> Analyze Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-alert">
            <FaExclamationCircle /> {error}
          </div>
        )}

        {/* Results Section */}
        {analysis && (
          <div className="results-section">
            <div className="verdict-card">
              <div className="verdict-header">
                {getVerdictIcon(analysis.verdict)}
                <div className="verdict-text">
                  <h2>{analysis.verdict}</h2>
                  <p>Risk Score: {analysis.finalScore}%</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat">
                  <span className="stat-label">Links Found</span>
                  <span className="stat-value">{analysis.links.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Suspicious</span>
                  <span className="stat-value suspicious">
                    {
                      analysis.urlScans.filter(
                        (u) => u.heuristicVerdict === "SUSPICIOUS"
                      ).length
                    }
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Malicious</span>
                  <span className="stat-value danger">
                    {
                      analysis.urlScans.filter(
                        (u) => u.heuristicVerdict === "MALICIOUS"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Layer Security Analysis */}
            {analysis.links.length > 0 && (
              <div className="security-analysis">
                <h3>🔐 4-Layer Security Analysis</h3>

                {/* Layer 1: URLs */}
                <div className="analysis-layer">
                  <h4>
                    <span className="layer-badge">1</span> URL Analysis
                  </h4>
                  <div className="links-list">
                    {analysis.urlScans.map((scan, idx) => (
                      <div
                        key={idx}
                        className={`link-item ${scan.heuristicVerdict.toLowerCase()}`}
                      >
                        <div className="link-main">
                          <FaLink className="link-icon" />
                          <div className="link-details">
                            <div className="link-url">{scan.url}</div>
                            <div className="link-verdict">
                              {scan.heuristicVerdict}
                              {scan.heuristicScore > 0 && ` (${scan.heuristicScore})`}
                            </div>
                          </div>
                        </div>
                        {scan.heuristicFindings.length > 0 && (
                          <div className="link-findings">
                            <strong style={{fontSize: '0.9rem', display: 'block', marginBottom: '8px'}}>
                              ⚠️ Issues Detected:
                            </strong>
                            {scan.heuristicFindings.map((f, i) => (
                              <div key={i} className="finding-tag" style={{display: 'block', marginBottom: '6px', fontSize: '0.85rem'}}>
                                • {f}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer 2: Safe Browsing */}
                {analysis.urlScans.some((u) => u.googleThreat) && (
                  <div className="analysis-layer">
                    <h4>
                      <span className="layer-badge">2</span> Google Safe
                      Browsing
                    </h4>
                    <div className="findings-list">
                      {analysis.urlScans
                        .filter((u) => u.googleThreat)
                        .map((u, i) => (
                          <div key={i} className="finding-item danger">
                            ⚠️ {u.url}: {u.googleThreat}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Layer 3: Heuristics */}
                <div className="analysis-layer">
                  <h4>
                    <span className="layer-badge">3</span> Pattern Analysis
                  </h4>
                  <div className="heuristics-info">
                    <p>
                      🤖 AI-powered analysis of phishing patterns, shorteners,
                      suspicious domains, and fraudulent intent detection
                    </p>
                  </div>
                </div>

                {/* Layer 4: Intent Detection */}
                <div className="analysis-layer">
                  <h4>
                    <span className="layer-badge">4</span> Intent Detection
                  </h4>
                  <div className="intent-analysis">
                    <p>
                      🎯 Analyzing message for phishing intent, urgency tactics,
                      credential harvesting, and fraud patterns
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="recommendations">
              <h3>✅ Safety Recommendations</h3>
              <ul>
                {analysis.verdict === "MALICIOUS" && (
                  <>
                    <li>🚫 Do NOT click any links in this message</li>
                    <li>📱 Report this message as spam/phishing</li>
                    <li>🔐 Do NOT share any personal information</li>
                  </>
                )}
                {analysis.verdict === "SUSPICIOUS" && (
                  <>
                    <li>⚠️ Be cautious before clicking links</li>
                    <li>🔍 Verify the sender independently</li>
                    <li>🛡️ Never share sensitive data through links</li>
                  </>
                )}
                {analysis.verdict === "SAFE" && (
                  <>
                    <li>✅ This message appears to be safe</li>
                    <li>🔗 Links have passed security checks</li>
                    <li>📧 Remember to stay vigilant always</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageAnalysis;
