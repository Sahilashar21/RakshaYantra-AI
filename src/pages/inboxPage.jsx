// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import api from "../api.js"

// // // // // // // export default function InboxPage() {
// // // // // // //   const [emails, setEmails] = useState([]);
// // // // // // //   const [selected, setSelected] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   //  FETCH EMAILS FROM BACKEND
// // // // // // //   useEffect(() => {
// // // // // // //     api.get("/emails")
// // // // // // //       .then(res => {
// // // // // // //         setEmails(res.data);
// // // // // // //         setSelected(res.data[0]);
// // // // // // //         setLoading(false);
// // // // // // //       })
// // // // // // //       .catch(err => {
// // // // // // //         console.error("ERROR FETCHING EMAILS:", err);
// // // // // // //         setLoading(false);
// // // // // // //       });
// // // // // // //   }, []);

// // // // // // //   if (loading) return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;

// // // // // // //   return (
// // // // // // //     <div style={{ display: "flex", height: "100vh" }}>

// // // // // // //       {/* LEFT SIDEBAR */}
// // // // // // //       <div style={{
// // // // // // //         width: "30%",
// // // // // // //         borderRight: "1px solid #ccc",
// // // // // // //         overflowY: "auto",
// // // // // // //         background: "#fff"
// // // // // // //       }}>
// // // // // // //         <h2 style={{ padding: "20px", margin: 0 }}>Inbox</h2>

// // // // // // //         {emails.map(email => (
// // // // // // //           <div
// // // // // // //             key={email.id}
// // // // // // //             onClick={() => setSelected(email)}
// // // // // // //             style={{
// // // // // // //               padding: "15px",
// // // // // // //               borderBottom: "1px solid #eee",
// // // // // // //               background: selected?.id === email.id ? "#e0f2ff" : "#fff",
// // // // // // //               cursor: "pointer"
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <h4 style={{ marginBottom: "5px" }}>{email.subject}</h4>
// // // // // // //             <p style={{ margin: 0 }}>{email.from}</p>
// // // // // // //             <small>{email.date}</small>
// // // // // // //           </div>
// // // // // // //         ))}

// // // // // // //         {/* LOGIN BUTTON */}
// // // // // // //         <div style={{ padding: "20px" }}>
// // // // // // //           <a href="http://localhost:5000/auth/login">
// // // // // // //             <button style={{
// // // // // // //               width: "100%",
// // // // // // //               padding: "10px",
// // // // // // //               background: "#4285F4",
// // // // // // //               color: "white",
// // // // // // //               border: "none",
// // // // // // //               borderRadius: "5px",
// // // // // // //               marginTop: "20px",
// // // // // // //               cursor: "pointer"
// // // // // // //             }}>
// // // // // // //               Login with Google
// // // // // // //             </button>
// // // // // // //           </a>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* RIGHT PANEL */}
// // // // // // //       <div style={{ width: "70%", padding: "30px", background: "#f8f9fc" }}>
// // // // // // //         {selected ? (
// // // // // // //           <>
// // // // // // //             <h2>{selected.subject}</h2>
// // // // // // //             <p>{selected.from}</p>
// // // // // // //             <i>{selected.date}</i>
// // // // // // //             <hr />

// // // // // // //             <p style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
// // // // // // //               {selected.body || "No message body found"}
// // // // // // //             </p>
// // // // // // //           </>
// // // // // // //         ) : (
// // // // // // //           <h2>Select an email</h2>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import api from "../api";

// // // // // // export default function InboxPage() {
// // // // // //   const [emails, setEmails] = useState([]);
// // // // // //   const [selected, setSelected] = useState(null);
// // // // // //   const [body, setBody] = useState("");
// // // // // //   const [links, setLinks] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);


// // // // // //   // LOAD INBOX
// // // // // //   useEffect(() => {
// // // // // //     api.get("/emails")
// // // // // //       .then(res => {
// // // // // //         setEmails(res.data);
// // // // // //         setLoading(false);

// // // // // //         if (res.data.length > 0) {
// // // // // //           loadFullEmail(res.data[0].id, res.data[0]);
// // // // // //         }
// // // // // //       })
// // // // // //       .catch(err => {
// // // // // //         console.error("INBOX LOAD ERROR:", err);
// // // // // //         setLoading(false);
// // // // // //       });
// // // // // //   }, []);


// // // // // //   // LOAD FULL EMAIL BODY + LINKS
// // // // // //   const loadFullEmail = (id, emailMeta) => {
// // // // // //     setSelected(emailMeta);

// // // // // //     api.get(`/email/${id}`)
// // // // // //       .then(res => {
// // // // // //         setBody(res.data.body || "");
// // // // // //         setLinks(res.data.links || []);
// // // // // //       })
// // // // // //       .catch(err => console.error("EMAIL BODY ERROR:", err));
// // // // // //   };


// // // // // //   if (loading)
// // // // // //     return <h2 style={{ padding: "20px" }}>Loading inbox...</h2>;


// // // // // //   return (
// // // // // //     <div style={{ display: "flex", height: "100vh" }}>

// // // // // //       {/* LEFT SIDEBAR */}
// // // // // //       <div style={{
// // // // // //         width: "30%",
// // // // // //         borderRight: "1px solid #ccc",
// // // // // //         overflowY: "auto"
// // // // // //       }}>
// // // // // //         <h2 style={{ padding: "20px" }}>Inbox</h2>

