import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage.jsx";
import InboxPage from "./pages/inboxPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import MessageAnalysis from "./pages/MessageAnalysis.jsx";
import VideosPage from "./pages/Tutorials.js";
import NewsPage from "./pages/News.js";
import ChatbotPage from "./pages/ChatbotModal.js";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ChatbotPage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inbox" element={<ProtectedRoute element={<InboxPage />} />} />
          <Route path="/reports" element={<ProtectedRoute element={<ReportsPage />} />} />
          <Route path="/message-analysis" element={<MessageAnalysis />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
