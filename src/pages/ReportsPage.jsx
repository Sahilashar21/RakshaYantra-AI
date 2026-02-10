import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCw, FiCheck, FiAlertCircle, FiX } from "react-icons/fi";
import "../styles/ReportsPage.css";

const ReportsPage = () => {
  const [scans, setScans] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [expandedScanId, setExpandedScanId] = useState(null);

  // Fetch reports on mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/reports", {
        withCredentials: true,
      });

      console.log("Fetched reports:", res.data);

      setScans(res.data.scans || []);
      setStats(res.data.stats || {});
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScanNow = async () => {
    try {
      setScanning(true);
      const res = await axios.post("http://localhost:5000/scan-now", {}, {
        withCredentials: true,
      });

      console.log("Scan response:", res.data);

      // Refresh reports after scan completes
      await fetchReports();
      
      alert(`✅ Scan complete!\n\n${res.data.scans.length} emails scanned\n✅ ${res.data.stats?.successful || 0} successful\n❌ ${res.data.stats?.failed || 0} failed/skipped`);
    } catch (err) {
      console.error("Scan failed:", err);
      alert("❌ Scan failed. Please check console and try again.");
    } finally {
      setScanning(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case "SAFE":
        return <FiCheck className="icon safe" />;
      case "SUSPICIOUS":
        return <FiAlertCircle className="icon suspicious" />;
      case "MALICIOUS":
        return <FiX className="icon dangerous" />;
      default:
        return <FiAlertCircle className="icon" />;
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case "SAFE":
        return "safe";
      case "SUSPICIOUS":
        return "suspicious";
      case "MALICIOUS":
        return "dangerous";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="reports-container loading">
        <div className="spinner"></div>
        <p>Loading scan reports...</p>
      </div>
    );
  }

  return (
    <div className="reports-container">
      {/* HEADER */}
      <div className="reports-header">
        <h1>📊 Daily Scan Report</h1>
        <p className="subtitle">
          All emails scanned today with 4-layer threat detection
        </p>
      </div>

      {/* STATISTICS CARDS */}
      <div className="stats-grid">
        <div className="stat-card safe">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <p className="stat-label">Safe</p>
            <p className="stat-number">{stats?.safe || 0}</p>
          </div>
        </div>

        <div className="stat-card suspicious">
          <div className="stat-icon">⚠</div>
          <div className="stat-content">
            <p className="stat-label">Suspicious</p>
            <p className="stat-number">{stats?.suspicious || 0}</p>
          </div>
        </div>

        <div className="stat-card dangerous">
          <div className="stat-icon">✕</div>
          <div className="stat-content">
            <p className="stat-label">Malicious</p>
            <p className="stat-number">{stats?.dangerous || 0}</p>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <p className="stat-label">Total Scanned</p>
            <p className="stat-number">{scans.length}</p>
          </div>
        </div>
      </div>

      {/* SCAN NOW BUTTON */}
      <div className="action-buttons">
        <button
          className="scan-now-btn"
          onClick={handleScanNow}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <FiRefreshCw className="spinner-icon" />
              Scanning all emails...
            </>
          ) : (
            <>
              <FiRefreshCw />
              Scan Now
            </>
          )}
        </button>

        <button
          className="refresh-btn"
          onClick={fetchReports}
          disabled={loading || scanning}
        >
          <FiRefreshCw />
          Refresh Reports
        </button>
      </div>

      {/* SCANS LIST */}
      <div className="scans-section">
        <h2>Today's Scans ({scans.length})</h2>

        {scans.length === 0 ? (
          <div className="empty-state">
            <p>No scans yet. Click "Scan Now" to scan all today's emails.</p>
            <p style={{fontSize: '14px', color: '#888', marginTop: '10px'}}>
              Note: Scans are stored in memory and reset when server restarts.
            </p>
          </div>
        ) : (
          <div className="scans-list">
            {scans.map((scan) => (
              <div
                key={scan.scanId}
                className={`scan-item ${getVerdictColor(scan.verdict)}`}
              >
                <div
                  className="scan-header"
                  onClick={() =>
                    setExpandedScanId(
                      expandedScanId === scan.scanId ? null : scan.scanId
                    )
                  }
                >
                  <div className="scan-icon">
                    {getVerdictIcon(scan.verdict)}
                  </div>

                  <div className="scan-info">
                    <h3 className="scan-subject">{scan.subject}</h3>
                    <p className="scan-from">{scan.from}</p>
                  </div>

                  <div className="scan-verdict">
                    <span className={`badge ${getVerdictColor(scan.verdict)}`}>
                      {scan.verdict}
                    </span>
                    <span className="risk-score">
                      Risk: {scan.finalScore}%
                    </span>
                  </div>

                  <span className="expand-icon">
                    {expandedScanId === scan.scanId ? "▼" : "▶"}
                  </span>
                </div>

                {/* EXPANDED DETAILS */}
                {expandedScanId === scan.scanId && (
                  <div className="scan-details">
                    <div className="detail-section">
                      <h4>Email Preview</h4>
                      <p className="preview-text">
                        {scan.preview || "(No preview available)"}
                      </p>
                    </div>

                    {scan.urlScans && scan.urlScans.length > 0 && (
                      <div className="detail-section">
                        <h4>URLs Found ({scan.urlScans.length})</h4>
                        <div className="url-list">
                          {scan.urlScans.map((urlScan, idx) => (
                            <div key={idx} className="url-item">
                              <div className="url-address">
                                <small>{urlScan.url}</small>
                              </div>
                              <div className="url-scans">
                                {!urlScan.googleSafe && (
                                  <span className="threat-badge google">
                                    Google: {urlScan.googleThreat}
                                  </span>
                                )}
                                {urlScan.vtMalicious > 0 && (
                                  <span className="threat-badge malicious">
                                    VT Malicious: {urlScan.vtMalicious}
                                  </span>
                                )}
                                {urlScan.vtSuspicious > 0 && (
                                  <span className="threat-badge suspicious">
                                    VT Suspicious: {urlScan.vtSuspicious}
                                  </span>
                                )}
                                {urlScan.heuristicScore !== undefined && urlScan.heuristicVerdict === "MALICIOUS" && (
                                  <span className="threat-badge malicious">
                                    Pattern: MALICIOUS ({urlScan.heuristicScore}%)
                                  </span>
                                )}
                                {urlScan.heuristicScore !== undefined && urlScan.heuristicVerdict === "SUSPICIOUS" && (
                                  <span className="threat-badge suspicious">
                                    Pattern: SUSPICIOUS ({urlScan.heuristicScore}%)
                                  </span>
                                )}
                                {urlScan.googleSafe &&
                                  urlScan.vtMalicious === 0 &&
                                  urlScan.vtSuspicious === 0 &&
                                  urlScan.heuristicVerdict === "SAFE" && (
                                    <span className="threat-badge safe">
                                      ✓ Clean
                                    </span>
                                  )}
                              </div>
                              {urlScan.heuristicFindings && urlScan.heuristicFindings.length > 0 && (
                                <div className="heuristic-warnings">
                                  <small><strong>⚠️ Detected:</strong> {urlScan.heuristicFindings.join(', ')}</small>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {scan.attachmentScans && scan.attachmentScans.length > 0 && (
                      <div className="detail-section">
                        <h4>Attachments ({scan.attachmentScans.length})</h4>
                        <div className="attachment-list">
                          {scan.attachmentScans.map((att, idx) => (
                            <div key={idx} className="attachment-item">
                              <span className="file-icon">📎</span>
                              <div className="attachment-info">
                                <strong>{att.filename}</strong>
                                <div className="attachment-scans">
                                  {att.vtMalicious > 0 && (
                                    <span className="threat-badge malicious">
                                      Malicious: {att.vtMalicious}
                                    </span>
                                  )}
                                  {att.vtSuspicious > 0 && (
                                    <span className="threat-badge suspicious">
                                      Suspicious: {att.vtSuspicious}
                                    </span>
                                  )}
                                  {att.vtMalicious === 0 &&
                                    att.vtSuspicious === 0 && (
                                      <span className="threat-badge safe">
                                        ✓ Clean
                                      </span>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {scan.sandbox && (
                      <div className="detail-section sandbox-section">
                        <h4>🔒 Sandbox Analysis (Layer 4)</h4>
                        <div className="sandbox-info">
                          <p>
                            <strong>Risk Score:</strong> {scan.sandbox.riskScore}
                          </p>
                          <p>
                            <strong>Verdict:</strong>{" "}
                            <span
                              className={`sandbox-verdict ${
                                scan.sandbox.riskScore >= 50
                                  ? "dangerous"
                                  : scan.sandbox.riskScore > 20
                                  ? "suspicious"
                                  : "safe"
                              }`}
                            >
                              {scan.sandbox.riskScore >= 50
                                ? "Malicious Behavior"
                                : scan.sandbox.riskScore > 20
                                ? "Suspicious Behavior"
                                : "Safe"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="detail-section">
                      <p className="scan-timestamp">
                        Scanned:{" "}
                        {new Date(scan.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