// // // // // //         {/* LOGIN BUTTON */}
// // // // // //         <a href="http://localhost:5000/auth/login">
// // // // // //           <button style={{
// // // // // //             margin: "10px 20px",
// // // // // //             width: "80%",
// // // // // //             background: "#4285F4",
// // // // // //             color: "white",
// // // // // //             padding: "10px",
// // // // // //             borderRadius: "5px",
// // // // // //             border: "none"
// // // // // //           }}>
// // // // // //             Login with Google
// // // // // //           </button>
// // // // // //         </a>

// // // // // //         {/* EMAIL LIST */}
// // // // // //         {emails.map(email => (
// // // // // //           <div
// // // // // //             key={email.id}
// // // // // //             onClick={() => loadFullEmail(email.id, email)}
// // // // // //             style={{
// // // // // //               padding: "15px",
// // // // // //               cursor: "pointer",
// // // // // //               borderBottom: "1px solid #eee",
// // // // // //               background: selected?.id === email.id ? "#e0f2ff" : "#fff"
// // // // // //             }}
// // // // // //           >
// // // // // //             <h4>{email.subject}</h4>
// // // // // //             <p>{email.from}</p>
// // // // // //             <small>{email.date}</small>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>


// // // // // //       {/* RIGHT PANEL */}
// // // // // //       <div style={{ width: "70%", padding: "30px" }}>
// // // // // //         {selected ? (
// // // // // //           <>
// // // // // //             <h2>{selected.subject}</h2>
// // // // // //             <p>{selected.from}</p>
// // // // // //             <i>{selected.date}</i>

// // // // // //             <hr />

// // // // // //             {/* EMAIL BODY */}
// // // // // //             <pre style={{ whiteSpace: "pre-wrap", fontSize: "16px" }}>
// // // // // //               {body || "No body found"}
// // // // // //             </pre>

// // // // // //             <hr />

// // // // // //             {/* EXTRACTED LINKS */}
// // // // // //             <h3>Links Found:</h3>
// // // // // //             {links.length === 0 && <p>No links detected</p>}

// // // // // //             <ul>
// // // // // //               {links.map((link, i) => (
// // // // // //                 <li key={i}>
// // // // // //                   <a href={link} target="_blank" rel="noreferrer">
// // // // // //                     {link}
// // // // // //                   </a>
// // // // // //                 </li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           </>
// // // // // //         ) : (
// // // // // //           <h2>Select an email</h2>
// // // // // //         )}
// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useEffect, useState } from "react";
// // // // // import api from "../api";
// // // // // import '../inbox.css';
// // // // // export default function InboxPage() {
// // // // //   const [emails, setEmails] = useState([]);
// // // // //   const [selected, setSelected] = useState(null);
// // // // //   const [body, setBody] = useState("");
// // // // //   const [links, setLinks] = useState([]);
// // // // //   const [scans, setScans] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Load inbox
// // // // //   useEffect(() => {
// // // // //     api.get("/emails")
// // // // //       .then(res => {
// // // // //         setEmails(res.data);
// // // // //         setLoading(false);

// // // // //         if (res.data.length > 0) {
// // // // //           loadFullEmail(res.data[0].id, res.data[0]);
// // // // //         }
// // // // //       })
// // // // //       .catch(err => {
// // // // //         console.error("INBOX LOAD ERROR:", err);
// // // // //       });
// // // // //   }, []);

// // // // //   // Load full body + links + scan results
// // // // //   const loadFullEmail = (id, emailMeta) => {
// // // // //     setSelected(emailMeta);

// // // // //     api.get(`/email/${id}`)
// // // // //       .then(res => {
// // // // //         setBody(res.data.body || "");
// // // // //         setLinks(res.data.links || []);
// // // // //         setScans(res.data.scans || []);
// // // // //       })
// // // // //       .catch(err => console.error("EMAIL BODY ERROR:", err));
// // // // //   };


// // // // //   return (
// // // // //     <div style={{ display: "flex", height: "100vh" }}>

// // // // //       {/* LEFT: Inbox List */}
// // // // //       <div style={{
// // // // //         width: "30%",
// // // // //         borderRight: "1px solid #ccc",
// // // // //         overflowY: "auto"
// // // // //       }}>
// // // // //         <h2 style={{ padding: 20 }}>Inbox</h2>

// // // // //         <a href="http://localhost:5000/auth/login">
// // // // //           <button style={{
// // // // //             margin: 20,
// // // // //             width: "80%",
// // // // //             background: "#4285F4",
// // // // //             color: "#fff",
// // // // //             padding: 10,
// // // // //             borderRadius: 5,
// // // // //             border: "none"
// // // // //           }}>Login With Google</button>
// // // // //         </a>

// // // // //         {emails.map(email => (
// // // // //           <div
// // // // //             key={email.id}
// // // // //             onClick={() => loadFullEmail(email.id, email)}
// // // // //             style={{
// // // // //               padding: 15,
// // // // //               borderBottom: "1px solid #eee",
// // // // //               cursor: "pointer",
// // // // //               background: selected?.id === email.id ? "#e3f3ff" : "#fff"
// // // // //             }}
// // // // //           >
// // // // //             <h4>{email.subject}</h4>
// // // // //             <p>{email.from}</p>
// // // // //             <small>{email.date}</small>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* RIGHT: Full Email */}
// // // // //       <div style={{ width: "70%", padding: 30 }}>
// // // // //         {selected ? (
// // // // //           <>
// // // // //             <h2>{selected.subject}</h2>
// // // // //             <p>{selected.from}</p>
// // // // //             <i>{selected.date}</i>
// // // // //             <hr />

