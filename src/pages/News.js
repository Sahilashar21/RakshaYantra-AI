import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const API_KEY = "866a8cdb24664f768d5e6fccaa3c9565";
const Query = `"cybercrime" OR "cyber crime" OR "cyberattack" OR "cyber attack" OR "phishing" OR "malware" OR "ransomware" OR "data breach" OR "hacking" AND India`;


  const URL = `https://newsapi.org/v2/everything?q=${Query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => setNews(response.data.articles))
      .catch((error) => console.error("Error fetching news:", error));
  }, [URL]);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
        position: "relative",
        zIndex: 100,
        fontFamily: "Segoe UI, Arial, sans-serif",
        height: "100vh",        // <-- FIXES SCROLL
        overflowY: "auto",      // <-- FIXES SCROLL
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#1a1a1a",
        }}
      >
        Cybersecurity News (India)
      </h2>

      {news.length === 0 ? (
        <p style={{ fontSize: "18px", color: "#777" }}>Loading news...</p>
      ) : (
        news.map((article, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #eaeaea",
              transition: "transform 0.1s ease-in-out",
              cursor: "pointer",
            }}
            onClick={() => window.open(article.url, "_blank")}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#222",
                marginBottom: "8px",
                lineHeight: "1.3",
              }}
            >
              {article.title}
            </h3>

            <p style={{ fontSize: "15px", color: "#444", marginBottom: "14px" }}>
              {article.description || "No description available."}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                color: "#666",
              }}
            >
              <span>
                <strong>Source:</strong> {article.source.name}
              </span>

              <span>
                {new Date(article.publishedAt).toLocaleDateString()}{" "}
                {new Date(article.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default News;
