import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/InboxPage.css";
import { FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaLink, FaEnvelope } from "react-icons/fa";

export default function InboxPage() {
  const [emails, setEmails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [body, setBody] = useState("");
  const [links, setLinks] = useState([]);
  const [analysis, setAnalysis] = useState(null); // Store all 4 layers
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [analyzingEmail, setAnalyzingEmail] = useState(false);

  // Load inbox
  useEffect(() => {
    api
      .get("/emails")
      .then((res) => {
        setEmails(res.data);
        setAuthenticated(true);
        setLoading(false);

        if (res.data.length > 0) {
          loadFullEmail(res.data[0].id, res.data[0]);
        }
      })
      .catch((err) => {
        console.error("INBOX LOAD ERROR:", err);
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  // Load full email body + links
  const loadFullEmail = (id, emailMeta) => {
    setSelected(emailMeta);
    setExpandedEmail(id);
    setAnalyzingEmail(true);
    // IMPORTANT: Reset body and analysis before fetching new email
    setBody("");
    setLinks([]);
    setAnalysis(null);

    // Add cache-busting parameter to prevent stale data
    api
      .get(`/email/${id}?t=${Date.now()}`)
      .then((res) => {
        setBody(res.data.body || "");
        setLinks(res.data.links || []);
        setAnalysis({
          verdict: res.data.verdict,
          finalScore: res.data.finalScore,
          urlScans: res.data.urlScans || [],
          attachmentScans: res.data.attachmentScans || [],
          sandbox: res.data.sandbox
        });
        setAnalyzingEmail(false);
      })
      .catch((err) => {
        console.error("EMAIL BODY ERROR:", err);
        setAnalyzingEmail(false);
      });
  };

  if (loading) {
    return (
      <div className="inbox-container">
        <div className="loader-wrapper">
          <div className="spinner"></div>
          <p>Loading your inbox...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="inbox-container">
        <div className="no-auth-wrapper">
          <FaShieldAlt className="no-auth-icon" />
          <h2>Secure Your Email</h2>
          <p>
            Login with your Gmail account to analyze emails for phishing,
            malware, and suspicious links.
          </p>
          <a href="http://localhost:5000/auth/login" className="login-button">
            <FaEnvelope /> Login with Google
          </a>
          <div className="auth-benefits">
            <div className="benefit">
              <FaCheckCircle /> Real-time threat detection
            </div>
            <div className="benefit">
              <FaLink /> Advanced link analysis
            </div>
            <div className="benefit">
              <FaShieldAlt /> Secure OAuth authentication
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <div className="inbox-layout">
        {/* LEFT SIDEBAR: Email List */}
        <div className="email-list-sidebar">
          <div className="inbox-header">
            <h2>
              <FaEnvelope /> Inbox
            </h2>
            <span className="email-count">{emails.length}</span>
          </div>

          <div className="email-list">
            {emails.length === 0 ? (
              <div className="no-emails">
                <p>No emails found</p>
              </div>
            ) : (
              emails.map((email) => (
                <div
                  key={email.id}
                  className={`email-item ${selected?.id === email.id ? "selected" : ""}`}
                  onClick={() => loadFullEmail(email.id, email)}
                >
                  <div className="email-item-content">
                    <div className="sender-name">{email.from}</div>
                    <div className="email-subject">{email.subject}</div>
                    <div className="email-date">{email.date}</div>
                  </div>
                  <div className="email-unread-indicator"></div>
                </div>
              ))
            )}
          </div>

          <div className="sidebar-footer">
            <a href="http://localhost:5000/auth/login" className="logout-button">
              Refresh Inbox
            </a>
          </div>
        </div>

        {/* RIGHT PANEL: Email Preview */}
        <div className="email-preview-panel">
          {selected ? (
            <div className="email-preview-content">
              <div className="email-header">
                <div className="header-top">
                  <h2 className="email-subject-large">{selected.subject}</h2>
                  {analysis && (
                    <span className={`email-security-badge ${
                      analysis.verdict === "SAFE" ? "safe" : 
                      analysis.verdict === "SUSPICIOUS" ? "warning" : 
                      "danger"
                    }`}>
                      {analysis.verdict === "SAFE" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                      {" "}{analysis.verdict} ({analysis.finalScore}% risk)
                    </span>
                  )}
                </div>

                <div className="email-meta">
                  <div className="meta-item">
                    <span className="meta-label">From:</span>
                    <span className="meta-value">{selected.from}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Date:</span>
                    <span className="meta-value">{selected.date}</span>
                  </div>
                </div>
              </div>

              <div className="email-divider"></div>

              {/* Email Body */}
              <div className="email-body">
                <div className="body-text">
                  {analyzingEmail ? (
                    <div className="analyzing-loader">
                      <div className="spinner"></div>
                      <p>Analyzing email with 4-layer security scan...</p>
                    </div>
                  ) : body ? (
                    <pre>{body}</pre>
                  ) : (
                    <p className="no-body">No message body found</p>
                  )}
                </div>
              </div>

              {/* 4-Layer Security Analysis */}
              {analysis && !analyzingEmail && (
                <>
                  <div className="email-divider"></div>
                  <div className="security-analysis-section">
                    <h3 className="analysis-title">
                      <FaShieldAlt /> 4-Layer Security Analysis
                    </h3>

                    {/* Layer 1: URL Scanning (Safe Browsing + VirusTotal) */}
                    <div className="layer-card">
                      <div className="layer-header">
                        <h4>🔍 Layer 1 & 2: URL Analysis</h4>
                        <span className={`layer-status ${
                          analysis.urlScans?.some(u => !u.googleSafe || u.vtMalicious > 0 || u.heuristicVerdict === "MALICIOUS") ? "danger" :
                          analysis.urlScans?.some(u => u.vtSuspicious > 0 || u.heuristicVerdict === "SUSPICIOUS") ? "warning" : "safe"
                        }`}>
                          {analysis.urlScans?.some(u => !u.googleSafe || u.vtMalicious > 0 || u.heuristicVerdict === "MALICIOUS") ? "⚠️ Threats Detected" :
                           analysis.urlScans?.some(u => u.vtSuspicious > 0 || u.heuristicVerdict === "SUSPICIOUS") ? "⚠️ Suspicious" : "✅ Clean"}
                        </span>
                      </div>
                      {analysis.urlScans && analysis.urlScans.length > 0 ? (
                        <div className="layer-details">
                          {analysis.urlScans.map((urlScan, idx) => (
                            <div key={idx} className="scan-result-item">
                              <div className="scan-url">
                                <FaLink className="url-icon" />
                                <small>{urlScan.url}</small>
                              </div>
                              <div className="scan-badges">
                                <span className={`threat-badge ${urlScan.googleSafe ? "safe" : "danger"}`}>
                                  Google Safe Browsing: {urlScan.googleSafe ? "✓ Safe" : `❌ ${urlScan.googleThreat}`}
                                </span>
                                <span className={`threat-badge ${
                                  urlScan.vtMalicious > 0 ? "danger" : 
                                  urlScan.vtSuspicious > 0 ? "warning" : "safe"
                                }`}>
                                  VirusTotal: {urlScan.vtMalicious > 0 ? `${urlScan.vtMalicious} malicious` :
                                              urlScan.vtSuspicious > 0 ? `${urlScan.vtSuspicious} suspicious` :
                                              "✓ Clean"}
                                </span>
                                {urlScan.heuristicScore !== undefined && urlScan.heuristicVerdict && (
                                  <span className={`threat-badge ${
                                    urlScan.heuristicVerdict === "MALICIOUS" ? "danger" :
                                    urlScan.heuristicVerdict === "SUSPICIOUS" ? "warning" : "safe"
                                  }`}>
                                    Pattern Analysis: {urlScan.heuristicVerdict} ({urlScan.heuristicScore}%)
                                  </span>
                                )}
                              </div>
                              {urlScan.heuristicFindings && urlScan.heuristicFindings.length > 0 && (
                                <div className="heuristic-findings">
                                  <small><strong>⚠️ Suspicious patterns detected:</strong></small>
                                  <ul>
                                    {urlScan.heuristicFindings.map((finding, i) => (
                                      <li key={i}><small>✓ {finding}</small></li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-data">No URLs found in this email</p>
                      )}
                    </div>

                    {/* Layer 3: Attachment Scanning */}
                    <div className="layer-card">
                      <div className="layer-header">
                        <h4>📎 Layer 3: Attachment Analysis</h4>
                        <span className={`layer-status ${
                          analysis.attachmentScans?.some(a => a.vtMalicious > 0) ? "danger" :
                          analysis.attachmentScans?.some(a => a.vtSuspicious > 0) ? "warning" : "safe"
                        }`}>
                          {analysis.attachmentScans?.some(a => a.vtMalicious > 0) ? "⚠️ Malicious File" :
                           analysis.attachmentScans?.some(a => a.vtSuspicious > 0) ? "⚠️ Suspicious" : "✅ Clean"}
                        </span>
                      </div>
                      {analysis.attachmentScans && analysis.attachmentScans.length > 0 ? (
                        <div className="layer-details">
                          {analysis.attachmentScans.map((att, idx) => (
                            <div key={idx} className="scan-result-item">
                              <div className="scan-url">
                                <span className="file-icon">📄</span>
                                <strong>{att.filename}</strong>
                              </div>
                              <div className="scan-badges">
                                <span className={`threat-badge ${
                                  att.vtMalicious > 0 ? "danger" : 
                                  att.vtSuspicious > 0 ? "warning" : "safe"
                                }`}>
                                  VirusTotal: {att.vtMalicious > 0 ? `${att.vtMalicious} engines flagged as malicious` :
                                              att.vtSuspicious > 0 ? `${att.vtSuspicious} engines flagged as suspicious` :
                                              "✓ Clean (0 detections)"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-data">No attachments in this email</p>
                      )}
                    </div>

                    {/* Layer 4: Docker Sandbox */}
                    <div className="layer-card">
                      <div className="layer-header">
                        <h4>🔒 Layer 4: Behavioral Analysis (Sandbox)</h4>
                        <span className={`layer-status ${
                          analysis.sandbox?.riskScore >= 50 ? "danger" :
                          analysis.sandbox?.riskScore > 20 ? "warning" : "safe"
                        }`}>
                          {analysis.sandbox?.riskScore >= 50 ? "⚠️ Malicious Behavior" :
                           analysis.sandbox?.riskScore > 20 ? "⚠️ Suspicious Activity" : "✅ Safe"}
                        </span>
                      </div>
                      {analysis.sandbox ? (
                        <div className="layer-details">
                          <div className="sandbox-score">
                            <p><strong>Risk Score:</strong> {analysis.sandbox.riskScore}%</p>
                            <div className="risk-bar">
                              <div 
                                className="risk-fill" 
                                style={{
                                  width: `${analysis.sandbox.riskScore}%`,
                                  backgroundColor: analysis.sandbox.riskScore >= 50 ? "#dc3545" :
                                                    analysis.sandbox.riskScore > 20 ? "#ffc107" : "#28a745"
                                }}
                              ></div>
                            </div>
                            <p className="sandbox-description">
                              {analysis.sandbox.riskScore >= 50 
                                ? "The URL showed malicious behavior in isolated testing environment"
                                : analysis.sandbox.riskScore > 20 
                                ? "Some suspicious activities detected but not conclusive"
                                : "No harmful activities detected in controlled testing"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="no-data">No sandbox analysis performed (no URLs to test)</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Links Section (Original) */}
              {links.length > 0 && (
                <>
                  <div className="email-divider"></div>
                  <div className="links-section">
                    <h3 className="links-title">
                      <FaLink /> Extracted Links ({links.length})
                    </h3>
                    <div className="links-list">
                      {links.map((link, i) => (
                        <div key={i} className="link-item">
                          <div className="link-icon">
                            <FaLink />
                          </div>
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="link-url"
                            title={link}
                          >
                            {link.length > 80 ? link.substring(0, 80) + "..." : link}
                          </a>
                          <button className="link-action-button" title="Copy link">
                            📋
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {links.length === 0 && (
                <>
                  <div className="email-divider"></div>
                  <div className="no-links-info">
                    <FaCheckCircle /> No suspicious links detected in this email
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="no-email-selected">
              <FaEnvelope className="no-email-icon" />
              <h3>Select an email to view details</h3>
              <p>Click on any email from the list to analyze it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