// // // // //             {/* Body */}
// // // // //             <div dangerouslySetInnerHTML={{ __html: body }} />

// // // // //             <hr />

// // // // //             {/* Links */}
// // // // //             <h3>Extracted Links:</h3>
// // // // //             {links.length === 0 ? <p>No links found</p> : null}
// // // // //             <ul>
// // // // //               {links.map((l, i) => (
// // // // //                 <li key={i}>
// // // // //                   <a href={l} target="_blank" rel="noreferrer">{l}</a>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>

// // // // //             {/* Scan Results */}
// // // // //             <h3>Scan Results:</h3>
// // // // //             {scans.map((s, i) => (
// // // // //               <div key={i} style={{ marginBottom: 10 }}>
// // // // //                 <b>{s.link}</b><br />
// // // // //                 {s.safe ? (
// // // // //                   <span style={{ color: "green" }}>SAFE ✓</span>
// // // // //                 ) : (
// // // // //                   <span style={{ color: "red" }}>
// // // // //                     DANGEROUS — {s.threat}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>
// // // // //             ))}

// // // // //           </>
// // // // //         ) : (
// // // // //           <h2>Select an email</h2>
// // // // //         )}
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState } from "react";
// // // // import api from "../api";
// // // // import '../inbox.css';
// // // // export default function InboxPage() {
// // // //   const [emails, setEmails] = useState([]);
// // // //   const [selected, setSelected] = useState(null);
// // // //   const [body, setBody] = useState("");
// // // //   const [links, setLinks] = useState([]);
// // // //   const [scans, setScans] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Load inbox
// // // //   useEffect(() => {
// // // //     api.get("/emails")
// // // //       .then(res => {
// // // //         setEmails(res.data);
// // // //         setLoading(false);

// // // //         if (res.data.length > 0) {
// // // //           loadFullEmail(res.data[0].id, res.data[0]);
// // // //         }
// // // //       })
// // // //       .catch(err => {
// // // //         console.error("INBOX LOAD ERROR:", err);
// // // //       });
// // // //   }, []);

// // // //   // Load full body + links + scan results
// // // //   const loadFullEmail = (id, emailMeta) => {
// // // //     setSelected(emailMeta);

// // // //     api.get(`/email/${id}`)
// // // //       .then(res => {
// // // //         setBody(res.data.body || "");
// // // //         setLinks(res.data.links || []);
// // // //         setScans(res.data.scans || []);
// // // //       })
// // // //       .catch(err => console.error("EMAIL BODY ERROR:", err));
// // // //   };

// // // //   if (loading)
// // // //     return <h2 className="loading">Loading inbox...</h2>;

// // // //   return (
// // // //     <>
// // // //       {/* Header */}
// // // //       <div className="header">
// // // //         <div className="logo">RakshaYantra AI</div>
// // // //         <div className="tagline">AI-Powered Phishing Detection & Email Security</div>
// // // //       </div>

// // // //       {/* Main Container */}
// // // //       <div className="container">
// // // //         {/* Left Sidebar: Inbox Scanner */}
// // // //         <div className="sidebar">
// // // //           <h2>Inbox Scanner</h2>
// // // //           <div className="search-bar">
// // // //             <input type="text" placeholder="Search emails..." />
// // // //           </div>
// // // //           <a href="http://localhost:5000/auth/login" className="login-btn">
// // // //             Login with Google
// // // //           </a>
// // // //           <ul className="email-list">
// // // //             {emails.map(email => (
// // // //               <li
// // // //                 key={email.id}
// // // //                 className={`email-item ${selected?.id === email.id ? 'selected' : ''}`}
// // // //                 onClick={() => loadFullEmail(email.id, email)}
// // // //               >
// // // //                 <h4>{email.subject}</h4>
// // // //                 <p>{email.from}</p>
// // // //                 <small>{email.date}</small>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </div>

// // // //         {/* Right Panel: Email Analysis */}
// // // //         <div className="main-panel">
// // // //           {selected ? (
// // // //             <>
// // // //               <h2>{selected.subject}</h2>
// // // //               <p>{selected.from}</p>
// // // //               <i>{selected.date}</i>
// // // //               <hr />
// // // //               <div className="email-body" dangerouslySetInnerHTML={{ __html: body }} />
// // // //               <hr />
// // // //               <div className="links-section">
// // // //                 <h3>Extracted Links:</h3>
// // // //                 {links.length === 0 ? <p>No links found</p> : (
// // // //                   <ul className="links-list">
// // // //                     {links.map((l, i) => (
// // // //                       <li key={i}>
// // // //                         <a href={l} target="_blank" rel="noreferrer">{l}</a>
// // // //                       </li>
// // // //                     ))}
// // // //                   </ul>
// // // //                 )}
// // // //               </div>
// // // //               <hr />
// // // //               <div className="scans-section">
// // // //                 <h3>Scan Results:</h3>
// // // //                 {scans.map((s, i) => (
// // // //                   <div key={i} className="scan-item">
// // // //                     <b>{s.link}</b>
// // // //                     <div className={`status ${s.safe ? 'safe' : 'dangerous'}`}>
// // // //                       {s.safe ? 'SAFE ✓' : `DANGEROUS — ${s.threat}`}
// // // //                     </div>
// // // //                     <div className="progress-bar">
// // // //                       <div className={`progress-fill ${!s.safe ? 'danger' : ''}`}></div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </>
// // // //           ) : (
// // // //             <div className="no-selection">
// // // //               <h2>Select an email to analyze</h2>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Footer */}
// // // //       <div className="footer">
// // // //         RakshaYantra AI - Protecting Against Phishing Threats | <a href="#">Learn More</a> | Powered by Advanced AI
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }



