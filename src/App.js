import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InboxPage from "./pages/inboxPage.jsx";
import VideosPage from "./pages/Tutorials.js";
import NewsPage from "./pages/News.js";
import ChatbotPage from "./pages/ChatbotModal.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">

        {/* Navbar */}
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Inbox</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/news">News</Link></li>
          </ul>
        </nav>
        <ChatbotPage/>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<InboxPage />} />        {/* Main page */}
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* Any unknown path -> Inbox */}
          <Route path="*" element={<InboxPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
