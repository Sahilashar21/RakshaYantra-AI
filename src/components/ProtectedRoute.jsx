import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

export default function ProtectedRoute({ element: Element }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user is authenticated by trying to fetch emails
    api
      .get("/emails")
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  // Loading
  if (authenticated === null) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#f5f7fa"
      }}>
        <div>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e5e5e5",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto"
          }}></div>
          <p style={{ marginTop: "15px", color: "#666" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authenticated) {
    window.location.href = "http://localhost:5000/auth/login";
    return null;
  }

  // Render the protected component
  return Element;
}