// // // // import React, { useEffect, useState } from "react";
// // // // import api from "../api";
// // // // import '../inbox.css';

// // // // export default function InboxPage() {
// // // //   const [emails, setEmails] = useState([]);
// // // //   const [selected, setSelected] = useState(null);

// // // //   const [body, setBody] = useState("");
// // // //   const [links, setLinks] = useState([]);

// // // //   const [urlScans, setUrlScans] = useState([]);
// // // //   const [attachments, setAttachments] = useState([]);
// // // //   const [attachmentScans, setAttachmentScans] = useState([]);

// // // //   const [isPhishing, setIsPhishing] = useState(false);
// // // //   const [phishingReasons, setPhishingReasons] = useState([]);

// // // //   const [loading, setLoading] = useState(true);

// // // //   // Load inbox on startup
// // // //   useEffect(() => {
// // // //     api.get("/emails")
// // // //       .then(res => {
// // // //         setEmails(res.data);
// // // //         setLoading(false);

// // // //         if (res.data.length > 0) {
// // // //           loadFullEmail(res.data[0].id, res.data[0]);
// // // //         }
// // // //       })
// // // //       .catch(err => console.error("INBOX LOAD ERROR:", err));
// // // //   }, []);

// // // //   // ---------------------------
// // // //   // LOAD FULL EMAIL
// // // //   // ---------------------------
// // // //   const loadFullEmail = (id, emailMeta) => {
// // // //     setSelected(emailMeta);

// // // //     api.get(`/email/${id}`)
// // // //       .then(res => {
// // // //         setBody(res.data.body || "");
// // // //         setLinks(res.data.links || []);
// // // //         setUrlScans(res.data.urlScans || []);
// // // //         setAttachments(res.data.attachments || []);
// // // //         setAttachmentScans(res.data.attachmentScans || []);

// // // //         // -------------------------
// // // //         // PHISHING DETECTION LOGIC
// // // //         // -------------------------
// // // //         let danger = false;
// // // //         let reasons = [];

// // // //         // URL-based threats
// // // //         res.data.urlScans?.forEach(s => {
// // // //           if (!s.googleSafe) {
// // // //             danger = true;
// // // //             reasons.push("Google Safe Browsing flagged: " + s.googleThreat);
// // // //           }
// // // //           if (s.vtMalicious > 0) {
// // // //             danger = true;
// // // //             reasons.push(`${s.vtMalicious} VirusTotal engines flagged URL as malicious`);
// // // //           }
// // // //           if (s.vtSuspicious > 2) {
// // // //             danger = true;
// // // //             reasons.push(`${s.vtSuspicious} engines marked URL as suspicious`);
// // // //           }
// // // //         });

// // // //         // Attachment-based threats
// // // //         res.data.attachmentScans?.forEach(a => {
// // // //           if (a.vtMalicious > 0) {
// // // //             danger = true;
// // // //             reasons.push(`${a.filename}: ${a.vtMalicious} engines flagged this file as malicious`);
// // // //           }
// // // //           if (a.vtSuspicious > 2) {
// // // //             danger = true;
// // // //             reasons.push(`${a.filename}: suspicious file behavior`);
// // // //           }
// // // //         });

// // // //         setIsPhishing(danger);
// // // //         setPhishingReasons(reasons);
// // // //       })
// // // //       .catch(err => console.error("EMAIL BODY ERROR:", err));
// // // //   };

// // // //   // if (loading) return <h2 className="loading">Loading inbox...</h2>;

// // // //   return (
// // // //     <>
// // // //       {/* Header */}
// // // //       <div className="header">
// // // //         <div className="logo">RakshaYantra AI</div>
// // // //         <div className="tagline">AI-Powered Phishing Detection & Email Security</div>
// // // //       </div>

// // // //       {/* Container */}
// // // //       <div className="container">

// // // //         {/* SIDEBAR */}
// // // //         <div className="sidebar">
// // // //           <h2>Inbox Scanner</h2>

// // // //           <div className="search-bar">
// // // //             <input type="text" placeholder="Search emails..." />
// // // //           </div>

// // // //           <a href="http://localhost:5000/auth/login" className="login-btn">
// // // //             Login with Google
// // // //           </a>

// // // //           <ul className="email-list">
// // // //             {emails.map(email => (
// // // //               <li
// // // //                 key={email.id}
// // // //                 className={`email-item ${selected?.id === email.id ? "selected" : ""}`}
// // // //                 onClick={() => loadFullEmail(email.id, email)}
// // // //               >
// // // //                 <h4>{email.subject}</h4>
// // // //                 <p>{email.from}</p>
// // // //                 <small>{email.date}</small>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </div>

// // // //         {/* MAIN PANEL */}
// // // //         <div className="main-panel">
// // // //           {!selected ? (
// // // //             <div className="no-selection">
// // // //               <h2>Select an email to analyze</h2>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <h2>{selected.subject}</h2>
// // // //               <p>{selected.from}</p>
// // // //               <i>{selected.date}</i>
// // // //               <hr />

// // // //               {/* PHISHING WARNING */}
// // // //               {isPhishing && (
// // // //                 <div className="phishing-warning">
// // // //                   <h3>⚠ PHISHING DETECTED</h3>
// // // //                   <p>This email contains unsafe or malicious content.</p>

// // // //                   <ul>
// // // //                     {phishingReasons.map((r, i) => (
// // // //                       <li key={i}>{r}</li>
// // // //                     ))}
// // // //                   </ul>
// // // //                 </div>
// // // //               )}

// // // //               {/* EMAIL BODY */}
// // // //               <div
// // // //                 className="email-body"
// // // //                 dangerouslySetInnerHTML={{ __html: body }}
// // // //               />
// // // //               <hr />

// // // //               {/* LINKS */}
// // // //               <div className="links-section">
// // // //                 <h3>Extracted Links</h3>
// // // //                 {links.length === 0 ? (
// // // //                   <p>No links found</p>
// // // //                 ) : (
// // // //                   <ul className="links-list">
// // // //                     {links.map((l, i) => (
// // // //                       <li key={i}>
// // // //                         <a href={l} target="_blank" rel="noreferrer">{l}</a>
// // // //                       </li>
// // // //                     ))}
// // // //                   </ul>
// // // //                 )}
// // // //               </div>
// // // //               <hr />

// // // //               {/* URL SCAN RESULTS */}
// // // //               <div className="scans-section">
// // // //                 <h3>URL Scan Results</h3>

// // // //                 {urlScans.length === 0 && <p>No URL scan results</p>}

// // // //                 {urlScans.map((s, i) => (
// // // //                   <div key={i} className="scan-item">
// // // //                     <b>{s.link}</b>

// // // //                     <div className={`status ${s.googleSafe ? "safe" : "dangerous"}`}>
// // // //                       {s.googleSafe
// // // //                         ? "SAFE ✓"
// // // //                         : `DANGEROUS — ${s.googleThreat || (s.vtMalicious > 0 ? "Malicious Detected" : "Suspicious")}`}
// // // //                     </div>

// // // //                     <div className="details">
// // // //                       VT Malicious: {s.vtMalicious}  
// // // //                       <br />
// // // //                       VT Suspicious: {s.vtSuspicious}
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <hr />

// // // //               {/* ATTACHMENTS */}
// // // //               <h3>Attachments</h3>
// // // //               {attachments.length === 0 ? (
// // // //                 <p>No attachments found</p>
// // // //               ) : (
// // // //                 <ul>
// // // //                   {attachments.map((a, i) => (
// // // //                     <li key={i}>{a.filename} ({a.mimeType}) — {a.size} bytes</li>
// // // //                   ))}
// // // //                 </ul>
// // // //               )}

// // // //               {/* ATTACHMENT SCANS */}
// // // //               <h3>Attachment Scan Results</h3>

// // // //               {attachmentScans.map((a, i) => (
// // // //                 <div key={i} className="scan-item">
// // // //                   <b>{a.filename}</b><br />

// // // //                   {a.vtMalicious > 0 ? (
// // // //                     <span className="dangerous">
// // // //                       Malicious: {a.vtMalicious} engines
// // // //                     </span>
// // // //                   ) : (
// // // //                     <span className="safe">Clean (0 malicious engines)</span>
// // // //                   )}

// // // //                   {a.vtSuspicious > 0 && (
// // // //                     <p className="suspicious">
// // // //                       Suspicious: {a.vtSuspicious} engines
// // // //                     </p>
// // // //                   )}
// // // //                 </div>
// // // //               ))}
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* FOOTER */}
// // // //       <div className="footer">
// // // //         RakshaYantra AI - Protecting Against Phishing Threats |
// // // //         <a href="#"> Learn More </a> | Powered by AI
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // import React, { useEffect, useState } from "react";
// // // import api from "../api";
// // // import "../inbox.css";

// // // export default function InboxPage() {
// // //   const [emails, setEmails] = useState([]);
// // //   const [selected, setSelected] = useState(null);

// // //   const [body, setBody] = useState("");
// // //   const [links, setLinks] = useState([]);

// // //   const [urlScans, setUrlScans] = useState([]);
// // //   const [attachments, setAttachments] = useState([]);
// // //   const [attachmentScans, setAttachmentScans] = useState([]);

// // //   const [sandboxReport, setSandboxReport] = useState(null);
// // //   const [sandboxLoading, setSandboxLoading] = useState(false);

// // //   const [loading, setLoading] = useState(true);

// // //   // Load inbox
// // //   useEffect(() => {
// // //     api
// // //       .get("/emails")
// // //       .then((res) => {
// // //         setEmails(res.data);
// // //         setLoading(false);

// // //         if (res.data.length > 0) {
// // //           loadEmail(res.data[0]);
// // //         }
// // //       })
// // //       .catch(() => {
// // //         setEmails([]); // Not logged in → show login button
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   const loadEmail = (emailMeta) => {
// // //     setSelected(emailMeta);

// // //     api.get(`/email/${emailMeta.id}`).then((res) => {
// // //       setBody(res.data.body);
// // //       setLinks(res.data.links);
// // //       setUrlScans(res.data.urlScans);
// // //       setAttachments(res.data.attachments);
// // //       setAttachmentScans(res.data.attachmentScans);

// // //       setSandboxReport(null);
// // //     });
// // //   };

// // //   const runSandbox = async (url) => {
// // //     setSandboxLoading(true);
// // //     setSandboxReport(null);

// // //     const res = await api.post("/sandbox", { url });
// // //     setSandboxReport(res.data);

// // //     setSandboxLoading(false);
// // //   };

// // //   return (
// // //     <>
// // //       {/* HEADER */}
// // //       <div className="header">
// // //         <div className="logo">RakshaYantra AI</div>
// // //         <div className="tagline">AI Email Security & Sandbox</div>
// // //       </div>

// // //       <div className="container">
// // //         {/* SIDEBAR */}
// // //         <div className="sidebar">
// // //           <h2>Inbox</h2>

// // //           {/* LOGIN BUTTON (show only if no emails = not logged in) */}
// // //           {emails.length === 0 && (
// // //             <div className="login-section">
// // //               <a
// // //                 href="http://localhost:5000/auth/login"
// // //                 className="login-btn"
// // //               >
// // //                 Login with Google
// // //               </a>
// // //             </div>
// // //           )}

// // //           {/* SHOW THIS AFTER LOGIN */}
// // //           {emails.length > 0 && (
// // //             <div className="logged-in">✔ Logged in with Google</div>
// // //           )}

// // //           <ul className="email-list">
// // //             {emails.map((e) => (
// // //               <li
// // //                 key={e.id}
// // //                 className={`email-item ${
// // //                   selected?.id === e.id ? "selected" : ""
// // //                 }`}
// // //                 onClick={() => loadEmail(e)}
// // //               >
// // //                 <h4>{e.subject}</h4>
// // //                 <p>{e.from}</p>
// // //                 <small>{e.date}</small>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>

// // //         {/* MAIN PANEL */}
// // //         <div className="main-panel">
// // //           {!selected ? (
// // //             <h2>Select an email</h2>
// // //           ) : (
// // //             <>
// // //               {/* EMAIL HEADER */}
// // //               <h2>{selected.subject}</h2>
// // //               <p>{selected.from}</p>

// // //               {/* EMAIL BODY */}
// // //               <div
// // //                 className="email-body"
// // //                 dangerouslySetInnerHTML={{ __html: body }}
// // //               ></div>

// // //               <hr />

// // //               {/* LINKS */}
// // //               <h3>Links</h3>
// // //               <ul>
// // //                 {links.map((l, i) => (
// // //                   <li key={i}>
// // //                     {l}
// // //                     <button
// // //                       className="sandbox-btn"
// // //                       onClick={() => runSandbox(l)}
// // //                     >
// // //                       Run Sandbox
// // //                     </button>
// // //                   </li>
// // //                 ))}
// // //               </ul>

// // //               {/* SANDBOX */}
// // //               {sandboxLoading && (
// // //                 <div className="sandbox-box">
// // //                   <h3>Running sandbox...</h3>
// // //                 </div>
// // //               )}

// // //               {sandboxReport && (
// // //                 <div className="sandbox-box">
// // //                   <h3>Sandbox Analysis</h3>

// // //                   <p>
// // //                     <b>Risk Score:</b>{" "}
// // //                     <span
// // //                       style={{
// // //                         color:
// // //                           sandboxReport.analysis.riskScore > 70
// // //                             ? "red"
// // //                             : sandboxReport.analysis.riskScore > 40
// // //                             ? "orange"
// // //                             : "green",
// // //                       }}
// // //                     >
// // //                       {sandboxReport.analysis.riskScore}%
// // //                     </span>
// // //                   </p>

// // //                   <h4>⚠ Flags:</h4>
// // //                   <ul>
// // //                     {sandboxReport.analysis.flags.map((f, i) => (
// // //                       <li key={i}>{f}</li>
// // //                     ))}
// // //                   </ul>

// // //                   <details>
// // //                     <summary>Raw Network Activity</summary>
// // //                     <pre>{JSON.stringify(sandboxReport.raw, null, 2)}</pre>
// // //                   </details>
// // //                 </div>
// // //               )}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }



// // import React, { useEffect, useState } from "react";
// // import api from "../api";
// // import "../inbox.css";

// // export default function InboxPage() {
// //   const [emails, setEmails] = useState([]);
// //   const [selected, setSelected] = useState(null);

// //   const [body, setBody] = useState("");
// //   const [analysis, setAnalysis] = useState(null);

// //   useEffect(() => {
// //   api
// //     .get("/emails")
// //     .then((res) => {
// //       setEmails(res.data);
// //       // ❌ Do NOT auto-load the first email
// //       // The user will click one manually
// //     })
// //     .catch(() => setEmails([]));
// // }, []);


// //   // Load full email + security analysis
// //   const loadEmail = (emailMeta) => {
// //     setSelected(emailMeta);
// //     setAnalysis(null);

// //     api.get(`/email/${emailMeta.id}`).then((res) => {
// //       setBody(res.data.body);
// //       setAnalysis(res.data);
// //     });
// //   };

// //   return (
// //     <>
// //       {/* HEADER */}
// //       <div className="header">
// //         <div className="logo">RakshaYantra AI</div>
// //         <div className="tagline">AI-Powered Email Security</div>
// //       </div>
      

// //       <div className="container">
// //         {/* SIDEBAR */}
// //         <div className="sidebar">
// //           <h2>Inbox</h2>

// //           {emails.length === 0 && (
// //             <a href="http://localhost:5000/auth/login" className="login-btn">
// //               Login with Google
// //             </a>
// //           )}

// //           {emails.length > 0 && <div className="logged-in">✔ Logged In</div>}

// //           <ul className="email-list">
// //             {emails.map((e) => (
// //               <li
// //                 key={e.id}
// //                 onClick={() => loadEmail(e)}
// //                 className={selected?.id === e.id ? "selected" : ""}
// //               >
// //                 <h4>{e.subject}</h4>
// //                 <p>{e.from}</p>
// //                 <small>{e.date}</small>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* MAIN PANEL */}
// //         <div className="main-panel">
// //           {!selected ? (
// //             <h2>Select an email</h2>
// //           ) : !analysis ? (
// //             <h2>Analyzing email...</h2>
// //           ) : (
// //             <>
// //               <h2>{selected.subject}</h2>
// //               <p>{selected.from}</p>

// //               <div
// //                 className="email-body"
// //                 dangerouslySetInnerHTML={{ __html: body }}
// //               ></div>

// //               <hr />

// //               {/* SECURITY VERDICT */}
// //               <div className="verdict-box">
// //                 <h3>
// //                   Security Status:{" "}
// //                   <span
// //                     style={{
// //                       color:
// //                         analysis.finalScore >= 70
// //                           ? "red"
// //                           : analysis.finalScore >= 40
// //                           ? "orange"
// //                           : "green",
// //                     }}
// //                   >
// //                     {analysis.verdict}
// //                   </span>
// //                 </h3>

// //                 <p>Risk Score: {analysis.finalScore}%</p>

// //                 <h4>Reasons:</h4>
// //                 <ul>
// //                   {/* LAYER 1 & 2: URL issues */}
// //                   {analysis.urlScans.map((u, i) => (
// //                     <React.Fragment key={i}>
// //                       {!u.googleSafe && (
// //                         <li>Google Safe Browsing flagged unsafe link</li>
// //                       )}
// //                       {u.vtMalicious > 0 && (
// //                         <li>
// //                           VirusTotal: {u.vtMalicious} malicious detections
// //                         </li>
// //                       )}
// //                       {u.vtSuspicious > 0 && (
// //                         <li>
// //                           VirusTotal: {u.vtSuspicious} suspicious detections
// //                         </li>
// //                       )}
// //                     </React.Fragment>
// //                   ))}

// //                   {/* ATTACHMENTS */}
// //                   {analysis.attachmentScans.map((a, i) =>
// //                     a.vtMalicious > 0 ? (
// //                       <li key={i}>
// //                         Attachment {a.filename}: {a.vtMalicious} malicious engines
// //                       </li>
// //                     ) : null
// //                   )}

// //                   {/* SANDBOX FLAGS */}
// //                   {analysis.sandbox?.flags?.map((f, i) => (
// //                     <li key={i}>{f}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import api from "../api";
// import "../App.css";
// import { FiSearch, FiSettings } from "react-icons/fi";

// export default function InboxPage() {
//   const [emails, setEmails] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [body, setBody] = useState("");
//   const [analysis, setAnalysis] = useState(null);

//   useEffect(() => {
//     api.get("/emails")
//       .then((res) => setEmails(res.data))
//       .catch(() => setEmails([]));
//   }, []);

//   const loadEmail = (emailMeta) => {
//     setSelected(emailMeta);
//     setAnalysis(null);

//     api.get(`/email/${emailMeta.id}`).then((res) => {
//       setBody(res.data.body);
//       setAnalysis(res.data);
//     });
//   };

//   return (
//     <div className="inbox-container">
//       {/* TOP NAVBAR */}
//       <div className="topbar">
//         <div className="topbar-left">RakshaYantra Mail Security</div>

//         <div className="navbar-links">
//           <a href="/" className="nav-link active">Inbox</a>
//           <a href="/videos" className="nav-link">Tutorials</a>
//           <a href="/news" className="nav-link">News</a>
//         </div>

//         <div className="search-box">
//           <FiSearch />
//           <input placeholder="Search mail..." />
//         </div>

//         <div className="topbar-icons"><FiSettings /></div>
//       </div>

//       <div className="layout">
//         {/* EMAIL LIST SIDEBAR */}
//         <div className="email-list">
//           {emails.length === 0 ? (
//             <a href="http://localhost:5000/auth/login" className="login-btn">
//               Login with Google
//             </a>
//           ) : (
//             emails.map((e) => (
//               <div
//                 key={e.id}
//                 onClick={() => loadEmail(e)}
//                 className={`email-item ${selected?.id === e.id ? "selected" : ""}`}
//               >
//                 <div>
//                   <div className="sender">{e.from}</div>
//                   <div className="subject">{e.subject}</div>
//                 </div>
//                 <div className="email-date">{e.date}</div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* EMAIL PREVIEW */}
//         <div className="email-preview">
//           {!selected ? (
//             <div className="no-email-selected">Select an email</div>
//           ) : !analysis ? (
//             <div className="no-email-selected">Analyzing email...</div>
//           ) : (
//             <div className="email-content">
//               <h2>{selected.subject}</h2>
//               <p className="from">From: {selected.from}</p>

//               <div
//                 className={`status-tag ${analysis.finalScore >= 70 ? "unsafe" : analysis.finalScore >= 40 ? "suspicious" : "safe"}`}
//               >
//                 {analysis.verdict}
//               </div>

//               <div
//                 className="body-text"
//                 dangerouslySetInnerHTML={{ __html: body }}
//               ></div>

//               <hr />

//               <div className="verdict-box">
//                 <h3>Risk Score: {analysis.finalScore}%</h3>

//                 <h4>Reasons:</h4>
//                 <ul>
//                   {analysis.urlScans.map((u, i) => (
//                     <React.Fragment key={i}>
//                       {!u.googleSafe && <li>Google Safe Browsing flagged unsafe link</li>}
//                       {u.vtMalicious > 0 && (
//                         <li>VirusTotal: {u.vtMalicious} malicious detections</li>
//                       )}
//                       {u.vtSuspicious > 0 && (
//                         <li>VirusTotal: {u.vtSuspicious} suspicious detections</li>
//                       )}
//                     </React.Fragment>
//                   ))}

//                   {analysis.attachmentScans.map((a, i) => (
//                     a.vtMalicious > 0 ? (
//                       <li key={i}>
//                         Attachment {a.filename}: {a.vtMalicious} malicious engines
//                       </li>
//                     ) : null
//                   ))}

//                   {analysis.sandbox?.flags?.map((f, i) => (
//                     <li key={i}>{f}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../api";
import "../inbox.css";
import { FiSearch } from "react-icons/fi";

export default function InboxPage() {
  const [emails, setEmails] = useState(null); // null = show loader
  const [selected, setSelected] = useState(null);
  const [body, setBody] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/emails")
      .then((res) => setEmails(res.data))
      .catch(() => setEmails([]));
  }, []);

  const loadEmail = (emailMeta) => {
    setSelected(emailMeta);
    setAnalysis(null);

    api.get(`/email/${emailMeta.id}`).then((res) => {
      setBody(res.data.body);
      setAnalysis(res.data);
    });
  };

  return (
    <div className="inbox-container">

      {/* LOADING SCREEN */}
      {emails === null && (
        <div className="global-loader">
          <div className="spinner"></div>
          <p>Loading inbox...</p>
        </div>
      )}

      {/* TOP NAVBAR */}
      <div className="topbar">
        <div className="topbar-left">RakshaYantra Mail Security</div>

        <div className="navbar-links">
          <a href="/" className="nav-link active">Inbox</a>
          <a href="/videos" className="nav-link">Videos</a>
          <a href="/news" className="nav-link">News</a>
        </div>

        {/* WORKING SEARCH */}
        <div className="search-box">
          <FiSearch />
          <input 
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="layout">

        {/* EMAIL LIST */}
        <div className="email-list">

          {emails?.length === 0 ? (
            <a href="http://localhost:5000/auth/login" className="login-btn">
              Login with Google
            </a>
          ) : (
            emails
              ?.filter(
                (e) =>
                  e.subject.toLowerCase().includes(search.toLowerCase()) ||
                  e.from.toLowerCase().includes(search.toLowerCase())
              )
              .map((e) => (
                <div
                  key={e.id}
                  onClick={() => loadEmail(e)}
                  className={`email-item ${
                    selected?.id === e.id ? "selected" : ""
                  }`}
                >
                  <div>
                    <div className="sender">{e.from}</div>
                    <div className="subject">{e.subject}</div>
                  </div>
                  <div className="email-date">{e.date}</div>
                </div>
              ))
          )}
        </div>

        {/* EMAIL PREVIEW */}
        <div className="email-preview">

          {!selected ? (
            <div className="no-email-selected">Select an email</div>
          ) : !analysis ? (
            <div className="no-email-selected">Analyzing email...</div>
          ) : (
            <div className="email-content">
              <h2>{selected.subject}</h2>
              <p className="from">From: {selected.from}</p>

              <div
                className={`status-tag ${
                  analysis.finalScore >= 70
                    ? "unsafe"
                    : analysis.finalScore >= 40
                    ? "suspicious"
                    : "safe"
                }`}
              >
                {analysis.verdict}
              </div>

              <div
                className="body-text"
                dangerouslySetInnerHTML={{ __html: body }}
              ></div>

              <hr />

              <div className="verdict-box">
                <h3>Risk Score: {analysis.finalScore}%</h3>
                <h4>Reasons:</h4>

                <ul>
                  {analysis.urlScans.map((u, i) => (
                    <React.Fragment key={i}>
                      {!u.googleSafe && (
                        <li>Google Safe Browsing flagged unsafe link</li>
                      )}
                      {u.vtMalicious > 0 && (
                        <li>VirusTotal: {u.vtMalicious} malicious detections</li>
                      )}
                      {u.vtSuspicious > 0 && (
                        <li>
                          VirusTotal: {u.vtSuspicious} suspicious detections
                        </li>
                      )}
                    </React.Fragment>
                  ))}

                  {analysis.attachmentScans.map((a, i) =>
                    a.vtMalicious > 0 ? (
                      <li key={i}>
                        Attachment {a.filename}: {a.vtMalicious} malicious engines
                      </li>
                    ) : null
                  )}

                  {analysis.sandbox?.flags?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
